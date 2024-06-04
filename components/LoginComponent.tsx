
"use client";
import { User } from "@prisma/client";
import { useOptimistic } from "react";
import crypto from "crypto";
import { insertUser } from "@/app/action/user";
import UserList from "./UserList";
import { ToastContainer, toast } from 'react-toastify';
import FormUser from "./FormUser";
import 'react-toastify/dist/ReactToastify.css';


type UserListProps = {
    users: User[];
}

export default function AddComponents({ users }: UserListProps) {
    const [optimisticUsers, setOptimisticUsers] = useOptimistic(users,
        (state, newUsers: User) => {
            return [...state, newUsers];
        }
    );
    const handleSubmit = async (FormData: FormData) => {
        setOptimisticUsers({
            id: crypto.randomBytes(16).toString("hex"),
            name: FormData.get("name") as string,
            email: FormData.get("email") as string
        } as User)

        const user = await insertUser(FormData);
        if (user?.error) {
            toast.error(user.error);

        }

    }



    return (
        <div className="flex  gap-4 h-full items-center justify-center">
            <div className="h-fit flex gap-52">

                <div className="h-full ">

                    <FormUser action={async FormData => handleSubmit(FormData)} />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl italic">users</h1>
                    <div className="flex flex-col gap-2">

                        <UserList users={optimisticUsers} />

                    </div>

                </div>
            </div>
            <ToastContainer />
        </div >
    );
}