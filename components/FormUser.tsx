"use client";
import { Input, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";


type FormUserProps = {
    action: (formData: FormData) => void;
}

const FormUser: React.FC<FormUserProps> = ({ action }) => {
    const [validEmail, setValidEmail] = useState<null | boolean>(null);
    const [username, setUsername] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);
    const handleMailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        //pritier-ignore
        if (e.target.value.match(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setValidEmail(true);
            console.log(!(username === "" && validEmail))
            console.log(username, validEmail)
            setDisabled(!(username != "" && validEmail))
        } else {
            setValidEmail(false);

            setDisabled(!(username === "" && validEmail))
        }
    }
    const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setDisabled(!(username === "" && validEmail))
    }
    useEffect(() => {
        console.log(disabled)
    }, [disabled])



    return (
        <div className="flex flex-col gap-10 w-full">
            <h1 className="text-white text-2xl font-semibold">Welcome ! Start By adding a new User</h1>
            <h2 className="text-white text-lg">Please fill the form below</h2>

            <form action={action} className="space-y-6 w-max">
                <div className="flex flex-col  gap-2">

                    <Input type="text" label="Name" name="name" size="sm" color="primary" className="min-w-64" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleUsernameInput(e)} />
                    <Input type="email" label="Email" name="email" size="sm" color={validEmail == null ? "primary" : validEmail ? "primary" : "danger"} className="min-w-64" onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleMailInput(e)} />
                </div>

                <Button type="submit" size="sm" variant={disabled ? "ghost" : "solid"} color="primary" disabled={disabled} isDisabled={disabled}>Submit</Button>
            </form>
        </div>
    );
}

export default FormUser;