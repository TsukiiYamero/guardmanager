import { DataTable } from "@/components/dataTable/dataTable"
import { TextInput } from "@/components/inputs/Text"
import { FormTableModal } from "@/components/modals/FormTableModal"
import { useConfirmDialog } from "@/customHooks/useConfirmDialog"
import { createWorkerValidation, updateWorkerValidation } from "@/helpers/Validations"
import { MainLayout } from "@/layouts/MainLayout"
import { addWorker, getWorkers, removeWorker, updateWorker } from "@/services/workers.service"
import { IGuard } from "@/types/guards.types"
import { IUsers } from "@/types/users.types"
import { useDisclosure } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"


export const Workers = () => {
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
            // setWorkers(prevState => prevState.filter(worker => worker !== item))
        }
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
                resolver={modalData ? updateWorkerValidation : createWorkerValidation}
                defaultValues={{
                    first_name: modalData?.first_name || "",
                    last_name: modalData?.last_name || "",
                    email: modalData?.email || "",
                    cellphone: modalData?.cellphone || "",
                    address: modalData?.address || "",
                    username: modalData?.username || "",
                    password: ""
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
                    <TextInput
                        name="username"
                        title="Nombre de usuario"
                    />
                    <TextInput
                        name="password"
                        title="Contraseña"
                    />
                </div>
            </FormTableModal>
        </MainLayout>
    )
}
