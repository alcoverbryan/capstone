import { MagnifyingGlass } from "./HeroIcons";
import AddDailySalesModal from "./Modals/AddDailySalesModal";

export default function DailySales() {
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
                <AddDailySalesModal/>
            </div>

            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Daily Sales</p>
            </div>

            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" rowspan="2">SHIFT</th>
                            <th className="border p-2" rowspan="2">CASHIER</th>
                            <th className="border p-2" colspan="9">SALES AMOUNT</th>
                            <th className="border p-2" rowspan="2">SUBTOTAL</th>
                            <th className="border p-2" rowspan="2">TOTAL</th>
                            <th className="border p-2" rowspan="2">ACTUAL</th>
                            <th className="border p-2" rowspan="2">OVER/SHORTAGE</th>
                            <th className="border p-2" rowspan="2">OTHER</th>

                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2">CREDIT CARD</th>
                            <th className="border p-2">CHARGE ACCT</th>
                            <th className="border p-2">GRAB DISC</th>
                            <th className="border p-2">COINS</th>
                            <th className="border p-2">BILLS</th>
                            <th className="border p-2">CHECKS</th>
                            <th className="border p-2">PAY POINTTS</th>
                            <th classNmae="border p-2">GCASH</th>
                            <th className="border p-2">VOUCHERS</th>
                        </tr>
                    </thead>
                </table>
            </div>

        </>
    );
}
