import '../Styles/Sidebar.css'
import { useEffect } from 'react';
import messagelogo from '../Assets/messagelogo.svg';
import messagelogo1 from '../Assets/messagelogo1.svg';
import deleteimage from '../Assets/deleteimage.svg';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { deleteSession } from '../../Application/Services/Api';
const Sidebar = ({setdata,setloading,data,sessionId,clearAll}) =>{
    const navigator = useNavigate();
    const [sessions,setSessions] = useState([]);
    const HandleDelete = async (id)=>{
        try{
        const response = await deleteSession(id);
        if(response){

            if(id===sessionId){
                setloading((prev)=>{return true});
                navigator("/sessions")
                setloading((prev)=>{return false});
            }
            else{
                setloading((prev)=>{return true});
                setdata((prev)=>{
                    const newArr = [...prev];
                    newArr.filter((item)=>{
                        return item._id!==sessionId 
                    })
                    return newArr;
                })
                setloading((prev)=>{return false});

            }
        }
        }catch(error){
            alert("something was wrong");
        }
    }
    useEffect(() => {
        setSessions(data);
    }, [data]);
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <img src={messagelogo} alt="messagelogo" />
                <label>Talks</label>
            </div>
            <div className="sidebar-body">
                {sessions.map((session,index)=>{
                    return (
                        <div onClick={async ()=>{
                            await navigator("/sessions/"+session._id);
                        }} className="session-box" id={sessionId==session._id ? "box-active" : null}>
                            <div className="session-head">
                                <h3>{session?.sessionName &&  session.sessionName.length>15 ? session.sessionName.substring(0,15)+"..." : session.sessionName+"..."}</h3>
                                <p5>{new Date(session.lastUpdated).toLocaleString()}</p5>
                            </div>
                            <div className="session-btn">
                                <img onClick={()=>{HandleDelete(session._id)}} src={deleteimage} alt="session button" />
                            </div>
                        </div>
                    )
                })
                }
            </div>
            <div onClick={()=>{clearAll(); navigator("/sessions")}} className="sidebar-footer">
                <img src={messagelogo1} alt="messagelogo"/>
                <label onClick={clearAll} className="chat-btn "> New Chat</label>
            </div>
        </div>
    )
}


export default Sidebar;