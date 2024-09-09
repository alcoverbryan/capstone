import React, { useState } from "react";
import { Xmark } from "./HeroIcons";


const Modal = ({ children, title, icon, span }) => {
    const [modalVisibility, setModalVisibility] = useState(false);

    return (
        <>
            <button type="button" className="rounded-md flex gap-1" onClick={() => setModalVisibility(true)}>
                {icon} {span}
            </button>

            {modalVisibility && (
                <div className=" fixed  inset-0 flex justify-center h-full bg-black overflow-auto bg-opacity-50 z-50">
                    <div className="w-full md:w-[50%] flex items-center  md:h-full border-0 border-red-500">
                        <div className="flex w-full flex-col md:flex-row h-screen border-0 border-red-600 items-center justify-center px-[13px] gap-5">
                            <div className="">
                                <div className="md:w-full border-0 border-red-500 shadow-lg bg-[#F2D323] rounded-lg p-2 px-8">
                                    <div className="ps-0 pt-4 justify-between border-0 w-full items-center flex ">
                                        <div className="font-semibold text-start text-[30px] text-black w-full">{title}</div>
                                        <button className="  mr-2 border-0 transform  " onClick={() => setModalVisibility(false)}>
                                            <span className="text-gray-600 text-4xl flex items-center ">
                                                <Xmark />
                                            </span>
                                        </button>
                                    </div>

                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;