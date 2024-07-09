import { DataTable } from "@/components/dataTable/dataTable"
import { TextInput } from "@/components/inputs/Text"
import { FormTableModal } from "@/components/modals/FormTableModal"
import { useWorkers } from "@/customHooks/useWorkers"
import { createWorkerValidation, updateWorkerValidation } from "@/helpers/Validations"
import { MainLayout } from "@/layouts/MainLayout"


export const Workers = () => {
    const {
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
    } = useWorkers()

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
