import { Link } from "react-router-dom";
import Plus from "../assets/icons/Plus";
import Search from "../assets/icons/Search";
import { useAppSelector } from "../app/hooks";
import VerticalDots from "../assets/icons/VerticalDots";

function Agenda() {
    const contacts = useAppSelector((state) => state.contact);

    return (
        <div className="h-full rounded-3xl bg-white px-4 py-8 md:max-h-[50vh] md:px-6 md:pt-12">
            <div className="flex justify-end">
                <Link to="/person">
                    <Plus width={34} height={34} />
                </Link>
            </div>

            <div className="py-4">
                <h1 className="text-2xl font-bold">My contacts</h1>
                <p className="text-xs text-gray-300">
                    Friends <span>({contacts.length})</span>
                </p>
            </div>

            <div className="mb-6 w-full">
                <label
                    htmlFor="search"
                    className="relative w-full text-gray-300"
                >
                    <Search className="absolute left-3 top-0" />
                    <input
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-black placeholder:text-sm placeholder:text-gray-300"
                        type="text"
                        id="search"
                        placeholder="Search by name or number"
                    />
                </label>
            </div>

            <ul className="flex flex-col pb-12">
                {contacts.length > 0 &&
                    contacts.map(
                        ({
                            contactId,
                            contactName,
                            contactGroup,
                            contactPhoneNumber,
                            contactFile,
                        }) => (
                            <li
                                className="flex border-b border-gray-300 py-4"
                                key={`contact-${contactId}-${contactPhoneNumber}`}
                            >
                                <div className="relative">
                                    {contactFile ? (
                                        <img
                                            width={48}
                                            height={48}
                                            className="mr-4 h-12 w-12 rounded-full border border-violet-400 object-cover object-center md:h-14 md:w-14"
                                            src={contactFile}
                                            alt={contactName}
                                        />
                                    ) : (
                                        <img
                                            width={48}
                                            height={48}
                                            className="mr-4 h-12 w-12 rounded-full border border-violet-400 object-cover object-center md:h-14 md:w-14"
                                            src="../../public/avatar_default.png"
                                            alt="Default avatar"
                                        />
                                    )}

                                    <span className="absolute -bottom-1 -right-2 ml-2 rounded-xl border border-violet-600 bg-violet-300 px-2 text-xs font-bold">
                                        {contactGroup}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-bold">{contactName}</p>
                                    <p className="text-sm text-gray-300">
                                        {contactPhoneNumber}
                                    </p>
                                </div>

                                <div className="flex flex-grow items-start justify-end">
                                    <Link to={`/person/${contactId}`}>
                                        <VerticalDots
                                            height={32}
                                            width={32}
                                            className="text-gray-400"
                                        />
                                    </Link>
                                </div>
                            </li>
                        ),
                    )}
            </ul>
        </div>
    );
}

export default Agenda;
