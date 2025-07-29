import '../Styles/Sessions.css';
import '../Styles/Session.css';
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import userlogo from '../Assets/userimage.svg';
import maxsize from '../Assets/maxsize.svg';
import { SandpackPreview, SandpackProvider, SandpackCodeEditor, SandpackLayout } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";


import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Model from '../Components/Model';

import { getSessionDetail, getSessions, handlePrompt, userLogOut } from '../../Application/Services/Api';
import parseToJSX from '../../Application/Services/Parsing';
import UniqueLoadingComponent from '../Components/LoadingComponent';



const Session = () => {
  const navigator = useNavigate();
  const currentPromptRef = useRef();
  const [disableButton, setdisableButton] = useState(false);
  const [bodyloading, setbodyLoading] = useState(false);
  const [sessionsData, setsessionsData] = useState([]);
  const [currentModel, setcurrentModel] = useState(0);
  const [showModel, setshowModel] = useState(false);

  const [chatsfileindex, setchatsfileindex] = useState([]);
  const [chatsfilerun, setchatsfilerun] = useState([]);
  const { sessionId } = useParams('');

  const openModel = (id) => {

    setcurrentModel((prev) => id);
    setshowModel((prev) => !prev);
  }

  const closeModel = () => {
    setPages((prev) => {
      return prev.filter((a, index) => index !== currentModel);
    })
    setshowModel(false);
    setcurrentModel(-1);
  }
  const closeModelbyindex = (ind) => {
    setPages((prev) => {
      return prev.filter((a, index) => index !== ind);
    })
    setshowModel(false);
    setcurrentModel(-1);
  }

  const minimizeModel = () => {
    setshowModel(false);
    setcurrentModel(-1);
  }


  const [pages, setPages] = useState([

  ])
  const [chatHistory, setChatHistory] = useState([

  ]);

  useEffect(() => {

    const fetchSessions = async () => {
      try {
        const response = await getSessions();
        setsessionsData(await response.data.sessions);
        if (response.status === 400) {
          navigator("/login");
        }
      }
      catch (error) {
        navigator("/login");
      }
    }
    fetchSessions();

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sessionId) {
          setbodyLoading((prev) => { return true });
          const response = await getSessionDetail(sessionId);
          setChatHistory(response?.data?.sessiond.chatHistory || []);
          const len = response?.data?.sessiond?.chatHistory.length || 0;
          setchatsfileindex(Array(len).fill(0));
          setchatsfilerun(Array(len).fill(false));

        }
      } catch (error) {
        console.error("Caught error in useEffect:", error);
        navigator("/login");
      } finally {
        setbodyLoading((prev) => { return false });
      }
    };

    fetchData();
  }, [sessionId]);




  const HandleAddPage = (data) => {
    setPages((prev) => {
      return [
        ...prev,
        {
          id: prev.length + 1,
          filename: data.filename,
          jsx: data.jsx
        }
      ];
    });
  }


  const HandleRun = (cardindex) => {
    setchatsfilerun((prev) => {
      const newArray = [...prev];
      newArray[cardindex] = true;
      return newArray;
    })
  }
  const HandleStop = (cardindex) => {
    setchatsfilerun((prev) => {
      const newArray = [...prev];
      newArray[cardindex] = false;
      return newArray;
    })
  }

  const HandleNextCard = (cardindex) => {
    setchatsfileindex((prev) => {
      const newArray = [...prev];
      newArray[cardindex] = (newArray[cardindex] + 1) % chatHistory[cardindex].componentCode.length;
      return newArray;
    })
    HandleStop(cardindex);
  }

  const HandlePrevCard = (cardindex) => {
    setchatsfileindex((prev) => {
      const newArray = [...prev];
      newArray[cardindex] = (newArray[cardindex] + chatHistory[cardindex].componentCode.length - 1) % chatHistory[cardindex].componentCode.length;
      return newArray;
    })
    HandleStop(cardindex);

  }

  const HandleDownload = (jsx) => {
    const fileContent = typeof jsx === "string" ? jsx : jsx.toString();
  
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "Component.jsx"; // Change file name as needed
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    URL.revokeObjectURL(url);
  };
  

  const creatingNewSession = async () => {
    const prom = currentPromptRef.current.value;
    console.log(prom);
    setChatHistory([{ message: currentPromptRef.current.value, timestamp: new Date().toLocaleString() }]);
    const response = await handlePrompt({ prompt: currentPromptRef.current.value })
    currentPromptRef.current.value = "";
    if (response.status === 201) {
      setsessionsData((prev) => {
        const newArr = [...prev];
        newArr.unshift({ _id: response.data.sessionId, sessionname: (prom.length > 13 ? prom.substring(0, 13) : prom), lastUpdated: response.data.lastUpdated });
        return newArr;
      })
      navigator("/sessions/" + response.data.sessionId);
    }
    else {
      alert("sometthing went wrong");
    }
  }

  const sendingPrompt = async () => {
    const messageText = currentPromptRef.current.value;
    if (!messageText.trim()) return;

    setChatHistory((prev) => {
      return [
        ...prev,
        {
          message: messageText,
          _id: sessionId,
          timestamp: new Date().toLocaleString(),
        },
      ];
    });

    currentPromptRef.current.value = "";

    const response = await handlePrompt({ sessionId: sessionId, prompt: messageText });

    if (response.status === 201) {
      setchatsfileindex((prev) => {
        const newAr = [...prev];
        newAr.push(0);
        return newAr;
      })
      setchatsfilerun((prev) => {
        const newAr = [...prev];
        newAr.push(false);
        return newAr;
      })
      setChatHistory((prev) => {
        const newChat = prev.slice(0, prev.length - 1);
        newChat.push({
          message: messageText,
          _id: response.data.sessionId,
          timestamp: response.data.lastUpdated,
          explanation: response.data.explanation,
          componentCode: [
            {
              filename: "Component.jsx",
              jsx: response.data.jsx,
            },
          ],
        });
        return newChat;
      });
    } else {
      alert("Something went wrong");
    }
  };


  const clearAll = () => {
    setChatHistory([]);
  }
  const HandleLogOut = async () => {
    try {
      const response = await userLogOut();
      if (response) {
        navigator("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  }
  useEffect(() => {
    console.log("Button disabled?", disableButton);
  }, [disableButton]);

  useEffect(() => {
    console.log("loading : " + bodyloading);
  }, [bodyloading])

  return (
    <div className="page" id="session-page">
      <div className="session-container">
        <Sidebar setdata={setsessionsData} setloading={setbodyLoading} data={sessionsData} sessionId={sessionId} clearAll={clearAll} />
        <div className="session-right">
          <div className="session-nav">
            <img src={userlogo} alt="user logo" />
            <button onClick={HandleLogOut} className="input-button" >Logout</button>
          </div>
          <div className="session-body">
            {

              bodyloading ?
                <UniqueLoadingComponent />
                :

                !sessionId ?
                  (
                    chatHistory.length > 0 && chatHistory.map((chat, index) => {
                      return (
                        <div key={index} className="chat-container">
                          <div className="your-cont">
                            <div className="your-chat">
                              <p3>{chat.message}</p3>
                              <p5>{new Date(chat.timestamp).toLocaleString()}</p5>
                            </div>
                            {
                              !chat.componentCode &&
                              <UniqueLoadingComponent />
                            }
                          </div>
                        </div>
                      )
                    })
                  )
                  :
                  chatHistory.map((chat, index) => {
                    return (
                      <div key={index} className="chat-container">
                        <div className="your-cont">
                          <div className="your-chat">
                            <p3>{chat.message}</p3>
                            <p5>{new Date(chat.timestamp).toLocaleString()}</p5>
                          </div>
                        </div>
                        <div className="your-cont2">
                          {chat.explanation &&
                            <div className="your-explanation">
                              <p3>{parseToJSX(chat.explanation)}</p3>
                            </div>
                          }
                        </div>
                        {
                          !chat.componentCode &&
                          <UniqueLoadingComponent />
                        }
                        {chat.componentCode
                          &&
                          <div className="your-body">
                            <div className="file-card">
                              <div className="file-card-header">
                                <h3>{chat.componentCode[chatsfileindex[index]]?.filename}</h3>
                                <div className="file-card-header-right">
                                  <button onClick={() => { HandleDownload(chat.componentCode[chatsfileindex[index]]?.jsx) }} className="file-card-button" >Download</button>
                                  <button onClick={() => { HandlePrevCard(index) }} className="file-card-button">Prev</button>
                                  <button onClick={() => { HandleNextCard(index) }} className="file-card-button" >Next</button>
                                  <button className="file-card-max-button" onClick={() => { HandleAddPage(chat.componentCode[chatsfileindex[index]]); openModel(pages.length) }}><img src={maxsize} alt="maxsize" /></button>
                                </div>
                              </div>
                              <div className="file-card-body">
                                <SyntaxHighlighter language="jsx" style={oneDark} wrapLongLines={true}>
                                  {chat.componentCode[chatsfileindex[index]]?.jsx}
                                </SyntaxHighlighter>
                              </div>
                            </div>
                            <div className="file-card2">
                              <div className="file-card-header">
                                <h3>Output</h3>
                                <div className="file-card-header-right">
                                  <button onClick={() => { HandleRun(index) }} style={{ backgroundColor: "#75F7CC", color: "black" }} className="file-card-button" >Run</button>
                                </div>
                              </div>
                              <div className="file-card-body" style={{ boxSizing: "border-box" }}>
                                {
                                  chatsfilerun[index] &&

                                  <SandpackProvider
                                    template="react"
                                    theme={atomDark}
                                    files={{
                                      "/App.js": {
                                        code: chat.componentCode[chatsfileindex[index]]?.jsx || "// JSX code not found",
                                        active: true,
                                      },
                                      "/index.js": {
                                        code: `
                                import React from "react";
                                import { createRoot } from "react-dom/client";
                                import App from "./App";

                                const container = document.getElementById("root");
                                const root = createRoot(container);
                                root.render(<App />);
                              `.trim(),
                                      },
                                      "/index.html": {
                                        code: `<div id="root"></div>`,
                                      },
                                    }}
                                  >
                                    <SandpackLayout>
                                      <SandpackPreview style={{ height: "80vh", border: "1px solid #444" }} />
                                    </SandpackLayout>
                                  </SandpackProvider>
                                }
                              </div>
                            </div>
                          </div>
                        }

                      </div>
                    )
                  })

            }
          </div>
          <div tabIndex={0} className="session-footer">
            <button className="chat-btn2">+ Image</button>
            <input ref={currentPromptRef} type="text" placeholder="Type your Message" />
            <button
              onClick={async () => {
                setdisableButton(true);
                try {
                  if (!sessionId) {
                    await creatingNewSession();
                  } else {
                    await sendingPrompt();
                  }
                } finally {
                  setdisableButton(false);
                }
              }}
              id={disableButton ? "disable-button" : null}
              disabled={disableButton}
              className="input-button"
            >
              Submit
            </button>
          </div>

        </div>
      </div>


      <div className="tabs-container">
        {
          pages.map((page, index) => {
            return (
              <div key={index} className="tab-card">
                <h2 onClick={() => { openModel(index) }} >{page.filename}</h2>
                <button onClick={() => { closeModelbyindex(index) }} className="file-card-close-button">x</button>
              </div>
            )
          })
        }
      </div>
      <Model closeModel={closeModel} miniMize={minimizeModel} data={currentModel !== -1 && currentModel < pages.length ? pages[currentModel] : {}} showModel={showModel} />

    </div>
  )
}

export default Session;