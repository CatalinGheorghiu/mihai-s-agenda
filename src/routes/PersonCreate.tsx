import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { BaseSyntheticEvent, SyntheticEvent, useState } from "react";
import ArrowBack from "../assets/icons/ArrowBack";
import { useAppDispatch } from "../app/hooks";
import { createContact } from "../features/contact/contactSlice";

type Inputs = {
    id: string | number;
    name: string;
    phoneNumber: string | number;
    group: string;
    file?: string;
};

function PersonCreate() {
    const [uploadedImage, setUploadedImage] = useState<string>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (
        data,
        event?: BaseSyntheticEvent,
    ) => {
        event?.preventDefault();

        dispatch(
            createContact({
                contactId: Date.now(),
                contactName: data.name,
                contactGroup: data.group,
                contactPhoneNumber: data.phoneNumber,
                contactFile: uploadedImage,
            }),
        );

        navigate("/");
    };

    return (
        <div className="flex h-full flex-col rounded-3xl bg-white  px-6 md:max-h-[50vh]">
            <Link to="/" className="flex w-full items-center pt-6 font-bold">
                <ArrowBack height={24} width={24} className="mr-3" /> Agenda
            </Link>

            <h1 className="mb-8 mt-14 text-center text-3xl font-bold">
                Create a new contact
            </h1>

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
                    Create contact
                </button>
            </form>
        </div>
    );
}

export default PersonCreate;
