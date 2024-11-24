export default function PasswordReset({ pendingData , searchInput, userLogInData }) {
    console.log(userLogInData)
    return (
        <div className="mt-10 p-6 flex flex-col items-center justify-center">
            <div className="border lg:w-10/12 bg-white shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2">
                            <th className="px-4 py-4 text-[14px] text-nowrap text-dark">ID</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">FULL NAME</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">DETAILS</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingData
                        .filter(
                            (data) =>
                                data.user.full_name.toLowerCase().includes(searchInput.toLowerCase().trim())
                        )
                        .map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2 text-[14px] text-dark">{user.user.id}</td>
                                <td className="px-4 py-2 text-[14px] text-dark">{user.user.full_name}</td>
                                <td className="px-4 py-2 text-[14px] text-dark">Pending</td>
                                <td className="px-4 py-2 gap-2 text-[14px] flex justify-center text-dark">
                                    <form action="/api/adminConfirmPassword" method="POST">
                                        <input name="user_login_id" id="user_login_id" type="hidden" value={userLogInData.id} />
                                        <div class="">
                                            <input name="id" id="id" type="hidden" value={user.user.id} />
                                        </div>

                                        <input
                                            type="hidden"
                                            id="password"
                                            name="password"
                                            required
                                            value={user.new_password}
                                        ></input>

                                        <button type="submit" className="px-2 py-1 lg:w-[100px] border md:w-[100px] bg-accent5 text-black rounded-lg hover:bg-green-600">
                                            Approve
                                        </button>
                                    </form>

                                    <form action="/api/rejectPassword" method="POST">
                                        <input name="user_login_id" id="user_login_id" type="hidden" value={userLogInData.id} />
                                        <div class="">
                                            <input name="id" id="id" type="hidden" value={user.user.id} />
                                        </div>

                                        <button className=" px-2 py-1 lg:w-[100px] md:w-[100px]  bg-red-500 text-white rounded-lg hover:bg-red-600">
                                            Reject
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}