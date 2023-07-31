import React, { useContext, useState } from 'react'
import {db} from '../firebase';
import { collection, query ,where,getDocs, updateDoc, serverTimestamp, getDoc, setDoc,doc} from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

export default function Search() {
  const [username,setUsername]=useState("");
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)
  const {currentUser}=useContext(AuthContext);
  
  const handleSearch= async()=>{
    const q=query(collection(db,'users'),where('displayName',"==",username));
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data());
     });
    } 
    catch(err){
      setErr(true);
    }
  };
  const handlekey=(e)=>{
    e.code ==='Enter'&& handleSearch ();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "usersChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db,"usersChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } 
    catch (err) {
      setErr(true);
      
    }
    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
    <div className="searchForm">
      <input
        type="text" placeholder='find a user' onKeyDown={handlekey}  onChange={(e)=>setUsername(e.target.value)}
        value={username}
      />
    </div>
    {err && <span>user note found</span>}
    
     { user && 
     (<div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>
      )}
  </div>
  );
};
