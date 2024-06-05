"use client";
import React, { Key, useEffect } from "react";
import FormModal from "./Modals/FormModal";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "./Icons/PlusIcon";
import { VerticalDotsIcon } from "./Icons/VerticalDotsIcon";
import { ChevronDownIcon } from "./Icons/ChevronDownIcon";
import { SearchIcon } from "./Icons/SearchIcon";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import { EyeIcon } from "./Icons/EyeIcon";
import { columns } from "./data";
import { capitalize } from "@/utils";
import { User as UserType } from "@prisma/client";
import DetailsUserModal from "./Modals/DetailsUserModal";
import DeleteModal from "./Modals/DeleteModal";
import EditUserModal from "./Modals/EditUserModal";
const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "create", "status", "actions"];

type User = UserType;

export default function App({ users }: { users: User[] }) {
    console.log(users)
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
    useEffect(() => {
        console.log(rowsPerPage)
    }, [rowsPerPage])
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>

                user.name && user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }


        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: User, b: User) => {
            const first = a[sortDescriptor.column as keyof User] as number | Date;
            const second = b[sortDescriptor.column as keyof User] as number | Date;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "name":
                return (
                    <User

                        description={user.email}
                        name={cellValue?.toString()}
                    >
                        {user.email}
                    </User>
                );
            case "create":
                console.log("hey")
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{user.createdAt.toDateString()}</p>

                    </div>
                );

            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <DetailsUserModal user={user} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditUserModal user={user} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                {/** @ts-ignore */}
                                <DeleteModal id={user.id} name={user.name} />
                            </span>
                        </Tooltip>
                    </div>

                )
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((key: number) => {

        setRowsPerPage(key);
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (

            <div className="flex flex-col gap-4">

                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full  sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">

                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection={false}
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"

                                onSelectionChange={setVisibleColumns}
                            >
                                {visibleColumns && columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <FormModal />

                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} users</span>
                    <Dropdown>
                        <DropdownTrigger className="hidden sm:flex">
                            <Button variant="ghost" endContent={<ChevronDownIcon />}>

                                Rows per page: <span>{rowsPerPage.toString()}</span>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            aria-label="Rows per page"
                            closeOnSelect={true}


                            onAction={(key: Key) => {

                                setRowsPerPage(Number(key))

                            }}
                        >
                            <DropdownItem key={"5"} className="capitalize" >
                                5
                            </DropdownItem>
                            <DropdownItem key={"10"} className="capitalize">
                                10
                            </DropdownItem>
                            <DropdownItem key={"20"} className="capitalize">
                                20
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                    {/* <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label> */}
                </div>
            </div >
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        users.length,
        rowsPerPage,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "center"}
                        allowsSorting={column.sortable}
                    >
                        <span className={column.uid === "actions" ? "text-center w-full block" : ""}>{column.name}</span>

                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {/** @ts-ignore */}
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
