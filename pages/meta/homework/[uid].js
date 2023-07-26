import { useState } from "react";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
import { callUserById } from "@/lib/exportablefunctions";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useAuthContext } from "@/lib/context/AuthContext";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import HomeWorkCard from "@/components/mentor/homework/homeworkcard";
import UploadCard from "@/components/mentor/homework/uploadcard";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";

function Homework() {
  //set Below two for marked homework
  const [marked, setMarked] = useState(0);
  const [toBeMarked, setToBeMarked] = useState(0);
  const [verified, setVerified] = useState();
  let [searchstate, setsearchstate] = useState("");
  const { user, userProfile } = useAuthContext();
  const router = useRouter();
  let searchfun = (e) => {
    setsearchstate(e.target.value);
  };
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [activeElement, setActiveElement] = useState("");
  const [activeCourse, setActive] = useState();
  const { uid, courseid } = router.query;
  const [mentor, setMentor] = useState();
  const handleToggleElement = (element) => {
    setActiveElement(element);
  };
  const [files, setFiles] = useState([]);
  const getData = async () => {
    if (!dataFetched) {
      const courseRef = doc(db, "courses", courseid);
      const courseInfo = await getDoc(courseRef);
      const mentorColl = doc(db, "allusers", courseInfo.data().MentorId[0]);
      const userData = await getDoc(mentorColl);
      setMentor(userData.data().displayName);
      if (courseInfo.exists()) {
        try {
          const assignmentRef = collection(courseRef, "assignment");
          const q = query(assignmentRef, where("id", "==", uid));
          const querySnapshot = await getDocs(q);
          const arr = [];
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
          console.log(arr);
          setFiles(arr);
        } catch (err) {
          alert("Error occured");
        }
      } else {
        console.log("Course not found.");
      }
      // setAssignCourse(courseData.filter((ele) => ele?.mentorid === user.uid));
      setDataFetched(true);
    }
  };
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        user.emailVerified = true;
        const value = await callUserById(user.uid);
        setVerified(value.user?.verified);
      }
    });
    getData();
    return () => unsubscribe(); // Cleanup the listener
  }, [isMediumScreen, dataFetched]);

  // if (!verified) {
  //   return null;
  // }

  return (
    <>
      <div className="h-full text-base bg-[#2E3036] ">
        <div className="flex">
          {/* First Sidebar - Visible on Mobile */}
          {isMobileScreen && (
            <div
              className={`fixed right-0 ${
                SideBarState ? "block" : "hidden"
              } w-[281px] h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
            >
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          {/* Second Sidebar - Visible on Desktop */}
          {!isMobileScreen && (
            <div className={`md:block  hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow md:rounded-tl-[40px]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] md:pt-0 pt-2 top-0 md:border-b-[1px]  border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar heading="Homework" toggleSideBar={toggleSideBar} />
            </div>

            <div className=" font-semibold  text-lg text-white  mt-10 ml-20">
              Files
            </div>
            <div className="w-full  p-4 md:p-8 border border-[#5F6065]  mt-11 rounded-xl  flex flex-col h-screen  mb-5">
              {files ? (
                <div className="grid md:grid-cols-4  grid-cols-1 gap-4 m-5">
                  {files &&
                    files?.map((ele) => {
                      return ele?.files?.map((e) => {
                        const time = new Date(
                          e?.date.seconds * 1000 + e?.date.nanoseconds / 1000000
                        );
                        return (
                          <div
                            className="shrink-0 rounded-2xl shadow-lg bg-[#505057] py-[10px] px-[12px] h-[250px] md:h-[17rem] mx-2 ml-0 md:p-5 flex flex-col text-white"
                            onClick={() => router.push("/meta/homework/file")}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <Image
                                  src="/componentsgraphics/mentor/FolderNotch.svg"
                                  width={65}
                                  height={65}
                                />
                              </div>
                              <div>Pending</div>
                            </div>
                            <div className="flex flex-col h-full justify-between overflow-hidden">
                              <div className="text-xl ">{ele.title}</div>
                              <div className="flex items-center justify-between pt-4">
                                <div>{mentor}</div>
                                <div className="text-[#FFFFFF85]">
                                  {time && time.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      });
                      {
                        /* <div className='shrink-0 rounded-2xl shadow-lg bg-[#141518] py-[10px] px-[12px] h-[250px] md:h-[17rem] mx-2 ml-0 md:p-5 flex flex-col w-full md:w-auto text-white   '>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <Image src="/componentsgraphics/mentor/FolderNotch.svg" width={65} height={65}/>
                                        </div>
                                        <div>
                                            Pending
                                        </div>
                                    </div>
                                    <div className='flex flex-col h-full justify-between overflow-hidden'>
                                        <div className='text-xl '>
                                            Assignment name
                                        </div>
                                        <div className='flex items-center justify-between pt-4'>
                                            <div>Instructor name</div>
                                            <div className='text-[#FFFFFF85]'>Date</div>
                                        </div>
                                    </div>
                                </div> */
                      }
                    })}
                </div>
              ) : (
                <div className=" text-gray-500 flex justify-center items-center h-[50vh]">
                 
                  No submitted Assignment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homework;
