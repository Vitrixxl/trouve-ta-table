
import prisma from "../../../lib/prisma";
import { Input, Button } from "@nextui-org/react";
import AddComponents from "@/components/LoginComponent";
export default async function AddPage() {


    const userList = await prisma?.user.findMany()
    if (!userList) return null;
    return (
        <div className=" h-full flex-grow flex items-center justify-center">
            <AddComponents users={userList} />

        </div>
    );
}