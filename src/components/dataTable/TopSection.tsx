import { Button, Input } from "@nextui-org/react"
import { IconPlus, IconSearch } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface TopSectionProps { 
    setFilter: (value: string) => void 
    handleAdd: () => void
}

export const TopSection = ({ setFilter, handleAdd }: TopSectionProps) => {
    const [search, setSearch] = useState("")

    useEffect(() => {
        setFilter(search)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <div className="flex justify-around flex-wrap gap-y-4">
            <Input 
                placeholder="Search..." 
                className="max-w-[700px] min-w-fit"
                startContent={<IconSearch />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {handleAdd && <Button 
                className="right-0"
                color="secondary"
                onClick={handleAdd}
            >
                Add New 
                <IconPlus />
            </Button>}
        </div>
    )
}