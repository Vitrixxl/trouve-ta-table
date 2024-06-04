import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";


export default function NavBar() {
    return (
        <Navbar isBordered>
            <NavbarBrand >

                <Link href="/" className="font-bold text-3xl text-inherit">VSX-Code</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Welcome on my NEXT / PRISMA / NEXT-UI Template
                    </Link>
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button>
                        <Link href="https://github.com/Vitrixxl/crud-nextjs" target="_blank" color="primary">Users</Link>
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}