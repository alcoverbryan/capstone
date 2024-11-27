import React, { useState } from "react";
import Swal from "sweetalert2";
import { BubbleLoading, Chevron_right } from "./HeroIcons";

const SettingsModal = ({ children, title, icon, span, title_text, save_button, showResetPassword, handleSubmit, isLoading, hasChanges }) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const handleCancel = () => {
        setModalVisibility(false);
    };
    


    return (
        <>
            <button type="button" className="rounded-md flex gap-1 font-semibold ml-2" onClick={() => setModalVisibility(true)}>
                {icon} {span} {title_text}
            </button>

            {modalVisibility && (
                <div className="fixed inset-0 flex justify-center h-full bg-light overflow-auto z-50 bg-slate-50">
                    <div className="w-full md:w-[80%] border-0 md:h-full border-red-500">
                        <div className="flex flex-col border-0 md:flex-row h-screen border-red-600 pt-20 px-[13px] gap-5">
                            <div className=" border-0 w-full ">
                                <div className=" bg-light border-b border-r mb-10 shadow-md rounded-lg py-4 p-1 md:p-4 ">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="flex items-start md:items-center flex-col md:flex-row md:px-2 px-4 gap-2">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-[12px] md:text-[18px] text-dark font-medium">Account Settings</span>
                                                    <Chevron_right className="h-3 md:h-4 w-3 md:w-4 text-dark" />
                                                </div>
                                                <span className="text-[12px] md:text-[18px] font-[700] text-dark">Account</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           
                                {children}
                                <div className="flex justify-end md:pr-8 pr-0 gap-3">   
                                    <button
                                        type="button"
                                        className="bg-light text-accent1 border border-[#F2D323] px-6 py-1 mt-4 rounded-md"
                                        onClick={handleCancel}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SettingsModal;