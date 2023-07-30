import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import ArrowBack from "../assets/icons/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Error from "./Error";
import Envelope from "../assets/icons/Envelope";
import Call from "../assets/icons/Call";
import Webcam from "../assets/icons/Webcam";
import Share from "../assets/icons/Share";
import Trash from "../assets/icons/Trash";
import { deleteContact } from "../features/contact/contactSlice";

function PersonDetails() {
    const { id } = useParams();
    const dialog = useRef<HTMLDialogElement>(null);
    const navigate = useNavigate();
    const contacts = useAppSelector((state) => state.contact);
    const dispatch = useAppDispatch();
    const currentContact = contacts.find(
        (contact) => contact.contactId === Number(id),
    );

    if (!currentContact) {
        return <Error />;
    }

    const {
        contactName,
        contactGroup,
        contactPhoneNumber,
        contactFile,
        contactId,
    } = currentContact;

    function showModal() {
        dialog?.current?.showModal();
    }

    function handleClose() {
        dialog?.current?.close();
    }

    function handleDeleteContact() {
        dispatch(
            deleteContact({
                contactId,
                contactName,
                contactGroup,
                contactPhoneNumber,
                contactFile,
            }),
        );
        dialog?.current?.close();
        navigate("/");
    }

    return (
        <div className="flex h-full flex-col rounded-3xl bg-gradient-to-tr from-purple-400 via-blue-300 to-indigo-500 md:max-h-[60vh]">
            <div className="flex min-h-[50%] flex-col items-start rounded-t-3xl px-6 py-8 text-white md:pt-12">
                <div className="flex w-full">
                    <Link to="/" className="flex w-full items-center font-bold">
                        <ArrowBack height={24} width={24} className="mr-3" />
                        Agenda
                    </Link>

                    <Link
                        to={`/person/edit/${contactId}`}
                        className="flex w-full items-center justify-end font-bold"
                    >
                        Edit
                    </Link>
                </div>

                <div className="mt-6 flex w-full flex-col items-center justify-center">
                    {contactFile ? (
                        <img
                            width={80}
                            height={80}
                            className="h-14 w-14 rounded-full border border-violet-400 bg-slate-300 object-cover object-center md:h-20 md:w-20"
                            src={contactFile}
                            alt={contactName}
                        />
                    ) : (
                        <img
                            width={80}
                            height={80}
                            className="h-14 w-14 rounded-full border border-violet-400 object-cover object-center md:h-20 md:w-20"
                            src="../../public/avatar_default.png"
                            alt="Default avatar"
                        />
                    )}
                    <div className="pt-2 text-center">
                        <p className="font-bold">{contactName}</p>
                        <p className="text-xs text-gray-200">
                            {contactPhoneNumber}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex w-full justify-between">
                    <div className="flex flex-col">
                        <div className="rounded-full bg-white p-3 text-purple-800">
                            <Envelope width={28} height={28} className="" />
                        </div>
                        <p className="pt-2 text-center text-xs">Message</p>
                    </div>
                    <div>
                        <div className="rounded-full bg-white p-3 text-purple-800">
                            <Call width={28} height={28} className="" />
                        </div>
                        <p className="pt-2 text-center text-xs">Call</p>
                    </div>
                    <div>
                        <div className="rounded-full bg-white p-3 text-purple-800">
                            <Webcam width={28} height={28} className="" />
                        </div>
                        <p className="pt-2 text-center text-xs">Video</p>
                    </div>
                    <div>
                        <div className="rounded-full bg-white p-3 text-purple-800">
                            <Share width={28} height={28} className="" />
                        </div>
                        <p className="pt-2 text-center text-xs">Share</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-grow flex-col rounded-3xl bg-white px-6 py-4">
                <div className="border-b border-slate-200 py-2">
                    <p className="text-sm font-black">Mobile</p>
                    <p className="text-xs text-slate-400">
                        {contactPhoneNumber}
                    </p>
                </div>
                <div className="border-b border-slate-200 py-2">
                    <p className="text-sm font-black">Group</p>
                    <p className="text-xs text-slate-400">{contactGroup}</p>
                </div>
                <div className="border-b border-slate-200 py-2">
                    <p className="text-sm font-black">Link numbers</p>
                    <p className="text-xs text-slate-400">{contactGroup}</p>
                </div>
                <div className="border-b border-slate-200 py-2">
                    <p className="text-sm font-black">Add to favorites</p>
                </div>
                <div className="border-b border-slate-200 py-2">
                    <p className="text-sm font-black">Share my location</p>
                </div>
                <button
                    type="button"
                    className="flex items-center justify-between border-b border-slate-200 py-2"
                    onClick={showModal}
                >
                    <p className="text-sm font-black text-red-500">
                        Delete contact
                    </p>
                    <Trash width={18} height={18} className="text-red-500" />
                </button>
            </div>

            <dialog ref={dialog} className="delete-modal rounded-2xl">
                <div className="flex flex-col items-center justify-center p-10">
                    <p className="pb-4 text-3xl font-bold">Delete contact</p>
                    <p className="text-xl text-slate-600">
                        Are you sure you want to delete contact &quot;
                        {currentContact.contactName}&quot;?
                    </p>
                    <div className="flex w-full flex-col justify-between pt-5">
                        <button
                            onClick={handleClose}
                            type="button"
                            className="mt-4 flex items-center justify-center rounded-3xl border border-slate-200 px-4 py-2 transition-all hover:bg-slate-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteContact}
                            type="button"
                            className="mt-4 flex items-center justify-center rounded-3xl bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default PersonDetails;
