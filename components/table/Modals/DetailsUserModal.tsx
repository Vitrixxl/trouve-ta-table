import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { EyeIcon } from "../Icons/EyeIcon";
import { User } from "@prisma/client"

export default function DeleteModal({ user }: { user: User }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} className="p-0 m-0  min-w-0 bg-transparent border-none" >
                <span className="text-lg text-primary cursor-pointer active:opacity-50">
                    <EyeIcon />
                </span>
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{user.name}'s account</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">Name:</span>
                                        <span>{user.name}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold">Email:</span>
                                        <span>{user.email}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Created at:</span>
                                        <span>{user.createdAt.toDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="font-bold">Updated at:</span>
                                        <span>{user.updatedAt.toDateString()}</span>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
