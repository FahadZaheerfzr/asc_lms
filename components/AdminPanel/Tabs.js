import React from 'react'

export default function Tabs({active, setActive}) {

    return (
        <div className="border-b border-primary-black border-opacity-20 font-poppins">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-primary-black">
                <li className="mr-2 cursor-pointer" onClick={()=>setActive("Faculty")}>
                    <a href="#" className={`inline-flex p-4 border-b-2 border-transparent ${active === "Faculty" ?"text-blue-800 border-b-2 border-blue-800" :""} rounded-t-lg  group`}>
                        <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${active === "Faculty" ?"text-blue-800" :""} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Faculty
                    </a>
                </li>
                <li className="mr-2 cursor-pointer" onClick={()=>setActive("Courses")}>
                    <a href="#" className={`inline-flex p-4 ${active === "Courses" ?"text-blue-800 border-b-2 border-blue-800" :""} rounded-t-lg active group`} aria-current="page">
                        <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${active === "Courses" ?"text-blue-800 " :""}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>Courses
                    </a>
                </li>
                <li className="mr-2 cursor-pointer" onClick={()=>setActive("Assigned")} >
                    <a href="#" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg group ${active === "Assigned" ?"text-blue-800 border-b-2 border-blue-800" :""}`}>
                        <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${active === "Assigned" ?"text-blue-800 " :""} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Assigned
                    </a>
                </li>
                <li className="mr-2 cursor-pointer" onClick={()=>setActive("Exams")} >
                    <a href="#" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg group ${active === "Exams" ?"text-blue-800 border-b-2 border-blue-800" :""}`}>
                        <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${active === "Exams" ?"text-blue-800 " :""} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>Exams
                    </a>
                </li>
                <li className="mr-2 cursor-pointer" onClick={()=>setActive("Students")}>
                    <a href="#" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg group ${active === "Students" ?"text-blue-800 border-b-2 border-blue-800" :""}`}>
                    <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${active === "Students" ?"text-blue-800" :""} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>Students
                    </a>
                </li>
            </ul>
        </div>

    )
}
