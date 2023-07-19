// needed to be work on top-courses, stats, edit profile

import { useState } from "react";
// import MentorSidebar from "../components/Schedule/MentorSidebar2";

import CourseCard from "@/components/student/courses/CourseCard";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { callUserById } from "@/lib/exportablefunctions";
import { auth } from "@/config/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";

import withAuth from "@/lib/context/mentorcontext";
// import MobileNav from "../components/CalenderParts/MobileNav";
import MentorSidebar from "@/components/common/sidebar/mentor";
import MentorTopbar from "@/components/common/navbar/mentortopbar";
import Image from "next/image";
import MentorChart from "@/components/mentor/other/chart";
import { useSelector } from "react-redux";
import { FiEdit2 } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import withMentorAuthorization from "@/lib/HOC/withMentorAuthorization.js";
import Link from "next/link";

function MentorProfile() {
  const router = useRouter();
  // const { data } = useSelector((state) => state.authManagerMentor);
  const chartData  = new Array(12).fill(0);
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState({});
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);
  const [rating, setRating] = useState(0);
  const [answeredquestions, setAnsweredQuestions] = useState(0);
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
        callUserById(user.uid).then((data) => setUserData(data.user));
      }
    });
    return () => unsubscribe();
  }, [isMediumScreen]);



  userData.joinedStudents?.map((student)=>{
    const joinDate = new Date(student.joinedAt.seconds * 1000);
    console.log(joinDate.getMonth());
    chartData[joinDate.getMonth()]++;
  });

  
  return (
    <>
      <div className="h-full text-base bg-[#2E3036] md:rounded-tl-[40px]">
        <div className="flex md:rounded-tl-[40px]">
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
            <div className={`md:block hidden w-[221px] bg-[#141518] z-10`}>
              <MentorSidebar toggleSideBar={toggleSideBar} />
            </div>
          )}

          <div className="flex-grow w-[10rem] md:rounded-tl-[40px]">
            <div className="flex justify-between md:bg-[#2E3036] bg-[#141518] top-0 md:border-b-[1px] border-b-[2px] border-[#717378] md:rounded-tl-[40px]">
              <MentorTopbar heading="Profile" toggleSideBar={toggleSideBar} />
            </div>

            <div className="text-white grow flex flex-col items-center justify-center h-fit ">
              {/* text */}
              <div className="h-[120px] w-full bg-gradient-to-r from-[#A145CD] to-[#E1348B] " />
              <div className="w-[90%] h-full   md:text-base text-sm  ">
                <div className=" md:mx-10 mx-5">
                  <div className="flex">
                    {" "}
                    <Image
                      src={
                        userData.photoURL
                          ? userData.photoURL
                          : "/pagesgraphics/mentor/profile/ProfileGirlimg.svg"
                      }
                      alt="proImg"
                      height={100}
                      width={100}
                      className="rounded-full w-[100px] object-contain mt-[-60px]"
                    />
                    <div className="w-[100%] flex justify-between">
                      <div className="text-xl md:text-2xl ml-4 mt-[-35px]">
                        {userData &&
                        userData.displayName &&
                        userData.displayName.includes("gmail")
                          ? userData.displayName.slice(0, 5)
                          : userData.displayName}
                      </div>
                      <Link href={"/meta/register"}>
                        <div className="flex text-xs md:text-sm mt-[-25px]">
                          Edit profile
                          <FiEdit2 className="ml-1 mt-[2px]" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /// */}
            <div className="flex max-[963px]:flex-wrap max-[963px]:justify-start  justify-center mx-auto w-[95%] m-5  md:mt-0 text-white ">
              <div className="lg:pr-4 w-[70%] max-[963px]:w-[98%] ">
                <div className="lg:flex gap-3 justify-around mt-10 mb-5">
                  <div className=" lg:w-1/4">
                    <div>
                      <div className="text-left font-semibold text-base ml-1">
                        Stats.
                      </div>
                      <div className="text-center gap-5  text-white  my-1 flex lg:block">
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4 ">
                          <p className="text-sm font-semibold">{rating}/5.0</p>
                          <p className="text-xs font-medium">Tutor rating</p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4">
                          <p className="text-sm font-semibold">{answeredquestions}</p>
                          <p className="text-xs font-medium">
                            Question answered
                          </p>
                        </div>
                        <div className="bg-gradient-to-r from-[#A145CD] to-[#E1348B] rounded-2xl   p-3 my-4">
                          <p className="text-sm font-semibold">August 2023</p>
                          <p className="text-xs font-medium">
                            Material Prepared
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="text-left">
                      <div className="md:ml-1 font-semibold text-base">
                        Number of students
                      </div>
                      <div className="mt-5 md:mt-2 ">
                        <MentorChart data={chartData} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between m-5 md:mx-0 my-2">
                    <div>Top courses</div>
                    <div>
                      <button className="border-2 p-1 text-sm">View All</button>
                    </div>
                  </div>
                  <div className="flex overflow-x-scroll scrollbar-hide gap-4">
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                    <div>
                      <CourseCard
                        key="1"
                        lessons="8"
                        title="Introduction to C++"
                        desc="Learn the basics of C++ programming language."
                        level="Beginner"
                        icon="/pagesgraphics/mentor/profile/ProgrammingIcon.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="bg-[#373A41] rounded-[20px] text-xl justify-center pb-9 pt-3 px-4 space-y-2 mt-5 flex flex-col">
                  <div className=" text-center text-xl font-bold text-gray-500">
                    Educator highlights
                  </div>
                  <div className="text-center text-lg pt-2 pb-4 font-extralight">
                    Worked at{" "}
                    {userData.details &&
                      userData.details?.experience[0]?.companyname}
                  </div>
                  <div className="flex gap-2 text-lg font-medium">
                    {" "}
                    <span>
                      <Image
                        src={"/pagesgraphics/mentor/profile/degree_icon.svg"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-5"
                      />{" "}
                    </span>{" "}
                    Studied at{" "}
                    <span className="text-[#E1348B] text-lg font-black">
                      {userData.details &&
                        userData.details?.qualification[0]?.universityname}
                      (
                      {userData.details &&
                        userData.details?.qualification[0]?.fieldOfStudy}
                      )
                    </span>
                  </div>
                  <p className="ml-7  font-extralight text-[0.9rem] opacity-75">
                    Latest Result: Ashwin - 100%ile Thrice in Maths in JEE Main
                    2021 , AIR 409 (JEE Advanced) through my Evolve Batch. Many
                    Students Scoring more than 99.5%ile in Maths. Producing
                    IITians every year.
                  </p>

                  <div className="flex gap-2 text-[0.9rem] font-medium">
                    {" "}
                    <span>
                      <Image
                        src={"/pagesgraphics/mentor/profile/location_icon.svg"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-4"
                      />{" "}
                    </span>{" "}
                    Lives in{" "}
                    <span className="text-[#E1348B] font-black">
                      {" "}
                      {userData.details?.address}
                    </span>
                  </div>
                  <p className="ml-7  font-extralight text-[0.9rem] opacity-75">
                    {userData.details &&
                      userData.details?.experience[0]?.jobtitle}{" "}
                    since{" "}
                    {userData.details &&
                      userData.details?.experience[0]?.startdate}
                  </p>

                  <div className="flex gap-2">
                    {" "}
                    <span>
                      <Image
                        src={"/pagesgraphics/mentor/profile/globe_icon.svg"}
                        width={100}
                        height={100}
                        alt="img"
                        className="w-5"
                      />{" "}
                    </span>{" "}
                    <span className="text-[0.9rem] font-medium">
                      {" "}
                      Knows{" "}
                      {userData.details &&
                        userData.details?.skills.map((item) => {
                          return <>{item},</>;
                        })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
}
export default withMentorAuthorization(MentorProfile);
