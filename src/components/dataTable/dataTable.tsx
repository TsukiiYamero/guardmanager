import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { useCallback, useEffect, useState } from "react"
import { IconEdit, IconTrash } from '@tabler/icons-react'

interface IHeaderColumns {
    name: string
    uid: string
    sortable: boolean
}

interface DataTableProps<T> {
    items: Array<T>
    handleEdit?: (item: T) => void
    handleDelete?: (item: T) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({ items, handleEdit, handleDelete }: DataTableProps<T>) {
    const [headerColumns, setHeaderColumns] = useState<Array<IHeaderColumns> | null>()

    // const handleButtonEdit = (item: any) => {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderCell = useCallback((item: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "actions":
                return (
                    <div className="flex gap-4">
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
                // bottomContent={/* componente de paginación */}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                            >{column.name}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody
                        items={items}
                    >
                        {(item) => (
                            <TableRow key={item?.id}>
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