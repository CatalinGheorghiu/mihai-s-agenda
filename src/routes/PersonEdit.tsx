import { Link, useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import ArrowBack from "../assets/icons/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Error from "./Error";
import { updateContact } from "../features/contact/contactSlice";

type Inputs = {
    id: string | number;
    name: string;
    phoneNumber: string | number;
    group: string;
    file?: string;
};

function PersonEdit() {
    const { id } = useParams();
    const contacts = useAppSelector((state) => state.contact);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const currentContact = contacts.find(
        ({ contactId }) => +contactId === Number(id),
    );

    const [uploadedImage, setUploadedImage] = useState<string>();

    function handleUploadImage(event: SyntheticEvent) {
        const target = event.target as typeof event.target & {
            files: FileList;
        };
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            if (reader.result) {
                setUploadedImage(reader?.result?.toString());
            }
        });
        reader.readAsDataURL(target.files[0]);
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            name: currentContact?.contactName,
            phoneNumber: currentContact?.contactPhoneNumber,
            group: currentContact?.contactGroup,
        },
    });

    if (!currentContact) {
        return <Error />;
    }

    const onSubmit: SubmitHandler<Inputs> = (
        data,
        event?: BaseSyntheticEvent,
    ) => {
        event?.preventDefault();

        dispatch(
            updateContact({
                contactId: currentContact?.contactId,
                contactName: data.name,
                contactGroup: data.group,
                contactPhoneNumber: data.phoneNumber,
                contactFile:
                    data.file && data?.file?.length > 0
                        ? uploadedImage
                        : currentContact?.contactFile,
            }),
        );

        navigate(`/person/${currentContact?.contactId}`);
    };

    return (
        <div className="flex h-full flex-col rounded-3xl bg-white p-6 md:max-h-[50vh]">
            <div className="flex rounded-t-3xl">
                <Link
                    to={`/person/${currentContact?.contactId}`}
                    className="flex w-full items-center font-bold"
                >
                    <ArrowBack height={24} width={24} className="mr-3" /> Back
                </Link>
            </div>

            <h1 className="mb-8 mt-14 text-center text-3xl font-bold">
                Edit contact details for {currentContact?.contactName}
            </h1>

            <div className="flex justify-center">
                {currentContact.contactFile ? (
                    <img
                        width={48}
                        height={48}
                        className="mr-4 h-12 w-12 rounded-full border border-violet-400 object-cover object-center md:h-14 md:w-14"
                        src={currentContact?.contactFile}
                        alt={currentContact?.contactName}
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
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-4 flex flex-col">
                    <label
                        htmlFor="name"
                        className="relative w-full text-gray-300"
                    >
                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-black placeholder:text-sm placeholder:text-gray-300"
                            type="text"
                            id="name"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                    </label>
                    {errors.group && (
                        <span className="pl-2 pt-2 text-xs text-red-600">
                            This field is required
                        </span>
                    )}
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="phone-number"
                        className="relative w-full text-gray-300"
                    >
                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-black placeholder:text-sm placeholder:text-gray-300"
                            type="text"
                            id="phone-number"
                            placeholder="Phone number"
                            {...register("phoneNumber", { required: true })}
                        />
                    </label>
                    {errors.group && (
                        <span className="pl-2 pt-2 text-xs text-red-600">
                            This field is required
                        </span>
                    )}
                </div>

                <div className="my-4 flex flex-col">
                    <label
                        htmlFor="group"
                        className="relative w-full text-gray-300"
                    >
                        <input
                            className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-black placeholder:text-sm placeholder:text-gray-300"
                            type="text"
                            id="group"
                            placeholder="Group"
                            {...register("group", { required: true })}
                        />
                    </label>
                    {errors.group && (
                        <span className="pl-2 pt-2 text-xs text-red-600">
                            This field is required
                        </span>
                    )}
                </div>

                <div className="my-4 flex flex-col">
                    <label
                        htmlFor="file-input"
                        className="relative w-full cursor-pointer text-gray-300"
                    >
                        <input
                            className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-black placeholder:text-sm placeholder:text-gray-300"
                            id="file-input"
                            type="file"
                            accept="image/*"
                            {...register("file", { required: false })}
                            onInput={handleUploadImage}
                        />
                    </label>
                </div>

                <button
                    className="w-full rounded-2xl border border-indigo-400 bg-indigo-400 px-4 py-2 text-sm font-black text-white transition-all hover:border-indigo-950 hover:bg-indigo-600"
                    type="submit"
                >
                    Edit contact
                </button>
            </form>
        </div>
    );
}

export default PersonEdit;
