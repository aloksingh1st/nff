import React, { useState } from "react";
import { MdClose, MdInfoOutline, MdNotificationsNone } from 'react-icons/md'

import Avatar from "./avatar";
import Img2 from "@/public/componentsgraphics/common/chatting/chattingarea/Img2.svg";
import { Switch } from "@headlessui/react";
import Image from "next/image";

const User = ({ currReciever, setShowUser, setShowChat }) => {
  const [checked, setChecked] = useState(true);


  const handleClick = () => {
    setShowUser(false);
    setShowChat(true);
  };

  return (
    <div
      className="user-container w-screen md:w-auto"
      style={{
        backgroundColor: "#373A41",
        color: "white",
        minWidth: "300px",
        borderRadius: "15px",
      }}
    >
      <div
        className="flex p-6 pt-8 justify-between"
        style={{ borderBottom: "1px solid grey" }}
      >
        <h1 className="text-[20px]">User Info</h1>
        <MdClose className="cursor-pointer" onClick={() => handleClick()} />
      </div>

      <div
        className="flex items-center gap-8 p-4"
        style={{ borderBottom: "1px solid grey" }}
      >
        <Avatar
          alt="Profile-Picture"
          src={currReciever?.photoURL || '/componentsgraphics/common/chatting/user/profile.svg'}
          sx={{ height: 76, width: 76 }}
        />
        {currReciever?.name}
      </div>

      <div
        className="flex justify-between p-4"
        style={{ borderBottom: "1px solid grey" }}
      >
        <div className="flex">
          <MdInfoOutline />
          <div>
            <p className="text-[14px]">+{currReciever?.studentPhoneNo}</p>
            <p className="text-[10px]">Mobile</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-[14px]">@{currReciever?.username}</p>
          <p className="text-[10px]">Username</p>
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center p-4 gap-2"
        style={{ borderBottom: "1px solid grey" }}
      >
        <h1>Media Link and Docs</h1>
        <div className="flex gap-6 p-2" style={{ backgroundColor: "#505357" }}>
          <Image src={Img2} alt="" height={60} width={60} />
          <Image src={Img2} alt="" height={60} width={60} />
          <Image src={Img2} alt="" height={60} width={60} />
        </div>
      </div>

      <div
        className="flex p-4 items-center justify-between"
        style={{ borderBottom: "1px solid grey" }}
      >
        <div className="flex items-center gap-1">
          <MdNotificationsNone />
          <p>Notification</p>
        </div>
        <Switch checked={checked} onChange={setChecked} className={`${checked ? 'bg-pink' : 'bg-gray-500'
          } relative inline-flex h-6 w-11 items-center rounded-full`} >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${checked ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>

      <div
        className="flex px-6 py-4 justify-center gap-8"
        style={{ borderBottom: "1px solid grey" }}
      >
        {/* <p>Exit Group</p> */}
        <p>Block</p>
        <p>Report</p>
      </div>
    </div>
  );
};

export default User;
