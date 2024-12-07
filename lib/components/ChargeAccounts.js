import React, { useState } from "react";
import { MagnifyingGlass } from "./HeroIcons";
import AddChargeAccountsModal from "./Modals/AddChargeAccountsModal";
import UpdateChargeAccount from "./Modals/UpdateChargeAccount";
import PaidChargeAccount from "./Modals/PaidChargeAccount";

export default function ChargeAccounts({ userLogIn, allChargeAccount, handleChargeAccountSave }) {
    // Filter out accounts that already have an amount paid
    const filteredChargeAccounts = allChargeAccount.filter(
        (account) => !account.ammount_paid || parseFloat(account.ammount_paid) <= 0
    );

    const totalAmount = filteredChargeAccounts.reduce((sum, account) => {
        const amount = parseFloat((account.ammount || "0").replace(/,/g, "")) || 0;
        return sum + amount;
    }, 0);
    
    const [searchInput, setSearchInput] = useState("");

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>
                <AddChargeAccountsModal userLogIn={userLogIn} handleChargeAccountSave={handleChargeAccountSave} />
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
                            <th className="border p-2">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredChargeAccounts
                        .filter(
                            (filtered_item) =>
                                (filtered_item.soa.toLowerCase().concat(" ", filtered_item.soa.toLowerCase()).includes(searchInput.toLowerCase().trim())) ||
                            (filtered_item.cust_name.toLowerCase().concat(" ", filtered_item.cust_name.toLowerCase()).includes(searchInput.toLowerCase().trim()))
                        ).length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center text-red-500">
                                    Not found.
                                </td>
                            </tr>
                        ) : (
                            filteredChargeAccounts
                                .filter((data) =>
                                    data.soa.toLowerCase().concat(" ", data.soa.toLowerCase()).includes(searchInput.toLowerCase().trim()) ||
                                    data.cust_name.toLowerCase().concat(" ", data.cust_name.toLowerCase()).includes(searchInput.toLowerCase().trim()) 
                            )
                        .map((account) => (
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
                                <td className="p-4 border border-gray-200">
                                    <div className="flex justify-center gap-4">
                                        <div className="flex justify-center items-center gap-2">
                                            <UpdateChargeAccount userLogIn={userLogIn} account={account} handleChargeAccountSave={handleChargeAccountSave}/>
                                        </div>
                                        <div className="flex justify-center items-center gap-2">
                                            <PaidChargeAccount userLogIn={userLogIn} account={account} handleChargeAccountSave={handleChargeAccountSave}/>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
