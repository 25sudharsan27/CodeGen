import '../Styles/Sessions.css';
import '../Styles/Session.css';
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import userlogo from '../Assets/userimage.svg';
import maxsize from '../Assets/maxsize.svg';


const Session = () => {
    const [chatHistory, setChatHistory] = useState([
        {
            message: "Claude AI or ChatGPT is a general AI assistant. Your assignment is a focused AI-powered dev tool for generating, refining, and exporting UI code, with session memory, live rendering, and full-stack state handling. So while they share similar AI prompt→response workflows, this project is much more targeted toward developers working with React/Next.js and offers features tailored to UI development workflows.",
            timestamp: "27/08/2025 18:15",
            explanation: `Notes:
            Uses eval() to calculate (just for simplicity — avoid it in production).
            
            input is read-only so users can't type invalid values directly.
            
            You can extend this to validate inputs or use a math parser like mathjs.`,
            componentCode: [{
                filename:"App.js",
                jsx: `import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      // Use eval only for simple demo – not recommended in production
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div style={styles.container}>
      <input type="text" value={input} readOnly style={styles.input} />

      <div style={styles.buttons}>
        {['7', '8', '9', '/'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['0', '.', '+'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '250px',
    margin: '50px auto',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    height: '40px',
    fontSize: '18px',
    marginBottom: '10px',
    padding: '5px',
    textAlign: 'right',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
};

export default Calculator;
`,

            },
            {
                filename:"Count.js",
                jsx: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <div style={styles.buttonGroup}>
        <button onClick={increment} style={styles.button}>+</button>
        <button onClick={decrement} style={styles.button}>-</button>
        <button onClick={reset} style={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    fontSize: '20px',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
  },
  resetButton: {
    fontSize: '16px',
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    border: 'none',
  },
};

export default Counter;
`,

            }

            ],
        },
        {
            message: "Claude AI or ChatGPT is a general AI assistant. Your assignment is a focused AI-powered dev tool for generating, refining, and exporting UI code, with session memory, live rendering, and full-stack state handling. So while they share similar AI prompt→response workflows, this project is much more targeted toward developers working with React/Next.js and offers features tailored to UI development workflows.",
            timestamp: "27/08/2025 18:15",
            explanation: `Notes:
            Uses eval() to calculate (just for simplicity — avoid it in production).
            
            input is read-only so users can't type invalid values directly.
            
            You can extend this to validate inputs or use a math parser like mathjs.`,
            componentCode: [{
                filename:"app.js",
                jsx: `import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      // Use eval only for simple demo – not recommended in production
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div style={styles.container}>
      <input type="text" value={input} readOnly style={styles.input} />

      <div style={styles.buttons}>
        {['7', '8', '9', '/'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['0', '.', '+'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '250px',
    margin: '50px auto',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    height: '40px',
    fontSize: '18px',
    marginBottom: '10px',
    padding: '5px',
    textAlign: 'right',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
};

export default Calculator;
`,

            },
            {
                filename:"counter.js",
                jsx: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <div style={styles.buttonGroup}>
        <button onClick={increment} style={styles.button}>+</button>
        <button onClick={decrement} style={styles.button}>-</button>
        <button onClick={reset} style={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    fontSize: '20px',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
  },
  resetButton: {
    fontSize: '16px',
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    border: 'none',
  },
};

export default Counter;
`,

            }

            ],
        },
        {
            message: "Claude AI or ChatGPT is a general AI assistant. Your assignment is a focused AI-powered dev tool for generating, refining, and exporting UI code, with session memory, live rendering, and full-stack state handling. So while they share similar AI prompt→response workflows, this project is much more targeted toward developers working with React/Next.js and offers features tailored to UI development workflows.",
            timestamp: "27/08/2025 18:15",
            explanation: `Notes:
            Uses eval() to calculate (just for simplicity — avoid it in production).
            
            input is read-only so users can't type invalid values directly.
            
            You can extend this to validate inputs or use a math parser like mathjs.`,
            componentCode: [{
                filename:"App.js",
                jsx: `import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      // Use eval only for simple demo – not recommended in production
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  return (
    <div style={styles.container}>
      <input type="text" value={input} readOnly style={styles.input} />

      <div style={styles.buttons}>
        {['7', '8', '9', '/'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['4', '5', '6', '*'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['1', '2', '3', '-'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        {['0', '.', '+'].map((btn) => (
          <button key={btn} onClick={() => handleClick(btn)}>{btn}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '250px',
    margin: '50px auto',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    height: '40px',
    fontSize: '18px',
    marginBottom: '10px',
    padding: '5px',
    textAlign: 'right',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
};

export default Calculator;
`,

            },
            {
                filename:"Count.js",
                jsx: `import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div style={styles.container}>
      <h1>Counter App</h1>
      <h2>{count}</h2>
      <div style={styles.buttonGroup}>
        <button onClick={increment} style={styles.button}>+</button>
        <button onClick={decrement} style={styles.button}>-</button>
        <button onClick={reset} style={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    fontSize: '20px',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
  },
  resetButton: {
    fontSize: '16px',
    padding: '8px 16px',
    marginTop: '10px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
    border: 'none',
  },
};

export default Counter;
`,

            }

            ],
        }
    ]);
    return (
        <div className="page" id="session-page">
            <div className="session-container">
                <Sidebar />
                <div className="session-right">
                    <div className="session-nav">
                        <img src={userlogo} alt="user logo" />
                    </div>
                    <div className="session-body">
                        {
                            chatHistory.map((chat, index) => {
                                return (
                                    <div key={index} className="chat-container">
                                        <div className="your-cont">
                                            <div className="your-chat">
                                                <p3>{chat.message}</p3>
                                                <p5>{chat.timestamp}</p5>
                                            </div>
                                        </div>
                                        <div className="your-cont2">
                                            <div className="your-explanation">
                                                <p3>{chat.explanation}</p3>
                                            </div>
                                        </div>
                                        <div className="your-body">
                                            <div className="file-card">
                                                <div className="file-card-header">
                                                    <h3>{chat.componentCode[0].filename}</h3>
                                                    <div className="file-card-header-right">
                                                        <button className="file-card-button">Prev</button>
                                                        <button className="file-card-button" >Next</button>
                                                        <button  className="file-card-max-button"><img src={maxsize} alt="maxsize"/></button>
                                                    </div>
                                                </div>
                                                <div className="file-card-body">
                                                    <h3>{chat.componentCode[0].jsx}</h3>
                                                </div>
                                            </div>
                                            <div className="file-card2">
                                                <div className="file-card-header">
                                                    <h3>Output</h3>
                                                    <div className="file-card-header-right">
                                                        <button  className="file-card-max-button"><img src={maxsize} alt="maxsize"/></button>
                                                    </div>
                                                </div>
                                                {/* <div className="file-card-body">
                                                    <h3>{chat.componentCode[0].jsx}</h3>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div tabindex="0" className="session-footer">
                        <button className="chat-btn2">+ Image</button>
                        <input type="text" placeholder='Type your Message' />
                        <button className="input-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Session;