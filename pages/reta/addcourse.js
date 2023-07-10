// Page not found in given figma , CSS needed to be rechecked.
// This page ui is different from the figma design.

import { IoClose } from "react-icons/io5";
import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebaseconfig";
import Link from "next/link";
import Image from "next/image";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useStep } from "@/hooks/useStep";
import IDdraganddrop from "@/components/student/assignments/iddraganddrop";

const numOfMentors = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const mentorLists = ["Dinesh Saini", "Rahul", "Raj", "Ravi"];
const numOfModules = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const categories = ["Web Development", "App Development", "UI/UX", "Others"];

const PlanCourseForm = () => {
  return (
    <>
      {/* course name */}
      <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Title
        </label>
        <input
          type="text"
          placeholder="Enter coures title"
          className="AddMentorInput flex-1  h-10 rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full  flex flex-col md:flex-row justify-start items-start  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Course Description
        </label>
        <textarea
          type="text"
          placeholder="Enter course description"
          className="AddMentorInput flex-1 h-28 rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>

      {/* duration, session and language */}
      <div className="flex flex-col md:flex-row justify-start items-start  gap-x-10 px-4 mb-8">
        <div className="flex flex-1 flex-row items-center gap-x-2">
          <label className="w-40" htmlFor="">
            Duration
          </label>
          <input
            type="number"
            className="AddMentorInput h-10 rounded-lg px-2 flex-1"
            style={{ background: "#333333" }}
            placeholder="Enter duration in weeks"
          />
        </div>
        <div className="flex flex-1 items-center gap-x-2 px-4">
          <label className="w-40" htmlFor="">
            Lectures
          </label>
          <input
            type="number"
            placeholder="Enter total lectures"
            className="AddMentorInput h-10 rounded-lg px-2 flex-1"
            style={{ background: "#333333" }}
          />
        </div>
      </div>

      {/* level */}
      <div className="w-full hidden md:w-3/4 md:flex flex-col md:flex-row justify-start items-start md:items-center gap-x-2 px-4 mb-8">
        <legend className="w-40" htmlFor="">
          Level :
        </legend>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input type="radio" name="level" value="Beginner" className="mr-2" />
          <label>Beginner</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input
            type="radio"
            name="level"
            value="Intermediate"
            className="mr-2"
          />
          <label>Intermediate</label>
        </div>
        <div className="border-2 border-gray-600 px-3 py-1 rounded-lg">
          <input type="radio" name="level" value="Advanced" className="mr-2" />
          <label>Advanced</label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-start items-start  gap-x-10 px-4 mb-8">
        <div className="flex-1 flex items-center gap-x-4">
          <label className="w-40" htmlFor="">
            Category:
          </label>
          <div className="bg-[#313131] rounded-lg h-10 px-2 flex-1">
            <select
              className="AddMentorInput w-full h-10 bg-[#313131] "
              style={{ background: "#333333" }}
            >
              <option className="text-white/50" disabled selected value="">
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-x-2 px-4">
          <label className="w-40" htmlFor="">
            Language :
          </label>
          <div className="bg-[#313131] rounded-lg h-10 px-2 flex-1">
            <select
              className="AddMentorInput w-full h-10 rounded-lg"
              style={{ background: "#313131" }}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="french">french</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="w-40" htmlFor="">
          Upload Banner Image
        </label>
        <IDdraganddrop />
      </div>

      {/* number of mentor and lead mentor */}
      {/* <div className="w-full md:w-3/4 flex flex-col md:flex-row justify-start items-start md:items-center gap-y-3 md:gap-x-28 px-4 mb-4 md:mb-8">
    <div className="flex items-center gap-x-4">
      <label htmlFor="" className="text-xs md:text-base">
        Num of Mentor:
      </label>
      <div className="bg-[#313131] rounded-lg h-10 px-2">
        <select
          className="AddMentorInput w-36 md:w-32 h-10 rounded-lg"
          style={{ background: "#313131" }}
          value={numMentor}
          onChange={(e) => setNumMentor(parseInt(e.target.value))}
        >
          <option value="0">0</option>
          {numOfMentors.map((mentorNum) => (
            <option key={mentorNum} value={mentorNum}>
              {mentorNum}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="flex gap-x-4 items-center">
      <label htmlFor="" className="text-xs md:text-base">
        Lead Mentor:
      </label>
      <div className="bg-[#313131] rounded-lg h-10 px-2">
        <select
          className="AddMentorInput w-48 md:w-60 h-10 rounded-lg"
          style={{ background: "#313131" }}
          value={leadMentor}
          onChange={(e) => setLeadMentor(e.target.value)}
        >
          <option value="null">Dinesh Saini</option>
          {mentorLists.map((mentor) => (
            <option key={mentor} value={mentor}>
              {mentor}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div> */}

      {/* assistance mentor */}
      {/* <div className="border-2 border-gray-500 px-4 py-2 h-30">
    <div className="flex items-center gap-x-4 mb-4">
      <label htmlFor="" className="text-xs md:text-base">
        Assistant Mentor :
      </label>
      {renderMentorInputs()}
    </div>
    <div className="w-fit md:w-max flex flex-wrap md:flex-nowrap md:flex-row items-center gap-y-2 gap-x-2">
      {assistMentor.map((mentor) => (
        <div
          key={mentor.id}
          className="w-fit px-2 py-1 border-2 flex items-center gap-x-2 border-gray-500 rounded-lg"
        >
          <p>{mentor.name}</p>
          <IoClose onClick={() => removeMentorInput(mentor.id)} />
        </div>
      ))}
    </div>
  </div> */}
    </>
  );
};


const TargetStudentsForm = () => {

  return (
    <>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          What will the students learn from your course ?
        </label>
        <textarea
          type="text"
          placeholder="Example, Will learn basics of UI/UX "
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Are there any course requirements or prerequisites ?
        </label>
        <textarea
          type="text"
          placeholder="Example, Have a laptop"
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>
      <div className="w-full flex flex-col mt-12  gap-y-2 md:gap-x-2 px-4 mb-8">
        <label className="" htmlFor="">
          Who are your target students ?
        </label>
        <textarea
          type="text"
          placeholder="Example, people who are curious about design or beginners"
          className="AddMentorInput h-28 max-w-4xl rounded-lg px-2"
          style={{ background: "#333333" }}
        />
      </div>

    </>
  )

}

const headingContent = [
  {
    title: "Course Details",
    desc: "Fill out this form with correct information to proceed forward. After submission it takes 1-2 weeks to review your application. If you have any query reach out to us at (add email).",
  },
  {
    title: "Target Students",
    desc: "The description you write here will help decide the students decide if your course is the one for them.",
  },
  {
    title: "Create class module",
    desc: "Fill out this form with correct information to proceed forward. After submission it takes 1-2 weeks to review your application.",
  },
];

const Header = ({ currentStep }) => {
  return (
    <div className="w-full flex flex-row items-center justify-between p-2 mb-2">
      <div className="flex-[4]">
        <h3 className="text-3xl font-medium tracking-wide pb-2">
          {headingContent[currentStep - 1].title}
        </h3>
        <p className="text-sm text-white/60">
          {headingContent[currentStep - 1].desc}
        </p>
      </div>
      <div className="flex-1 text-right">
        <button className="px-12 py-3 bg-[#A145CD] rounded-md hover:scale-105 duration-100 transition-all">
          Next
        </button>
      </div>
    </div>
  );
};

const Sidebar = ({ currentStep = 1, setStep }) => {
  const steps = ["Plan Course", "Target Students", "Create course content"];

  return (
    <div className="mt-8 flex flex-col items-stretch gap-5">
      {steps.map((step, index) => (
        <buttton
          onClick={() => setStep(index + 1)}
          className="py-4 group cursor-pointer transition-colors duration-150"
          key={index}
        >
          <h4
            className={`text-xl ${currentStep === index + 1
              ? "text-primary"
              : "text-primary/60 group-hover:text-primary/90"
              }  font-semibold`}
          >
            Step {index + 1}
          </h4>
          <p
            className={`${currentStep === index + 1
              ? "text-white"
              : "text-white/60 group-hover:text-white/90"
              }`}
          >
            {step}
          </p>
        </buttton>
      ))}
    </div>
  );
};

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [numModules, setNumModules] = useState(0);
  const [modules, setModules] = useState([]);
  const [category, setCategory] = useState();
  const [duration, setDuration] = useState();
  const [sessions, setsessions] = useState();
  const [language, setLanguage] = useState("English");
  const [details, setDetails] = useState("");
  const [level, setLevel] = useState("");
  const [numMentor, setNumMentor] = useState(0);
  const [leadMentor, setLeadMentor] = useState("");
  const [assistMentor, setAssistMentor] = useState([
    { id: 1, name: "Dinesh Saini" },
    { id: 2, name: "Rahul" },
    { id: 3, name: "Raj" },
    { id: 4, name: "Ravi" },
  ]);
  const [learn, setLearn] = useState([{ id: 1, point: "" }]);
  const { user } = useAuthContext();

  const addPoint = () => {
    setLearn([...learn, { id: learn.length + 1, point: "" }]);
    console.log(learn);
  };

  const handlePointChange = (id, point) => {
    setLearn(learn.map((l) => (l.id === id ? { ...l, point } : l)));
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    updatedModules[index] = { ...updatedModules[index], id: index + 1 };
    setModules(updatedModules);
  };

  const handleAssistanceMentorChange = (index, field, value) => {
    const updatedAssistanceMentors = [...assistMentor];
    updatedAssistanceMentors[index] = {
      ...updatedAssistanceMentors[index],
      [field]: value,
    };
    updatedAssistanceMentors[index] = {
      ...updatedAssistanceMentors[index],
      id: index + 1,
    };
    setAssistMentor(updatedAssistanceMentors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "courses"), {
        title,
        desc,
        numModules,
        modules,
        category,
        duration,
        sessions,
        language,
        details,
        level,
        numMentor,
        leadMentor,
        assistMentor,
        learn,
        data: serverTimestamp(),
      });

      await setDoc(doc(db, "chatGroups", docRef.id), {
        groupId: docRef.id,
        members: [user.uid],
        name: title,
        isGroup: true,
        lastMessage: "",
        lastMessageTimestamp: serverTimestamp(),
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
      alert("added");

      resetForm();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setNumModules(0);
    setModules([]);
    setCategory(categories[0]);
    setDuration(0);
    setsessions(0);
    setLanguage("English");
    setDetails("");
    setLevel("");
    setNumMentor(0);
    setLeadMentor("");
    setAssistMentor([]);
    setLearn([{ id: 1, point: "" }]);
  };

  const renderModuleInputs = () => {
    if (!modules) {
      return null;
    }
    const moduleInputs = Array.from({ length: numModules }, (_, i) => {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = modules[i] || { id: i + 1, title: "", desc: "" };

      return (
        <>
          <div
            className="flex flex-col w-full bg-[#404046] h-fit md:h-96 rounded-lg my-6"
            key={i}
          >
            <p className="px-8 py-4 md:py-6 text-xl">Add Module {i + 1}</p>
            <hr className="border-x-2 border-gray-500 mb-6" />
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-8">
              <label htmlFor="">Module Subtitle:</label>
              <input
                type="text"
                value={module.title}
                onChange={(e) => handleModuleChange(i, "title", e.target.value)}
                placeholder="Type here"
                className="AddMentorInput w-full md:w-3/4 h-10 rounded-lg px-2"
                style={{ background: "#333333" }}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-y-2 md:gap-x-2 px-4 mb-4 md:mb-8">
              <label htmlFor="">Desc:</label>
              <textarea
                type="text"
                value={module.desc}
                onChange={(e) => handleModuleChange(i, "desc", e.target.value)}
                placeholder="Type here"
                className="AddMentorInput w-full h-24 rounded-lg px-4 py-4"
                style={{ background: "#333333" }}
              />
            </div>
          </div>
          <br></br>
        </>
      );
    });

    return moduleInputs;
  };

  const renderMentorInputs = () => {
    const assistanceMentorInputs = Array.from(
      { length: numMentor - 1 },
      (_, i) => {
        const assistanceMentor = assistMentor[i] || {
          id: i + 1,
          name: "",
        };

        return (
          <div key={i}>
            <input
              type="text"
              value={assistanceMentor.name}
              placeholder="Assistant Mentor"
              className="AddMentorInput w-1/2 md:w-3/4 h-10 rounded-xl px-2"
              onChange={(e) =>
                handleAssistanceMentorChange(i, "name", e.target.value)
              }
              style={{ background: "#333333" }}
            />
          </div>
        );
      }
    );
    return assistanceMentorInputs;
  };

  function removeMentorInput(id) {
    console.log("removed");
    setAssistMentor(assistMentor.filter((m) => m.id !== id));
  }

  const [currentStep, helpers] = useStep(3);

  const {
    canGoToPrevStep,
    canGoToNextStep,
    goToNextStep,
    goToPrevStep,
    reset,
    setStep,
  } = helpers;

  return (
    <div className="text-white flex flex-col justify-center items-center px-5">
      {/* nav bar */}
      <div className="w-screen border-b-2 border-grey text-center">
        <div className=" flex justify-center gap-x-96 items-center">
          <Link href="/">
            <ul>
              <li className="ml-2  text-2xl uppercase hover:border-b text-white text-center h-[50px] md:h-[60px]">
                <Image
                  src={NeatS}
                  alt="logo"
                  className=" h-full"
                  width={200}
                  height={200}
                />
              </li>
            </ul>
          </Link>
          <div className="justify-start flex gap-2  sm:text-xs  md:text-md">
            <ul className="hidden sm:flex justify-center items-center  text-white sm:gap-0 lg:gap-12 pr-5 ">
              <Link href="/create-category">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Category
                </li>
              </Link>
              <Link href="/create-course">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Create Course
                </li>
              </Link>
              <Link href="/upload-video">
                <li className="ml-10 text-md uppercase hover:border-b ">
                  Upload video
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 w-full">
        <div className="col-span-2 h-full pl-12 ">
          <Sidebar currentStep={currentStep} setStep={setStep} />
        </div>
        <div className="col-span-8 h-max  p-8 bg-[#222222] rounded-lg mt-4 mb-4">
          <Header currentStep={currentStep} />
          <hr className="border-x-2 border-gray-500 mb-4" />

          {currentStep === 1 && <PlanCourseForm />}

          {currentStep === 3 && (
            <div className="w-full ">
              <div className="my-4 flex items-center gap-x-4 w-full">
                <label htmlFor="">Number of Modules :</label>
                {/* <input
            type="text"
            placeholder="Type here"
            className="AddMentorInput w-1/4 h-10 rounded-lg px-2"
            style={{ background: '#333333' }}
          /> */}
                <div className="bg-[#313131] rounded-lg h-10 px-2">
                  <select
                    className="AddMentorInput w-28 h-10"
                    style={{ background: "#333333" }}
                    onChange={(e) => setNumModules(parseInt(e.target.value))}
                  >
                    <option value="0">0</option>
                    {numOfModules.map((moduleNum) => (
                      <option key={moduleNum} value={moduleNum}>
                        {moduleNum}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {renderModuleInputs()}
            </div>
          )}

          {currentStep === 2 && (
            <TargetStudentsForm />
            // <>
            //   {/* category */}

            //   {/* learnings */}
            //   <div className="flex flex-col bg-[#404046] h-fit rounded-lg my-6">
            //     <p className="px-8 py-4 md:py-6 text-xl">
            //       What you&apos;ll learn
            //     </p>
            //     <hr className="border-x-2 border-gray-500 md:mb-6" />
            //     {learn.map((l) => (
            //       <div
            //         key={l.id}
            //         className="flex flex-col md:flex-row justify-start items-start gap-y-2 md:gap-x-2 px-4 my-4 md:my-8"
            //       >
            //         <label htmlFor="">learnings:</label>
            //         <textarea
            //           type="text"
            //           placeholder="Type here"
            //           id={`point-${l.id}`}
            //           value={l.point}
            //           onChange={(e) => handlePointChange(l.id, e.target.value)}
            //           className="AddMentorInput w-full h-18 rounded-lg px-4 py-4"
            //           style={{ background: "#333333" }}
            //         />
            //       </div>
            //     ))}

            //     <div className="flex justify-end px-2 py-1 mx-10">
            //       <button
            //         onClick={addPoint}
            //         className="w-fit border-2 border-gray-500 md:my-4 px-6 py-1 rounded-lg"
            //       >
            //         Add Point
            //       </button>
            //     </div>
            //   </div>
            // </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
