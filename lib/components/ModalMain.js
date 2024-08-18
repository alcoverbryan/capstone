// import { useState } from "react";
// import { XmarkIcon } from "./HeroIcons";

// export default function Modal ({icon, children, title}) {
//     const [modalvisibility, setIsModalVisible] = useState(false);

//     return (
//         <>
//             <button type="button" className="rounded-md" onClick={() => setIsModalVisible(true)}>
//                 {icon}
//             </button>        

//             {modalvisibility && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto z-50">
//                     <div className=" bg-white p-3 rounded-md">
//                         <div className="ps-4 pt-4 justify-center items-center flex">
//                             <div className="font-semibold text-start text-xl w-full">{title}</div>
//                             <button className="mr-2 border-0 transform" onClick={() => setIsModalVisible(false)}>
//                                 <span className="text-gray-600 text-4xl ">
//                                     <XmarkIcon/>
//                                 </span>
//                             </button>
//                         </div>

//                         {children}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }