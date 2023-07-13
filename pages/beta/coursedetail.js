// import img from "next/img";
import Accordion from "@/components/common/accordion/accordion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { auth, db } from "@/config/firebaseconfig";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import CourseoverviewSidebar from "@/components/common/sidebar/courseoverview";
import Dashboardnav from "@/components/common/navbar/dashboardnav";

const Afterlogin = () => {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { title } = router.query;
  const [course, setCourse] = useState(null);
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isMobileScreen = useMediaQuery({ maxWidth: 767 });
  const [showSideBar, setShowSideBar] = useState(false);
  const [SideBarState, sendSideBarState] = useState(false);

  const fetchCourseData = async () => {
    try {
      console.log("fetching data is on ");
      const courseRef = collection(db, "courses");
      const q = query(courseRef, where("title", "==", title));
      const courseDocs = await getDocs(q);
      console.log(courseDocs)
      if (courseDocs.empty) {
        setCourse("asdfjjf");
      } else {
        const courseDoc = await getDoc(courseDocs.docs[0].ref);
        const courseData = courseDoc.data();
        setCourse({
          id: courseDoc.id,
          ...courseData,
        });
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      setCourse(null);
    }
  };
  useEffect(() => {
    if (isMediumScreen) {
      sendSideBarState(false);
    }
  }, [isMediumScreen]);

  useEffect(() => {
    if (title) {
      console.log(title);
    }
    fetchCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, [title]);

  // console.log("course data:", course);
  function toggleSideBar() {
    setShowSideBar(!showSideBar);
    sendSideBarState(showSideBar);
  }

  if (!user) {
    return null;
  }
  return (
    <>
      <div className="flex ">
        {isMobileScreen && (
          <div
            className={`fixed right-0 ${SideBarState ? "block" : "hidden"} w-[281px] min-h-screen bg-[#25262C]  rounded-l-[40px] z-10`}
          >
            <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
          </div>
        )}

        {/* Second Sidebar - Visible on Desktop */}
        {!isMobileScreen && (
          <div className={`md:block  hidden w-[221px] bg-[#141518]z-10`}>
            <CourseoverviewSidebar toggleSideBar={toggleSideBar} />
          </div>
        )}

        <div className="rounded-tl-[50px] w-full bg-[#2D2E35] ">
          <div className="flex justify-between  top-0 md:border-b-[1px] border-b-[2px] border-[#717378]">
            <Dashboardnav heading="After Log" toggleSideBar={toggleSideBar} />
          </div>

          <div className="h-full text-white bg-[#2D2E35]">
            {course ? (
              <>
                <div className="flex flex-col md:flex-row pt-10 px-4">
                  <div className="flex-1 md:pl-20">
                    <span className="text-sm text-gray-500"> COURSE</span>
                    <div className="text-3xl md:text-4xl font-bold">
                      {course.title}
                    </div>
                    <div className="text-xl md:text-[22px] mt-4">
                      {course.desc}
                    </div>
                    <Link
                      href={{
                        pathname: '/beta/videoplayback',
                        query: {
                          title: course.title
                        }
                      }}
                      type="button"
                      className=" md:text-base mt-10 mb-10 lg:text-base xl:text-lg rounded-xl bg-[#A145CD] px-4 py-2 font-semibold"
                    >
                      Get Started for Free
                    </Link>
                  </div>
                  <div className="flex-1 justify-center lg:justify-end lg:pr-8 lg:flex m-auto mt-[-20px]">
                    <Image
                      src={course.banner || "/pagesgraphics/student/coursedescription/laptop.svg"}
                      width={250}
                      height={250}
                      alt="laptop"
                      className="justify-center flex"
                    />
                  </div>
                </div>
                <div className="rounded-tl-[30px] rounded-tr-[30px] md:rounded-tr-[0] bg-[#373A41] flex flex-col md:flex-row ">
                  <div className="flex-col md:w-3/5 text-base space-y-10">
                    {course.learn ? (
                      <div className="w-[90%] md:w-[80%] mx-auto my-4 mt-10  bg-[#2D2E35] rounded-[30px] px-4 py-3">
                        <h1 className="text-2xl text-center my-6">
                          What you&apos;ll Learn
                        </h1>

                        <ul>
                          {course.learn.map((learn) => (
                            <li key={course.id}>
                              <p className="flex my-6 text-sm">
                                <Image
                                  src="/pagesgraphics/student/coursedescription/tick.svg"
                                  alt="tick"
                                  width={30}
                                  height={30}
                                  className="mr-4"
                                />
                                {learn.point}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="">
                      {course.modules ? (
                        <div className="md:w-[80%] w-[90%] mx-auto">
                          <h1 className="text-xl">Course Content</h1>
                          {course.modules.map((ele) => (
                            <Accordion
                              key={ele.id}
                              title={ele.name}
                              desc={ele.desc}
                              course={course.title}
                            />
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="">
                      <div className="md:w-[80%] w-[90%]  mx-auto">
                        <h1 className="text-xl">Requirement</h1>
                        <div className="border rounded-xl border-[#728095] my-4 px-4 py-6">
                          Access to a computer running Windows. Mac OS X or
                          Linux
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-col mx-auto w-[90%] md:w-2/5  text-base">
                    <div className=" bg-[#2D2E35] font-raleway px-5 py-2  mx-2  xl:mr-8   rounded-[20px] mt-10 ">
                      <h1 className="pt-8 text-base">COURSE DESCRIPTION</h1>
                      <div className="leading-[28px] text-sm pt-5">
                        {course.desc}
                        <h2 className="text-base pt-8 pb-6">COURSE DETAILS</h2>
                        <p className="flex my-3 font-medium">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/clock.svg"
                              width={22}
                              height={22}
                              alt="clock"
                              className="mr-4"
                            />
                          </span>
                          {course.duration} weeks Duration
                        </p>
                        <p className="flex my-3">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/Lap.svg"
                              width={22}
                              height={22}
                              alt="laptop"
                              className="mr-4"
                            />
                          </span>
                          {course.lectures} Sessions
                        </p>
                        <p className="flex my-3">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/ChartBar.svg"
                              width={22}
                              height={22}
                              alt="chart"
                              className="mr-4"
                            />
                          </span>
                          {course.level}
                        </p>
                        <p className="flex my-3">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/Globe.svg"
                              width={22}
                              height={22}
                              alt="globe"
                              className="mr-4"
                            />
                          </span>
                          {course.language}
                        </p>
                        <p className="flex my-3">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/Smiley.svg"
                              width={22}
                              height={22}
                              alt="smiley"
                              className="mr-4"
                            />
                          </span>
                          Online at your own pace
                        </p>
                        <p className="flex my-3">
                          <span>
                            <Image
                              src="/pagesgraphics/student/coursedescription/Group_30.svg"
                              width={22}
                              height={22}
                              alt="group"
                              className="mr-4"
                            />
                          </span>
                          Certificate of completion
                        </p>
                        <div>
                          <h2 className="text-base pt-10">OUR EXPERT</h2>
                          <div className="flex my-7">
                            <Image
                              src="/pagesgraphics/student/coursedescription/Ellipse_1.svg"
                              width={40}
                              height={40}
                              alt="f"
                              className="mr-4"
                            />
                            <div className="pl-4">
                              <p className="font-medium text-lg  leading-7 tracking-wide">
                                {course.leadMentor}
                              </p>
                              <p className="text-sm leading-4">C++ Professor</p>
                            </div>
                          </div>
                          <div className="mb-10 font-medium tracking-wide text-xs">
                            SHARE THIS COURSE
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="font-raleway  bg-[#2D2E35] px-5 py-2 mt-4 md:mt-4 mx-2 xl:mr-8  xl:mt-8 rounded-[20px] pb-6">
                      <div className="my-8">
                        <h2 className="text-base">Students Reviews</h2>
                        <p className="leading-[29px] text-sm font-normal my-4">
                          Lorem ipsum dolor sit amet. Sed accusantium dolores et
                          voluptatibus voluptas et possimus quis ex nesciunt
                          corrupti in quam quae est labore ducimus ut
                          consequuntur asperiores.
                        </p>
                      </div>
                      <div>
                        <div className="flex pt-2">
                          <Image
                            src="/pagesgraphics/student/coursedescription/Male.svg"
                            width={40}
                            height={40}
                            alt="f"
                          />

                          <div className="pl-[10px]">
                            <p className="font-normal tracking-wide text-sm leading-4">
                              Mehul Jain{" "}
                            </p>
                            <p className="text-[10px] font-normal text-[#8D8E92]">
                              Student
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center m-5">Loading...</p>
            )}

            <div className=" flex flex-col items-center justify-between text-xl md:text-2xl bg-[#373A41] pb-5 ">
              <div className="text-center pt-20">
                Explore Similar Courses
              </div>
              <div>
                <div className="md:flex gap-5  rounded-[30px] md:space-y-0 space-y-5  mt-10 md:mx-[0.5rem] mx-6 ">
                  <div className="border bg-black rounded-[30px] p-5   ">
                    <div className="flex justify-between">
                      <Image
                        width={100}
                        height={100}
                        alt={"img"}
                        src="/pagesgraphics/student/coursedescription/laptop.svg"
                        className="w-12"
                      />
                      <div className="text-sm  text-[#E1348B] m-auto">
                        25 Lessons
                      </div>
                      <div className="text-sm md:ml-1 text-[#E1348B] m-auto">
                        Beginner
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-600">COURSE</div>
                    <h1 className="text-sm">Introduction to C++</h1>
                    <p className="text-[13px] leading-4 text-gray-500">
                      Learn the basics of C++ and how to write your first code.{" "}
                    </p>
                    <div className="text-right">
                      <button className="mt-2 text-xs  border-pink p-2 border">
                        Explore
                      </button>
                    </div>
                  </div>
                  <div className="border bg-black rounded-[30px] p-5  ">
                    <div className="flex justify-between">
                      <Image
                        width={100}
                        height={100}
                        alt={"img"}
                        src="/pagesgraphics/student/coursedescription/laptop.svg"
                        className="w-12"
                      />
                      <div className="text-sm  text-[#E1348B] m-auto">
                        25 Lessons
                      </div>
                      <div className="text-sm md:ml-1 text-[#E1348B] m-auto">
                        Beginner
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-600">COURSE</div>
                    <h1 className="text-sm">Introduction to C++</h1>
                    <p className="text-[13px] leading-4 text-gray-500">
                      Learn the basics of C++ and how to write your first code.{" "}
                    </p>
                    <div className="text-right">
                      <button className="mt-2 text-xs border-pink  p-2 border">
                        Explore
                      </button>
                    </div>
                  </div>
                  <div className="border bg-black rounded-[30px] p-5  ">
                    <div className="flex justify-between">
                      <Image
                        width={100}
                        height={100}
                        alt={"img"}
                        src="/pagesgraphics/student/coursedescription/laptop.svg"
                        className="w-12"
                      />
                      <div className="text-sm  text-[#E1348B] m-auto">
                        25 Lessons
                      </div>
                      <div className="text-sm md:ml-1 text-[#E1348B] m-auto">
                        Beginner
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-600">COURSE</div>
                    <h1 className="text-sm">Introtion to C++</h1>
                    <p className="text-[13px] leading-4 text-gray-500">
                      Learn the basics of C++ and how to write your first code.{" "}
                    </p>
                    <div className="text-right">
                      <button className="mt-2 text-xs border-[#E1348B]  p-2 border ">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Afterlogin;
