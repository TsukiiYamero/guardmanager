import { DataTable } from "@/components/dataTable/dataTable"
import { TextInput } from "@/components/inputs/Text"
import { FormTableModal } from "@/components/modals/FormTableModal"
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
    const handleDeleteBtn = () => {
        console.log("Item para eliminar");
    }

    useEffect(() => {
        getWorkers().then(data => setWorkers(data))
    }, [reloadData])

    // console.log("modalData: ", modalData);
    

    return (
        <MainLayout>
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
            >
                <div className="flex flex-col gap-3">
                    <TextInput 
                        name="first_name"
                        title="Nombre"
                        initialValue={modalData?.first_name || ""}
                    />
                    <TextInput 
                        name="last_name"
                        title="Apellido"
                        initialValue={modalData?.last_name || ""}
                    />
                    <TextInput 
                        name="email"
                        title="Correo"
                        initialValue={modalData?.email || ""}
                        type="email"
                    />
                    <TextInput 
                        name="cellphone"
                        title="Número de celular"
                        initialValue={modalData?.cellphone || ""}
                        // type="number"
                    />
                    <TextInput 
                        name="address"
                        title="Dirección"
                        initialValue={modalData?.address || ""}
                    />
                </div>
            </FormTableModal>
        </MainLayout>
    )
}
