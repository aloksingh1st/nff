import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { auth } from "../../../config/firebaseconfig";
import { signOut } from "firebase/auth";
import { BsPersonCircle } from "react-icons/bs";
import { logout } from "@/lib/exportablefunctions";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";

//hardcoded

export default function Dashboardnav({ heading, toggleSideBar }) {
  const [profileMenu, setProfileMenu] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext()

  return (
    <nav className="border-b-[1px] border-[#728095] px-0 py-2 w-full mt-2">
      <div className="container flex flex-row md:flex-row gap-y-6 min-w-full justify-between px-10 w-full">
        <div className="flex justify-between items-center">
          <p className="text-white font-Inter text-2xl flex justify-start">
            {heading}
          </p>
          {/* <RxHamburgerMenu className="text-white text-3xl block md:hidden" /> */}
        </div>
        <div className="flex items-center justify-between">
          <div
            className="md:flex items-center gap-x-2  md:mr-1 sm:mr-5 sm:py-2 rounded-lg hidden "
            style={{ border: "1px solid #728095" }}
          >
            <AiOutlineSearch className="text-white text-2xl ml-4" />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none focus:border-none border-none bg-inherit text-white"
            />
          </div>
          
          {user &&  (
            <div className="text-white max-[768px]:hidden flex items-center mt-2 z-10">
              <IoMdNotificationsOutline className="text-3xl mr-2" />
              <div className="] h-12 w-12 flex justify-center items-center">
                <Popover className="">
                  <Popover.Button className="outline-none ">
                   {user.photoURL ? <Image
                      src={user.photoURL}
                      alt="proImg"
                      height={48}
                      width={48}
                      className="inline-block  object-cover object-center !rounded-full border-[#E1348B] aspect-square"
                    />:
                     <BsPersonCircle onClick={() => setProfileMenu(!profileMenu)} className="text-white text-4xl"/>}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute translate-y-[43px] translate-x-[-163px] top-4">
                      <div className="h-48 w-[200px] text-center p-3">
                        <div className="bg-[#373A41] text-white rounded-tl-2xl rounded-b-2xl divide-y border border-[#505057] relative">
                          <Link href="/beta/profile">
                            <p className="p-2">
                              {user.photoURL ? (
                                <div className="flex gap-2 items-center">
                                  <Image
                                    src={user.photoURL}
                                    height="35"
                                    width="35"
                                    className="rounded-full h-6 w-6"
                                    alt="img"
                                  />
                                  <div className="text-left">
                                    <p className="text-[13px] mb-1">
                                      {user.displayName}
                                    </p>
                                    <p className="text-[10px] -mt-2">
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex gap-1 items-center">
                                <BsPersonCircle onClick={() => setProfileMenu(!profileMenu)} className="text-white text-4xl"/>
                                  <div className="text-left">
                                    <p className="text-[13px] mb-1">Guest</p>
                                    <p className="text-[10px] -mt-2">
                                      Class N/A
                                    </p>
                                  </div>
                                </div>
                              )}
                            </p>
                          </Link>

                          <div className="text-[13px] p-2">
                            <Link href="/beta/profile">
                              <p className="mb-2">Profile</p>
                            </Link>
                            <Link href="/invite">
                              <p>Invite a Friend</p>
                            </Link>
                          </div>
                          <div className="text-[13px] p-2">
                            <Link href="/alpha/contactUs">
                              <p className="mb-2">Neat Skills Help Centre</p>
                            </Link>
                            <Link href="/alpha/termsAndCondition">
                              <p>Terms & Conditions</p>
                            </Link>
                          </div>
                          <div className="text-[13px] p-2">
                            <p onClick={() => signOut(auth)}>Logout</p>
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
          )}
          {!user && (
            <div className="hidden md:block ml-6">
              <Link href={"/beta/signup"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] py-2.5 bg-[#404147] text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Signup
                </button>
              </Link>
              <Link href={"/beta/login"}>
                <button
                  type="button"
                  className="inline-block justify-start items-start px-[20px] ml-6 mr-3 py-2.5 bg-pin text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  LOGIN
                </button>
              </Link>
            </div>
          )}
          <div
            className=" md:hidden block mr-[-30px] "
            onClick={() => toggleSideBar()}
          >
            <RxHamburgerMenu className="text-white text-3xl block md:hidden" />
          </div>
        </div>
      </div>
    </nav>
  );
}
