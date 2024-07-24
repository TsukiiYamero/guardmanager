import { useConfirmDialog } from "@/customHooks/useConfirmDialog"
import { addLocation, getLocations, removeLocation, updateLocation } from "@/services/location.service"
import { ILocations } from "@/types/locations.types"
import { useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"

export const useLocations = () => {
    const [locations, setLocations] = useState<ILocations[]>([])
    const [modalData, setModalData] = useState<ILocations | null>(null)
    const [reloadData, setReloadData] = useState(false)
    const [currentItemId, setCurrentItemId] = useState(0)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { dialog, showDialog } = useConfirmDialog()

    const handleEditSubmit: SubmitHandler<ILocations> = async (data) => {
        await updateLocation(data, currentItemId)
        setReloadData(!reloadData)
        onOpenChange()
    }

    const handleAddSubmit: SubmitHandler<ILocations> = async (data) => {
        await addLocation(data)
        setReloadData(!reloadData)
        onOpenChange()
    }

    const handleAddBtn = () => {
        setModalData(null)
        onOpen()
    }

    const handleEditBtn = (item: ILocations) => {
        setModalData(item)
        setCurrentItemId(item?.id || 0)
        onOpen()
    }

    const handleDeleteBtn = async(item: ILocations) => {
        const confirmDeletion = await showDialog({
            title: "Eliminar ubicación",
            message: "¿Está seguro de eliminar la ubicación?"
        })
        if(confirmDeletion){
            await removeLocation(item.id)
            setReloadData(!reloadData)
        }
    }

    useEffect(() => {
        getLocations().then(data => setLocations(data))
    }, [reloadData])

    return {
        locations,
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
