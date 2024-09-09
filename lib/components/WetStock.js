import { MagnifyingGlass } from "./HeroIcons";
import AddBranchModal from "./Branch/AddBranchModal";

export default function WetStock(){
    return(
        <>
           <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input type="text" placeholder="Search" className="border-b p-2 focus:outline-none w-full h-10 pl-8"/>
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Wet Stock</p>
            </div>
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">FUEL TYPE</th>
                            <th className="border p-2">RSOP</th>
                            <th className="border p-2">APP BENNROS SHELL</th>
                            <th className="border p-2">PETRON HIWAY</th>
                            <th className="border p-2">CALTEX</th>
                            <th className="border p-2">TOTAL</th>
                            <th className="border p-2">REPHIL</th>
                            <th className="border p-2">SHELL AFFINIS</th>                            
                        </tr>
                    </thead>
                  
                </table>
            </div>
        </>
    );
}