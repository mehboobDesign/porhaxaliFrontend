import React, {useState, useEffect} from "react";
import DynamicModal from "../commom/Modals/DynamicModal";
import Axios from "../../../api/Axios";
import { GET_STUDENTS } from "../../../api/Urls";
import { adminTabs } from "../commom/CommonArrays";
import Sidebar from "../student/Sidebar";
import UseAuth from "../../Hooks/UseAuth";
import { Loader, Pencil, Trash2 } from "lucide-react";

const AllStudents = () => {
const [courses, setCourses] = useState([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courseDescripton, setCourseDescription] = useState('');
  const { auth } = UseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchDataSuccess, setFetchDataSuccess] = useState(false);
  //const [getCourseById, setGetCourseById] = useState('');
  //const [wait, setWait] = useState(false);
  const [getStudentsDetails, setGetStudentsDetails] = useState([]);

  useEffect(()=>{
    if(isLoading) {
        const getStudent = async () => {
            try {
                await Axios.get(GET_STUDENTS,
                    {
                        headers: {
                            'Authorization': `Bearer ${auth.jwtToken}`, // Ensure space after Bearer
                            'Accept': 'application/json'
                        }
                    }
                    )
                    .then(function (response) {
                        setGetStudentsDetails(response.data.data);
                        setFetchDataSuccess(true);
                        console.log(response.data.data);
                    })
            } catch (err) {
                console.log(err);
            }
        };
        getStudent();
    }
  },[isLoading]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(false);
//     const data = {
//         name: courseName,
//         code: courseId,
//         description: courseDescripton,
//     }
//     try{
//         const response = await Axios.post(POST_SUBJECTS,
//                 data,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${auth.jwtToken}`, // Ensure space after Bearer
//                         'Accept': 'application/json'
//                     }
//                 }
//             );
//             console.log('Post successfull', response.data);
//             if(response.data.success) {
//                 setIsAddOpen(false);
//                 setIsLoading(true);
//             }
//     } catch (error) {
//         console.log("Error in course post method:", error);
//         setIsLoading(true);
//     } 
//   };
//   const handleEdit = async (id) => {
//     setWait(true)
//     try{
//         await Axios.get(GET_SUBJECTS.concat(id),
//         {
//             headers: {
//                 'Authorization': `Bearer ${auth.jwtToken}`, // Ensure space after Bearer
//                 'Accept': 'application/json'
//             }
//         }
//         )
//         .then(function (response) {
//             setGetCourseById(response.data.data);
//             setIsUpdateOpen(true);
//             setWait(false);
//         })
//     } catch (error){
//         console.log(error);
//         setWait(false);
//     }
//   };
//   const handleUpdate = async(e, id) => {
//     e.preventDefault();
//     setIsLoading(false);
//     setWait(true)
//     const data = {
//         name: courseName,
//         code: courseId,
//         description: courseDescripton,
//     }
//     try{
//         const response = await Axios.put(POST_SUBJECTS.concat(id),
//                 data,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${auth.jwtToken}`, // Ensure space after Bearer
//                         'Accept': 'application/json'
//                     }
//                 }
//             );
//             console.log('Update successfull', response.data);
//             if(response.data.success) {
//                 setIsUpdateOpen(false);
//                 setIsLoading(true);
//                 setWait(false);
//             }
//     } catch (error) {
//         console.log("Error in course post method:", error);
//         setIsLoading(true);
//         setWait(false)
//     } 
//   };
//   const handleDelete = () => {

//   };
    return(
        <>
        <div className="flex min-h-screen bg-gray-50 text-gray-800 font-montserrat">
            <Sidebar pageId="allStudents" tabs={adminTabs}/>
                <main className="flex-1">
                    <div className="p-8">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            {/* <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Course Directories</h2>
                                        <p className="text-sm text-gray-400">Add, edit details, or drop program blueprints instantly.</p>
                                </div>
                            <button onClick={() => setIsAddOpen(true)} className="rounded-xl hover:cursor-pointer hover:bg-gray-950 bg-gray-700 px-4 py-2 text-xs font-bold text-white transition-all active:scale-95 shadow-sm">
                                + Create Course
                            </button>
                            </div> */}
                            {/* <DynamicModal
                                isOpen={isAddOpen}
                                onClose={() => setIsAddOpen(false)}
                                title="Enter course details"
                            >
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Name:</label>
                                        <input
                                            type="text"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                            placeholder="Enter course name"
                                        />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Code:</label>
                                        <input
                                            type="text"
                                            value={courseId}
                                            onChange={(e) => setCourseId(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                            placeholder="Enter course code"
                                        />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Course Description:</label>
                                        <textarea
                                            type="text"
                                            value={courseDescripton}
                                            onChange={(e) => setCourseDescription(e.target.value)}
                                            className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                                            placeholder="Enter course description"
                                        />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </form>
                            </DynamicModal> */}
                            {fetchDataSuccess ?
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                        <th className="p-4 pl-6">ID</th>
                                        <th className="p-4">Title</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Price Grid</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4 pr-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                  <tbody className="divide-y divide-gray-100 text-sm font-medium">
                                    {/* {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-gray-50/70">
                                        <td className="p-4 pl-6 font-mono text-xs text-gray-400">{course.id}</td>
                                        <td className="p-4 font-bold text-gray-900">{course.name}</td>
                                        <td className="p-4 text-gray-500">{course.code}</td>
                                        <td className="p-4 text-gray-950 font-semibold">{course.description}</td>
                                        <td className="p-4 text-green-400 font-semibold">{course.status}</td>
                                        <td className="p-4 pr-6 text-right space-x-2">
                                            <button onClick={() => handleEdit(course.id)} className="text-xs font-semibold bg-pink-300 p-2 rounded-full text-stone-600 hover:cursor-pointer hover:bg-pink-500 hover:text-white"><Pencil className="h-5 w-5" /></button>
                                            <button onClick={() => handleDelete("course", course.id)} className="text-xs font-semibold bg-gray-200 p-2 rounded-full text-red-500 hover:cursor-pointer hover:bg-gray-300"><Trash2 className="h-5 w-5"/></button>
                                        </td>
                                    </tr>
                                    ))} */}
                                </tbody>
                            </table>:
                            <div className="p-6 flex items-center justify-center ">
                                {/* <Loader className="animate-spin h-8 w-8 text-[rgba(244,87,128)] " /> */}
                            </div>}
                            {/* <DynamicModal
                                isOpen={isUpdateOpen}
                                onClose={() => setIsUpdateOpen(false)}
                                title="Edit course details"
                            >
                                <form onSubmit={(e) => handleUpdate(e, getCourseById.id)} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Name:</label>
                                        <input
                                            type="text"
                                            defaultValue={getCourseById.name}
                                            onChange={(e) => setCourseName(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                            
                                        />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Code:</label>
                                        <input
                                            type="text"
                                            defaultValue={getCourseById.code}
                                            onChange={(e) => setCourseId(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                           
                                        />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Description:</label>
                                        <textarea
                                            type="text"
                                            defaultValue={getCourseById.description}
                                            onChange={(e) => setCourseDescription(e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        />
                                </div>
                                    <button
                                        type="submit"
                                        //className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
                                        className="bg-linear-to-r py-2 text-white from-pink-500 via-rose-500 to-pink-600 font-bold hover:cursor-pointer hover:from-purple-600 hover:via-purple-500 hover:to-purple-700 w-full rounded-lg"
                                    >
                                    Update
                                    </button>
                                </form>
                            </DynamicModal> */}
                        </div>
                    </div>
                    {/* {wait ? (
                        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                        <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-neutral-800 shadow-2xl">
                           
                                <Loader className="animate-spin h-8 w-8 text-[rgba(244,87,128)] " />
                        </div>
                        </div>
                    ) :(<></>)
                    } */}
                    
                </main>
            </div>
        </>
    );
}
export default AllStudents;