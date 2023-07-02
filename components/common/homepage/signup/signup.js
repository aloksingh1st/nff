import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/componentsstyling/auth/auth.module.css";
import NeatS from "/public/componentsgraphics/schools/login/neatskillslogosample.svg";
import neatSvg from "/public/componentsgraphics/schools/login/Group 2.svg";
import Google from "/public/pagesgraphics/admin/login/_Google.svg";
import { AiOutlineMail } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  callSignupApi,
  createWithGoogle,
  handleResetPassword,
  login,
  signUpStudent,
} from "@/lib/exportablefunctions";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { Loading } from "@/lib/context/contextprovider";
import { HashLoader } from "react-spinners";
import { auth } from "@/config/firebaseconfig";
import { callEmailApi } from "@/lib/api";

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [blinkingIndex, setBlinkingIndex] = useState(0);
  const [role, setRole] = useState("student");
  const { loading, setLoading } = useContext(Loading);
  useEffect(() => {
    // const isEmailVerified =
    //   new URLSearchParams(window.location.search).get("mode") === "verifyEmail";
    // if (isEmailVerified) {
    //   // Display a message to inform the user that their email has been verified
    //   alert("Your email has been verified. You can now log in.");
    // }
    const interval = setInterval(() => {
      setBlinkingIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleSignup = async (e) => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    if (!password) {
      alert("Please enter your password");
      return;
    }
    e.preventDefault();
    try {
      await signUpStudent(email, password, router, setLoading, role, setRole);
      // routing towards add profile details page
    } catch (error) {
      console.log(error);
    }
  };
  async function createWithGoogle() {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const { displayName, email } = user;
      const data = { displayName, email };
      await callEmailApi(data);
      console.log(user);
      const studentData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        role: "student",
        verified: true,
        photoURL: user.photoURL,
      };

      callSignupApi(studentData);
      alert("Sign up successful!!");
      // router.push('/course-overview');
      router.push("/beta/profiledetails");
    } catch (error) {
      console.error("Failed to sign up with Google:", error);
    }
    setLoading(false);
  }

  return (
    <div className={`${loading ? "pointer-events-none z-1" : ""}`}>
      {loading && (
        <div style={{ pointerEvents: "none", zIndex: 1 }}>
          <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <HashLoader color="#E1348B" size={80} />
          </div>
        </div>
      )}
      <main
        className={`max-w-full md:h-screen   grid justify-center md:grid-cols-2 text-center text-white md:overflow-hidden `}
      >
        <div className=" m-auto w-full   ">
          <div className="flex justify-center md:pt-0  pt-[10px]  ">
            <div className="m-auto h-full ">
              <Image
                alt="Icon"
                src={NeatS}
                width={200}
                height={200}
                className="md:w-[280px] w-[180px]"
              />
            </div>
          </div>

          <div className="w-full flex justify-center mt-5 py-3">
            <div className="m-auto w-full relative">
              <div className="absolute inset-0 rounded-[100%] filter blur-3xl bg-gradient-to-r from-purple-500 to-pink-500  opacity-75 w-[50%] m-auto"></div>
              <Image
                alt="Icon"
                src={neatSvg}
                width={140}
                height={140}
                className="md:p-10 md:w-[45%] m-auto relative z-10"
              />
            </div>
          </div>

          <div>
            <p className="hidden md:block text-normal text-sm  pb-[20px]">
              Start learning right away !
            </p>
            <div className="  hidden  md:flex justify-center gap-2 ">
              <div
                className={`w-[50px] h-[7px] rounded ${
                  blinkingIndex === 0 ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
              <div
                className={`w-[50px] h-[7px] rounded ${
                  blinkingIndex === 1 ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
              <div
                className={`w-[50px] h-[7px] rounded ${
                  blinkingIndex === 2 ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            </div>
          </div>
        </div>
        <div className="m-auto md:mt-auto  md:w-[35vw]">
          <div className="rounded-[25px] p-4 w-full   bg-[#15161B] md:bg-[#ffffff05] px-5  space-y-2 ">
            <h1 className="md:mt-[30px] md:text-2xl"> Get started for free</h1>
            <p className=" text-white text-xs pb-5 ">
              Already have an account ?{" "}
              <span style={{ color: "#E1348B" }}>
                <Link href={"/beta/login"}> Log In </Link>
              </span>
            </p>
            <button
              onClick={() => createWithGoogle(router)}
              className="flex w-[90%] md:w-[80%] m-auto py-2 md:text-sm text-xs  text-white items-center justify-center gap-2 xl:p-[2px] lg:p-1.5px  border-[1px]  border-white rounded-lg "
            >
              <Image
                src={Google}
                alt=""
                className=" md:w-[30px]  sd:w-[20px]"
              />{" "}
              <span>Continue with Google</span>
            </button>

            <div className="flex w-[80%] m-auto items-center gap-1 text-white">
              <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-[#696969] "></div>
              <h5 className="xl:text-[15px] lg:text-[12px] md:text-[10px] sd:text-[8px]">
                or
              </h5>
              <div className="w-[48%] h-0 lg:border-[.5px]  md:border-[.3px] sd:border-[.07px] border-[#696969]"></div>
            </div>
            <div className=" md:pb-5 md:px-10  ">
              <form method="post" action="#" onSubmit={(e) => handleSignup(e)}>
                <p className="flex flex-start text-sm ml-2 mt-5">Email</p>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="  flex rounded-[15px]  bg-[#ffffff05] items-center "
                >
                  <AiOutlineMail
                    size={"2.5vh"}
                    style={{
                      color: "green",
                      width: "30px",
                      marginLeft: "2vh",
                      marginRight: "2vh",
                    }}
                  />

                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input  md:p-3 p-[10px] pr-10 cursor-pointer  focus:border-transparent focus:outline-none    rounded-lg  bg-transparent  w-[100%] text-sm "
                  />
                </div>
                <p className="flex flex-start text-sm ml-2 mt-6">Password</p>
                <div
                  style={{
                    "background-image":
                      "linear-gradient(177.81deg, rgba(255, 255, 255, 0.11) 1.84%, rgba(255, 255, 255, 0) 123.81%)",
                  }}
                  className="   flex rounded-[15px]   mb-6 bg-[#ffffff05] items-center "
                >
                  <FaLock
                    size={"2.5vh"}
                    style={{
                      color: "blue",
                      width: "30px",
                      marginLeft: "2vh",
                      marginRight: "2vh",
                    }}
                  />
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input  md:p-3 p-[10px] pr-10 cursor-pointer focus:border-transparent focus:outline-none  rounded-lg  bg-transparent  w-[100%] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#E1348B] md:w-[100%] w-[50%] p-2   rounded-[10px]"
                >
                  {false ? (
                    <span className="text-base">Logging In ...</span>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p
                  onClick={() => handleResetPassword(email)}
                  className=" cursor-pointer text-[10px] font-light pt-2   text-gray-500"
                >
                  By signing up, I agree to Neat Skill’s Terms of Service &
                  Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
