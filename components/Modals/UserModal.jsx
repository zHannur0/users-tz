import {questions} from "../../utils/questions";

export default function UserModal({setShowModal, user}) {
    return (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative sm:w-[50%] lg:w-[35%] h-[60%] shadow rounded-[20px] my-6 mx-auto ">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="relative p-4 sm:p-6 space-y-[10px]">
                                    <div className={"flex items-center gap-[20px]"}>
                                        <img src={user.photoProfile} alt="photo" className="w-20 h-20 rounded-full"/>
                                        <div>
                                            <h2 className="font-bold text-lg">{user.name}</h2>
                                            <p>{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-[5px] pl-4 overflow-auto scrollbar-hide ">
                                        <h3 className={"font-bold"}>Information about user</h3>
                                        {user.answers ? user.answers.map((answer) => {
                                            const question = questions.find(q => q.id === answer.question);
                                            return (
                                                <div key={answer._id} >
                                                    <h2 className="text-sm font-semibold">{question.title}</h2>
                                                    <p className="mt-2 text-xs"><strong>Answer:</strong> {question.answers[answer.selectedOption.charCodeAt(0) - 97]}</p>
                                                </div>
                                            );
                                        }) :
                                            <div>
                                                User do not have answers
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
    );
}