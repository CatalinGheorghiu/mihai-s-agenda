import { Link, useParams } from "react-router-dom";
import ArrowBack from "../assets/icons/ArrowBack";

function PersonEdit() {
    const { id } = useParams();

    return (
        <div className="flex h-full flex-col rounded-3xl bg-white  px-6 md:max-h-[50vh]">
            <div className="flex  min-h-[15rem] rounded-t-3xl px-6 py-8 md:pt-12">
                <Link
                    to="/"
                    className="flex w-full items-center pt-6 font-bold"
                >
                    <ArrowBack height={24} width={24} className="mr-3" /> Agenda
                </Link>

                <Link
                    to={`/person/edit/${id}`}
                    className="flex w-full items-center justify-end font-bold"
                >
                    Edit
                </Link>
            </div>

            <div className="flex flex-grow rounded-3xl bg-sky-500 px-6 py-8 md:pt-12">
                <h1>This is the contact page for person {id}</h1>
            </div>
        </div>
    );
}

export default PersonEdit;
