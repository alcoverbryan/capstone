import { MagnifyingGlass } from "./HeroIcons";
import AddChargeAccountsModal from "./Modals/AddChargeAccountsModal";
import UpdatePaidAccounts from "./Modals/UpdatePaidAccounts";

export default function UnpaidAccounts({ userLogIn, allChargeAccount, handleChargeAccountSave }) {
    // Filter accounts where 'ewt' is not 0, null, or empty and 'ammount_paid' has a value greater than 0
    const filteredChargeAccounts = allChargeAccount.filter(
        (account) => 
            (account.ewt !== null && account.ewt !== "" && parseFloat(account.ewt) !== 0) && // ewt is not null, empty, or 0
            account.ammount_paid && parseFloat(account.ammount_paid) > 0 // ammount_paid is greater than 0
    );

    const totalAmount = filteredChargeAccounts.reduce((sum, account) => {
        const amount = parseFloat((account.ammount || "0").replace(/,/g, "")) || 0;
        return sum + amount;
    }, 0);
    
    const totalAmountPaid = filteredChargeAccounts.reduce((sum, account) => {
        const amountPaid = parseFloat((account.ammount_paid || "0").replace(/,/g, "")) || 0;
        return sum + amountPaid;
    }, 0);
    
    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative w-full">
                    <input type="text" placeholder="Search" className="border-b p-2 focus:outline-none w-full h-10 pl-8"/>
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <div className="p-4 shadow-md bg-white items-center border">
                    <p className="text-[20px]">Total Amount:</p>
                    <p className="text-[20px] font-semibold">
                        {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>

                <div className="p-4 shadow-md bg-white items-center border">
                    <p className="text-[20px]">Total Amount Paid:</p>
                    <p className="text-[20px] font-semibold">
                        {totalAmountPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="w-full table-auto bg-yellow-300 text-lg text-center">
                            <th className="border p-2">DATE</th>
                            <th className="border p-2">SOA #</th>
                            <th className="border p-2">CUSTOMER NAME</th>
                            <th className="border p-2">VOLUME (L)</th>
                            <th className="border p-2">AMOUNT</th>
                            <th className="border p-2">TERMS</th>
                            <th className="border p-2">BANK</th>
                            <th className="border p-2">CHECK NO.</th>
                            <th className="border p-2">AMOUNT PAID</th>
                            <th className="border p-2">EWT</th>
                            <th className="border p-2">CR NUMBER</th>
                            <th className="border p-2">DATE COLLECTED</th>
                            <th className="border p-2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredChargeAccounts.map((account) => (
                            <tr
                                key={account.id} // Ensure each row has a unique key
                                className={`bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out`}
                            >
                                <td className="p-4 border border-gray-200">{account.date}</td>
                                <td className="p-4 border border-gray-200">{account.soa}</td>
                                <td className="p-4 border border-gray-200">{account.cust_name}</td>
                                <td className="p-4 border border-gray-200">{account.volume}</td>
                                <td className="p-4 border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <h1>₱</h1>{account.ammount}
                                    </div>
                                </td>
                                <td className="p-4 border border-gray-200">{account.terms}</td>
                                <td className="p-4 border border-gray-200">{account.bank}</td>
                                <td className="p-4 border border-gray-200">{account.check_no}</td>
                                <td className="p-4 border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        {account.ammount_paid && <h1>₱</h1>}{account.ammount_paid}
                                    </div>
                                </td> 
                                <td className="p-4 border border-gray-200">
                                    <div className="flex items-center gap-2">
                                        {account.ewt && parseFloat(account.ewt) !== 0 && <h1>₱</h1>}
                                        {account.ewt}
                                    </div>
                                </td>
                                <td className="p-4 border border-gray-200">{account.cr_num}</td>
                                <td className="p-4 border border-gray-200">{account.date_collected}</td>
                                <td className="p-4 border border-gray-200">
                                    <div className="flex justify-center gap-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <UpdatePaidAccounts userLogIn={userLogIn} account={account} handleChargeAccountSave={handleChargeAccountSave}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
