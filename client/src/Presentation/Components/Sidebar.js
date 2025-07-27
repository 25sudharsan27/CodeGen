import '../Styles/Sidebar.css'
import messagelogo from '../Assets/messagelogo.svg';
import messagelogo1 from '../Assets/messagelogo1.svg';
import deleteimage from '../Assets/deleteimage.svg';

import { useState } from 'react';
const Sidebar = () =>{
    const [sessions,setSessions] = useState([
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
        {
            _id : 1,
            name : "Complte Code of the REact Js calculator",
            date : "27/08/2025"
        },
        {
            _id:2,
            name:"Server side rendering regarding Nest Js ",
            date : "27/08/2025"
        },
    ])
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <img src={messagelogo} alt="messagelogo" />
                <label>Talks</label>
            </div>
            <div className="sidebar-body">
                {sessions.map((session,index)=>{
                    return (
                        <div className="session-box">
                            <div className="session-head">
                                <h3>{session.name.length>15 ? session.name.substring(0,15)+"..." : session.name}</h3>
                                <p5>{session.date}</p5>
                            </div>
                            <div className="session-btn">
                                <img src={deleteimage} alt="session button" />
                            </div>
                        </div>
                    )
                })

                }
            </div>
            <div className="sidebar-footer">
                <img src={messagelogo1} alt="messagelogo"/>
                <label className="chat-btn "> New Chat</label>
            </div>
        </div>
    )
}


export default Sidebar;