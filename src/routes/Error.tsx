import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="flex h-full flex-col items-center justify-center px-4">
            <div className="h-fit w-full">
                <h1 className="my-2 text-3xl font-black text-gray-800">
                    Looks like you have found the doorway to the great nothing
                </h1>
                <p className="my-2 text-gray-800">
                    Sorry about that! Please visit our homepage to get where you
                    need to go.
                </p>
                <Link
                    to="/"
                    className="my-4 flex rounded bg-indigo-600 px-8 py-4 text-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 sm:w-full"
                >
                    Take me there!
                </Link>
            </div>

            <div className="mt-4 flex flex-col">
                <img
                    className="w-96 object-contain"
                    width="384"
                    height="384"
                    src="https://i.ibb.co/G9DC8S0/404-2.png"
                    alt="404"
                />
                <img
                    className="w-96 object-contain"
                    width="384"
                    height="384"
                    src="https://i.ibb.co/ck1SGFJ/Group.png"
                    alt="Cool ilustration for 404"
                />
            </div>
        </div>
    );
}

export default Error;
