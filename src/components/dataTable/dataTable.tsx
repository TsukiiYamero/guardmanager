import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useCallback, useEffect,  useState } from "react"
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { PaginationSection } from "./PaginationSection"
import { TopSection } from "./TopSection"

interface IHeaderColumns {
    name: string
    uid: string
    sortable: boolean
}

interface DataTableProps<T> {
    items: Array<T>
    handleAdd?: () => void
    handleEdit?: (item: T) => void
    handleDelete?: (item: T) => void
    searchColumn: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({ items, handleAdd, handleEdit, handleDelete, searchColumn }: DataTableProps<T>) {
    const [headerColumns, setHeaderColumns] = useState<Array<IHeaderColumns> | null>()
    const [paginatedItems, setPaginatedItems] = useState<T[]>([])
    const [filteredItems, setFilteredItems] = useState<T[]>([])
    const [filterValue, setFilterValue] = useState("")

    const renderCell = useCallback((item: T, columnKey: React.Key) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex gap-4 justify-center">
                        {handleEdit !== undefined 
                            && <Button onClick={() => handleEdit(item)} color="secondary">{<IconEdit />}</Button>}
                        {handleDelete !== undefined
                            && <Button onClick={() => handleDelete(item)} color="secondary">{<IconTrash />}</Button>}
                    </div>
                )
            default:
                return item[columnKey as number]
        }
    }, [handleDelete, handleEdit])

    const handlePagedItems = (currentItems: T[]) => {
        setPaginatedItems(currentItems)
    }

    const handleChangeFilterValue = (value: string) => {
        setFilterValue(value)
    }

    useEffect(() => {
        if(filterValue.length < 3){
            return setFilteredItems(items)
        }
        return setFilteredItems(items.filter(item => {
            return item[searchColumn].toLowerCase().includes(filterValue.toLocaleLowerCase())
        }))
    },[filterValue, items, searchColumn])

    useEffect(() => {
        const columns = (handleEdit !== undefined || handleDelete !== undefined) 
            ? [...Object.keys(items[0] || ""), "actions"] 
            : Object.keys(items[0] || "")

        setHeaderColumns(columns.map(column => ({
            name: column.toUpperCase(),
            uid: column,
            sortable: false
        })))
    }, [handleDelete, handleEdit, items])   

    return (
        <div className="mt-6">
            {headerColumns && headerColumns.length > 0 &&
                <Table
                    aria-label="Horarios de los trabajadores"
                    bottomContent={<PaginationSection items={filteredItems} setItems={handlePagedItems} />}
                    topContent={<TopSection setFilter={handleChangeFilterValue} handleAdd={handleAdd!} />}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                className={column.uid === "actions" ? "text-center" : "text-start"}
                                allowsSorting={column.sortable}
                            >{column.name}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={paginatedItems}
                    >
                        {(item) => (
                            <TableRow key={item?.id} className="hover:bg-gray-100">
                                {(columnKey) => (
                                    <TableCell>{renderCell(item, columnKey)}{/* {console.log("algo: ", item, columnKey)} */}</TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            }
        </div>
    )
}