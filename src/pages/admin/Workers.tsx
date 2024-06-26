import { DataTable } from "@/components/dataTable/dataTable"
import { TextInput } from "@/components/inputs/Text"
import { FormTableModal } from "@/components/modals/FormTableModal"
import { useConfirmDialog } from "@/customHooks/useConfirmDialog"
import { createWorker } from "@/helpers/Validations"
import { MainLayout } from "@/layouts/MainLayout"
import { addWorker, getWorkers, updateWorker } from "@/services/workers.service"
import { IGuard } from "@/types/guards.types"
import { useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"


export const Workers = () => {
    const [workers, setWorkers] = useState<IGuard[]>([])
    const [modalData, setModalData] = useState<IGuard | null>(null)
    const [reloadData, setReloadData] = useState(false)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { dialog, showDialog } = useConfirmDialog()

    const handleEditSubmit: SubmitHandler<IGuard> = async (data) => {
        await updateWorker(data)

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
    const handleEditBtn = (item: IGuard) => {
        setModalData(item)
        onOpen()
        console.log(item);
    }
    const handleDeleteBtn = async(item: IGuard) => {
        const confirmDeletion = await showDialog({
            title: "Eliminar trabajador",
            message: "¿Está seguro de eliminar el trabajador?"
        })
        if(confirmDeletion)
            setWorkers(prevState => prevState.filter(worker => worker !== item))
    }

    useEffect(() => {
        getWorkers().then(data => setWorkers(data))
    }, [reloadData])

    // console.log("modalData: ", modalData);


    return (
        <MainLayout>
            {dialog}
            <DataTable
                items={workers}
                searchColumn="full_name"
                handleAdd={handleAddBtn}
                handleEdit={handleEditBtn}
                handleDelete={handleDeleteBtn}
            />
            <FormTableModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                data={modalData}
                title={modalData ? "Editar horario" : "Agregar horario"}
                onSubmit={modalData ? handleEditSubmit : handleAddSubmit}
                resolver={createWorker}
                defaultValues={{
                    first_name: modalData?.first_name || "",
                    last_name: modalData?.last_name || "",
                    email: modalData?.email || "",
                    cellphone: modalData?.cellphone || "",
                    address: modalData?.address || ""
                }}
            >
                <div className="flex flex-col gap-3">
                    <TextInput
                        name="first_name"
                        title="Nombre"
                    />
                    <TextInput
                        name="last_name"
                        title="Apellido"
                    />
                    <TextInput
                        name="email"
                        title="Correo"
                        type="email"
                    />
                    <TextInput
                        name="cellphone"
                        title="Número de celular"
                    // type="number"
                    />
                    <TextInput
                        name="address"
                        title="Dirección"
                    />
                </div>
            </FormTableModal>
        </MainLayout>
    )
}
