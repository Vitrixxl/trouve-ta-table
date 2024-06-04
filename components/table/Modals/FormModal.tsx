import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from '../Icons/MailIcon';
// import { LockIcon } from './LockIcon.jsx';
import { insertUser } from "@/app/action/user";
export default function FormModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary">Add user</Button>
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
                                    insertUser(formData)
                                    onClose()

                                }} className="flex flex-col gap-1">

                                    <Input
                                        endContent={
                                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Name"
                                        name="name"

                                        type="Text"

                                        variant="bordered"
                                    />
                                    <Input

                                        name="email"
                                        endContent={
                                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        label="Email"
                                        type="Email"

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
