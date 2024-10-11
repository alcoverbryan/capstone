import { useState } from 'react';
import { MagnifyingGlass } from "./HeroIcons";
import AddWetStockModal from "./Modals/AddWetStockModal";

export default function WetStock() {
    const [selectedTable, setSelectedTable] = useState(null); // State to track which table to show

    // Function to handle button click and set the selected table
    const handleButtonClick = (tableName) => {
        setSelectedTable(tableName);
    };

    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-b p-2 focus:outline-none w-full h-10 pl-8"
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
                <AddWetStockModal />
            </div>
        
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Wet Stock</p>
<<<<<<< HEAD
            </div>
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
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
=======
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={() => handleButtonClick('dailyDip')}
                    >
                        Daily Dip
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => handleButtonClick('dailySalesVolume')}
                    >
                        Daily Sales Volume
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => handleButtonClick('inventory')}
                    >
                        Inventory
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={() => handleButtonClick('priceGL')}
                    >
                        Price G&L
                    </button>
                </div>
            </div>  
            <div className="mt-10 bg-white rounded-md"> {/* first table  */}
                {selectedTable === 'dailyDip' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">ACTUAL DIP</th>
                            <th className="border p-2" rowspan="2"> UGT SALES</th>
                            <th className="border p-2" rowspan="2">  VAR SALES VS DIP</th>
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>               
                )}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">DAILY SALES VOLUME FROM POS DAY REPORT</th>
                            <th className="border p-2" rowspan="2">AVE./DAY
                            </th>
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>
                )}
              {selectedTable === 'inventory' && (
    <table className="w-full border-collapse">
         <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">DAILY INVENTORY VALUES</th>
                            <th className="border p-2" rowspan="2">AVE. ALL PRODS</th>
                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                        <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
>>>>>>> de48f98ced550fdaa9c8df71bb0d43d4f45acbac
                        </tr>
                    </thead>
        <tbody>
            {/* Table rows for data go here */}
        </tbody>
    </table>
)}
                {selectedTable === 'priceGL' && (
                    <table className="w-full border-collapse">
                         <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9"> PRICE INCREASE/ROLLBACK</th>
                            
                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                        <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD</th>
                                <th className="border p-2">VPN+D</th>
                                
                        </tr>
                    </thead>
                    </table>
                )}
            </div> 
            <div className="mt-10 bg-white rounded-md"> {/* second table */}
                {selectedTable === 'dailyDip' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">FUEL DELIVERIES (LITERS)</th>
                            
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>               
                )}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">PUMP PRICES FROM MANUAL FC REPORT</th>
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>
                )}
    
                {selectedTable === 'priceGL' && (
                    <table className="w-full border-collapse">
                         <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">WINDFALL GAINS & LOSSES</th>
                            <th className="border p-2" rowspan="2"> G&L TO DATE</th>
                            
                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                        <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD</th>
                                <th className="border p-2">VPN+D</th>        
                        </tr>
                    </thead>
                    </table>
                )}
            </div>
            <div className="mt-10 bg-white rounded-md">   {/* 3rd table   */}
                {selectedTable === 'dailyDip' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            
                            <th className="border p-2" colspan="9">EXCESS DELIVERY THIS YR</th>
                            
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">ITEM</th>
                                <th className="border p-2"> QTY DELIVERED </th>
                                <th className="border p-2">AVE. DAILY INV.</th>
                                <th className="border p-2">DAYS</th>
                                
                            </tr>
                        </thead>
                    </table>               
                )}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DAY</th>
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" colspan="9">DAILY SALES VALUE FROM POS DAY REPORT</th>
                           
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>
                )}
            </div>
            <div className="mt-10 bg-white rounded-md">   {/* 4th table   */}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2"></th>
                            <th className="border p-2" rowspan="2"></th>
                            <th className="border p-2" colspan="9"></th>
                           
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                <th className="border p-2">TOTAL</th>
                            </tr>
                        </thead>
                    </table>
                )}
            </div>
             <div className="mt-10 bg-white rounded-md">   {/* 5th table   */}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" colspan="9">PUMP PRICES COMPUTED</th>
                           
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                
                            </tr>
                        </thead>
                    </table>
                )}
            </div>
            <div className="mt-10 bg-white rounded-md">   {/* 6th table   */}
                {selectedTable === 'dailySalesVolume' && (
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" colspan="9">PUMP PRICES VARIANCE</th>
                           
                        </tr>
                            <tr className="bg-[#03A9F4] text-white">
                                <th className="border p-2">VPN+</th>
                                <th className="border p-2">FSG</th>
                                <th className="border p-2">VPN+R</th>
                                <th className="border p-2">FSD REG</th>
                                <th className="border p-2">VPN+D</th>
                                
                            </tr>
                        </thead>
                    </table>
                )}
            </div>


            </>
    );
}          