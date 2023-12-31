import React, {useContext} from 'react'
import Messages from './Messages'
import Input from './Input'
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import {ChatContext} from '../context/ChatContext'


export default function Chat() {
  const {data} =useContext(ChatContext);
  return (
      <div className='chat'>
        <div className="chatInfo">
            <span>{data.user?.displayName}</span>
             <div className="chatIcons"></div>
             <img src={Cam} alt="" />
             <img src={Add} alt="" />
             <img src={More} alt="" />
        </div>
        <Messages></Messages>
        <Input></Input>
      </div>
  );
}
