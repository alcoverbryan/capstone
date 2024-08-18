import AddBranchModal from "./Branch/AddBranchModal";
import { MagnifyingGlass } from "./HeroIcons";

export default function FuelPrices(){
    return(
        <>
           <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input type="text" placeholder="Search" className="border-b p-2 focus:outline-none w-full h-10 pl-8"/>
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <AddBranchModal/>
                </div>
            </div>
            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Fuel Prices</p>
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
                    <tbody>
                        <tr className="bg-white">
                            <td className="border p-2">Data 1</td>
                            <td className="border p-2">Data 2</td>
                            <td className="border p-2">Data 3</td>
                            {/* Add more rows and data cells as needed */}
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border p-2">Data 4</td>
                            <td className="border p-2">Data 5</td>
                            <td className="border p-2">Data 6</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </>
    );
}