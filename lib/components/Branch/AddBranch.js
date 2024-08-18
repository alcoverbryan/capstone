import { useRouter } from "next/router";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddBranch({userLogIn}) {
    const router = useRouter();
    return (
        <div>
            <Modal title="Add New Branch" icon={<PlusCircle className="w-7 h-7 text-orange-600" />} >
                <form action="/api/addBranch" method="POST">
                    <div className="">
                        <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id}/>
                        <div className="mb-2">
                            <label htmlFor="branch_name" className="block text-[#4F5153] font-semibold">Branch Name:</label>
                            <input type="text" id="branch_name" name="branch_name" required className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="location" className="block text-[#4F5153] font-semibold">Branch Location:</label>
                            <input type="text" id="location" name="location" required className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}