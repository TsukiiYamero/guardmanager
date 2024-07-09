import { useConfirmDialog } from "@/customHooks/useConfirmDialog"
import { addWorker, getWorkers, removeWorker, updateWorker } from "@/services/workers.service"
import { IGuard } from "@/types/guards.types"
import { IUsers } from "@/types/users.types"
import { useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"

export const useWorkers = () => {
    const [workers, setWorkers] = useState<(IGuard & IUsers)[]>([])
    const [modalData, setModalData] = useState<(IGuard & IUsers) | null>(null)
    const [reloadData, setReloadData] = useState(false)
    const [currentItemId, setCurrentItemId] = useState(0)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { dialog, showDialog } = useConfirmDialog()

    const handleEditSubmit: SubmitHandler<IGuard> = async (data) => {
        await updateWorker(data, currentItemId)

        setReloadData(!reloadData)
        onOpenChange()
    }
    const handleAddSubmit: SubmitHandler<IGuard> = async (data) => {
        await addWorker(data)

        setReloadData(!reloadData)
        onOpenChange()
    }
    const handleAddBtn = () => {
        setModalData(null)
        onOpen()
        console.log("Item para agregar");
    }
    const handleEditBtn = (item: IGuard & IUsers) => {
        setModalData(item)
        setCurrentItemId(item?.id || 0)
        onOpen()
    }
    const handleDeleteBtn = async(item: IGuard) => {
        const confirmDeletion = await showDialog({
            title: "Eliminar trabajador",
            message: "¿Está seguro de eliminar el trabajador?"
        })
        if(confirmDeletion){
            await removeWorker(item.id)
            setReloadData(!reloadData)
            console.log(item);
        }
    }

    useEffect(() => {
        getWorkers().then(data => setWorkers(data))
    }, [reloadData])

    return {
        workers,
        modalData,
        isOpen,
        dialog,
        onOpenChange,
        handleEditSubmit,
        handleAddSubmit,
        handleAddBtn,
        handleEditBtn,
        handleDeleteBtn
    }
}