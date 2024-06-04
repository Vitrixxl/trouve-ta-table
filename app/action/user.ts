"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function insertUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const user = {
        name,
        email
    }


    if (!prisma) return;
    try {
        const test = await prisma.user.create({
            data: user
        })
        console.log("test", test)
    } catch (error: any) {
        console.log("error", error.message)
        return { error: error.message }
    } finally {
        revalidatePath("/users/add")
    }
}

export async function deleteUser(id: string) {
    if (!prisma) return;
    try {
        await prisma.user.delete({
            where: {
                id
            }
        })
    } catch (error: any) {
        return { error: error.message }
    } finally {
        revalidatePath("/login")
    }
}

export async function updateUser(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const user = {
        name,
        email
    }
    if (!prisma) return;
    try {
        await prisma.user.update({
            where: {
                id
            },
            data: user
        })
    } catch (error: any) {
        return { error: error.message }
    } finally {
        revalidatePath("/login")
    }
}

export async function getUser(id: string) {
    if (!prisma) return;
    try {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        })
    } catch (error: any) {
        return { error: error.message }
    }
}