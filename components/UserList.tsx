
import { User } from "@prisma/client";

type UserListProps = {
    users: User[];
}

export default function UserList({ users }: UserListProps) {


    return (
        <div>
            <h1>Users</h1>
            {users.map((user: User) => (

                <h1 key={user.id}>{user.name}</h1>

            ))}
        </div>
    );
}

