import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import React from "react";
import BetterTable from "@/components/table/BetterTable";

export default async function UserListPage() {
    const users = await prisma?.user.findMany()
    if (!users) return null;
    console.log(users)
    return (
        <div className="h-full w-full flex items-center justify-center">
            <div className="w-fit ">

                <BetterTable users={users} />
            </div>

        </div>
    );
}