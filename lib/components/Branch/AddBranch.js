import { useRouter } from "next/router";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddBranch({userLogIn}) {
    const router = useRouter();
    return (
        <div>
            <Modal title="Add New Branch" icon={<PlusCircle className="w-7 h-7 text-red-600" />} >
                <form action="/api/addBranch" method="POST">
                    <div className="border-0 w-[350px]">
                        <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id}/>
                        <div className="mb-2 mt-5">
                            <label htmlFor="branch_name" className="block text-[#4F5153] font-semibold text-[20px]">Branch Name:</label>
                            <input type="text" id="branch_name" name="branch_name" required className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="location" className="block text-[#4F5153] font-semibold text-[20px]">Branch Location:</label>
                            <input type="text" id="location" name="location" required className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md" />
                        </div>
                        <div className="flex justify-center mt-5 mb-[10px]">
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 md:w-[200px]">
                                <div>Add</div>
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}