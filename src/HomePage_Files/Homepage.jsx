import axios from "axios";
import heroBg from "../assets/shiny-overlay.svg"
import tutorBg from "../assets/tutor-bg.svg";
import "../App.css";
import Blog from "../components/Blog";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HomepageNavbar from "./HomepageNavbar";
import Footer from "../Navbar_Files/Footer";

import ImageSlider from "./ImageSilder";
import SlickSlider from "../components/SlickSlider";
import Sponsors from "../components/Sponsors";

const Homepage = () => {

    //Set the Courses List
    const [courseList, setCourses] = useState({ 
        id: 1,
        name: "American Law",
        category: "Science",
        price: "$12",
        butonText: "blue"
    })

    useEffect(() => {
        loadCourses();
    }, [])

    const loadCourses = async () => {

        try {
            const listOfCourses = await axios.get("http://localhost:9081/course/getcourses");

            const mappedCourses = listOfCourses.data.map((course) => {
                return {
                    courseID:course.courseId,
                    courseName: course.courseName,
                    category: course.courseCategory,
                    price: course.price,
                    buttonText: "View",
                };
            });

            //console.log(courseList)
            setCourses(mappedCourses); 

        }
        catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    const registerPath = "/register"
    const navigate = useNavigate();

    const navigateSignup = (path) => {
        navigate(path);
    }

    const registerTutor = "/regtutor"

    const navigateSignupTutor = (path) => {
        navigate(path);
    }

    return (
        <>
            <HomepageNavbar />
            <div className="pb-16 select-none">

                <div className="flex flex-wrap p-5 text-black">  
                    <div className="w-full md:w-1/2 pl-14 space-y-4 pt-8 pb-7">
                        <h1 className="text-4xl pr-3 leading-tight font-semibold tracking-normal break-words">  FASCON 2024: The 4th International Conference of the Faculty of Natural and Applied Sciences</h1>
                        <p className="text-blue-900 text-2xl font-extrabold">29 -31 October, 2024</p>
                        <p className="text-blue-900 text-2xl font-extrabold">Ibadan, Nigeria</p>
                        <p className="text-lg text-black pr-12">FASCON 2024 is being organized by the Faculty of Natural and Applied Sciences, Lead City University</p>
                        <button className="focus:outline-none bg-blue-300 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 font-medium text-md px-14 py-3" onClick={() => navigateSignup(registerPath)}>Register</button>
                    </div>
                    <div className="w-full md:w-1/2">
                      <img src="https://workspaces.nyc/wp-content/uploads/2023/11/8.jpg" alt="Image description"/> 
                    </div>  
                </div>

{/* 
                <div className="bg-gray-300 text-4xl px-5 py-4 pl-[5rem] font-semibold">
                    <div className="container mx-auto text-center text-blue-900">
                        SPONSORS
                    </div>
                </div> */}

                <div className="px-5 pb-5">
                    <Sponsors />
                </div>

                {/* <div className="bg-gray-300 text-4xl px-5 py-4 pl-[5rem] font-semibold">
                    <div className="container mx-auto">
                        SPONSORS
                    </div>
                </div> */}
                <Blog />

                {/* <div className="p-5 pl-8 py-6 text-[#ffff] text-[1.2rem]" style={{ backgroundImage: `url(${tutorBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <p>Are you passionate about teaching and sharing your knowledge with eager learners?</p>
                    <p className="py-5">Join LearnLodge and become a part of our growing community of educators!</p>
                    <p className="pt-2 mb-3">How to Get Started?</p>
                    <p>Click
                        <button
                            className="mx-3 focus:outline-none text-white bg-[#53a92b] hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={() => navigateSignupTutor(registerTutor)} >
                            Sign Up as a Admin
                        </button>
                        and create your tutor account.
                    </p>
                </div> */}

            </div >
            <Footer />
        </>
    )
}

export default Homepage;