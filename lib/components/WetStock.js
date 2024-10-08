import { MagnifyingGlass } from "./HeroIcons";
import React from "react";
import AddWetStockModal from "./Modals/AddWetStockModal";


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
                <AddWetStockModal/>
            </div>
            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Wet Stock</p>
            </div>
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">DAY</th>
                            <th className="border p-2">DATE</th>
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border p-2">TOTAL</th>
                            <th className="border p-2">UGT SALES</th>
                            <th className="border p-2">VAR SALES vs DIP</th>                            
                        </tr>
                    </thead>
                  
                </table>
            </div>
        </>
    );
}