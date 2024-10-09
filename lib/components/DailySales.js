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
                        <tr className="bg-yellow-400">
                            <th className="border p-2" rowspan="2">DATE</th>
                            <th className="border p-2" rowspan="2">SHIFT</th>
                            <th className="border p-2" rowspan="2">CASHIER</th>
                            <th className="border p-2" colspan="9">SALES AMOUNT</th>
                            <th className="border p-2" rowspan="2">SUBTOTAL</th>
                            <th className="border p-2" rowspan="2">TOTAL</th>
                        </tr>
                        <tr className="bg-yellow-300">
                            <th className="border p-2">CREDIT CARDS</th>
                            <th className="border p-2">CHARGE ACCT</th>
                            <th className="border p-2">GRAB DISC</th>
                            <th className="border p-2">COINS</th>
                            <th className="border p-2">BILLS</th>
                            <th className="border p-2">CHECKS</th>
                            <th className="border p-2">PAY POINTS/GCASH</th>
                            <th className="border p-2">VOUCHERS</th>
                            <th className="border p-2">OTHERS</th>
                            <th className="border p-2">ACTUAL POS</th>
                            <th className="border p-2">OVER/SHORTAGE</th>
                        </tr>
                    </thead>
                </table>
            </div>

        </>
    );
}
