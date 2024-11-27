export default function UserConfirmation({ pendingUserData , searchInput, userLogIn }) {
    console.log(pendingUserData)
    return (
        <div className="mt-10 p-6 flex flex-col items-center justify-center">
            <div className="border lg:w-10/12 bg-white shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2">
                            <th className="px-4 py-4 text-[14px] text-nowrap text-dark">ID</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">FULL NAME</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">POSITION</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">
                               <div className="flex border-0 justify-center"> ACTION</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingUserData
                        .filter(
                            (data) =>
                                data.first_name.toLowerCase().includes(searchInput.toLowerCase().trim())
                        )
                        .map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2 text-[14px] text-dark">{user.id}</td>
                                <td className="px-4 py-2 text-[14px] text-dark">
                                    <div className="flex gap-2">
                                        <a>{user.first_name}</a>
                                        <a>{user.last_name}</a>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-[14px] text-dark">{user.position}</td>
                                <td className="px-4 py-2 gap-2 text-[14px] flex justify-center text-dark">
                                    <form action="/api/adminConfirmUser " method="POST">
                                        <input name="user_login_id" id="user_login_id" type="hidden" value={userLogIn.id} />
                                        <div class="">
                                            <input name="id" id="id" type="hidden" value={user.id} />
                                            <input name="first_name" id="first_name" type="hidden" value={user.first_name} />
                                            <input name="last_name" id="last_name" type="hidden" value={user.last_name} />
                                            <input name="gender" id="gender" type="hidden" value={user.gender} />
                                            <input name="permanent_address" id="permanent_address" type="hidden" value={user.permanent_address} />
                                            <input name="email" id="email" type="hidden" value={user.email} />
                                            <input name="password" id="password" type="hidden" value={user.password} />
                                            <input name="username" id="username" type="hidden" value={user.username} />
                                            <input name="phone_num" id="phone_num" type="hidden" value={user.phone_num} />
                                            <input name="position" id="position" type="hidden" value={user.position} />
                                            <input name="branch_id" id="branch_id" type="hidden" value={user.branch_id} />
                                            <input name="otp" id="otp" type="hidden" value={user.otp} />
                                        </div>

                                        <button type="submit" className="px-2 py-1 lg:w-[100px] border md:w-[100px] bg-accent5 text-black rounded-lg hover:bg-green-600">
                                            Approve
                                        </button>
                                    </form>

                                    <form action="/api/rejectUser" method="POST">
                                        <input name="user_login_id" id="user_login_id" type="hidden" value={userLogIn.id} />
                                        <div class="">
                                            <input name="id" id="id" type="hidden" value={user.id} />
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