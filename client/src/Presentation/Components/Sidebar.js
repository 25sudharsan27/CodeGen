import '../Styles/Sidebar.css'
import { useEffect } from 'react';
import messagelogo from '../Assets/messagelogo.svg';
import messagelogo1 from '../Assets/messagelogo1.svg';
import deleteimage from '../Assets/deleteimage.svg';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
const Sidebar = ({data,sessionId,clearAll}) =>{
    const navigator = useNavigate();
    const [sessions,setSessions] = useState([]);
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
                        <div onClick={()=>{
                            navigator("/sessions/"+session._id);
                        }} className="session-box" id={sessionId==session._id ? "box-active" : null}>
                            <div className="session-head">
                                <h3>{session.sessionName.length>15 ? session.sessionName.substring(0,15)+"..." : session.sessionName+"..."}</h3>
                                <p5>{new Date(session.lastUpdated).toLocaleString()}</p5>
                            </div>
                            <div className="session-btn">
                                <img src={deleteimage} alt="session button" />
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