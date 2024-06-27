import { useEffect, useState } from 'react';
import axios from 'axios';
import UserModal from "./Modals/UserModal";
import AddUserModal from "./Modals/AddUserModal";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);

    const [currUser, setCurrUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/users');
                setUsers(res.data.users);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const sortByName = () => {
        const sortedUsers = [...users].sort((a, b) =>
                 a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
    };

    const showUser = (user) => {
        setCurrUser(user);
        setShowModal(true);
    }

    if (loading) return <div className="fixed inset-0 flex items-center justify-center">
        <div className="loader"></div>
    </div>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {showModal && <UserModal setShowModal={setShowModal} user={currUser}/>}
            {showUserModal && <AddUserModal setShowUserModal={setShowUserModal} />}

            <div className={`${showModal ? "blur-sm" : "blur-none"} w-full`}>
                <div className={`w-full flex justify-between text-white `}>
                    <button className="bg-[#1c56d9] px-[10px] py-[5px] rounded-[5px]" onClick={() => setShowUserModal(true)}>
                        Add new user
                    </button>
                    <button className="bg-[#828995] px-[10px] py-[5px] rounded-[5px]" onClick={sortByName}>
                        Sort by name
                    </button>
                </div>
                <div className={"overflow-x-auto scrollbar-hide"}>
                    <table className="w-full bg-white ">
                        <thead className="bg-[#f9fafc] text-[#828995] rounded-t-lg border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">User</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Email</th>
                            <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Registered</th>
                        </tr>
                        </thead>
                        <tbody className="text-black bg-white">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:shadow-md border-b border-gray-200"
                                onClick={() => showUser(user)}>
                                <td className="py-3 px-4 flex gap-2 items-center overflow-hidden">
                                    <img src={user.photoProfile} alt=""
                                         className="w-10 h-10 rounded-full"/>
                                    <span className="text-sm md:text-base">{user.name}</span>
                                </td>
                                <td className="py-3 px-4 text-sm md:text-base">{user.email}</td>
                                <td className="py-3 px-4 text-sm md:text-base">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default UsersTable;
