import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from '../Icons/MailIcon';
// import { LockIcon } from './LockIcon.jsx';
import { updateUser } from "@/app/action/user";
import { User } from "@prisma/client";
import { EditIcon } from "../Icons/EditIcon";
export default function EditUserModal({ user }: { user: User }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    return (
        <>
            <Button onPress={onOpen} className="p-0 m-0  min-w-0 bg-transparent border-none" >
                <span className="text-lg text-primary cursor-pointer active:opacity-50">
                    <EditIcon />
                </span>
            </Button>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();

                                    const formData = new FormData(e.target as HTMLFormElement)
                                    updateUser(user.id, formData)
                                    onClose()

                                }} className="flex flex-col gap-1">

                                    <Input
                                        endContent={
                                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Name"
                                        name="name"

                                        type="Text"
                                        value={name ? name : ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        variant="bordered"
                                    />
                                    <Input

                                        name="email"
                                        endContent={
                                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Email"
                                        type="Email"
                                        value={email ? email : ""}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}

                                        variant="bordered"
                                    />

                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose} onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}>
                                            Close
                                        </Button>
                                        <Button color="primary" type="submit" >
                                            Add
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
