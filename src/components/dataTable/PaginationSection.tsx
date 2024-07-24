/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination } from "@nextui-org/react"
import { useEffect, useState } from "react"

interface PaginationSectionProps { 
    setItems: (items: any[]) => void 
    items: any[]
}

export const PaginationSection = ({ setItems, items }: PaginationSectionProps) => {
    const [page, setPage] = useState(1)

    //ITEMS PER PAGE
    const rowsPerPage = 10
    const pages = Math.ceil(items.length / rowsPerPage)

    useEffect(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        console.log(page);

        setItems(items.slice(start, end))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, page])

    return (
        <div className="flex justify-center">
            <Pagination 
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages > 0 ? pages : 1}
                onChange={(page) => setPage(page)}
            />
        </div>
    )
}