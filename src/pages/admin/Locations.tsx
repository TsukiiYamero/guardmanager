import { MainLayout } from "@/layouts/MainLayout"
import { DataTable } from "@/components/dataTable/dataTable"
import { TextInput } from "@/components/inputs/Text"
import { FormTableModal } from "@/components/modals/FormTableModal"
import { useLocations } from "@/customHooks/useLocations"
import { createLocationValidation, updateLocationValidation } from "@/helpers/Validations"

export const Locations = () => {
    const {
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
    } = useLocations()

    return (
        <MainLayout>
            {dialog}
            <DataTable
                items={locations}
                searchColumn="location_name"
                handleAdd={handleAddBtn}
                handleEdit={handleEditBtn}
                handleDelete={handleDeleteBtn}
            />
            <FormTableModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                data={modalData}
                title={modalData ? "Editar ubicación" : "Agregar ubicación"}
                onSubmit={modalData ? handleEditSubmit : handleAddSubmit}
                resolver={modalData ? updateLocationValidation : createLocationValidation}
                defaultValues={{
                    location_name: modalData?.location_name || "",
                    address: modalData?.address || "",
                    city: modalData?.city || "",
                    cellphone: modalData?.cellphone || "",
                }}
            >
                <div className="flex flex-col gap-3">
                    <TextInput
                        name="location_name"
                        title="Nombre de la ubicación"
                    />
                    <TextInput
                        name="address"
                        title="Dirección"
                    />
                    <TextInput
                        name="city"
                        title="Ciudad"
                    />
                    <TextInput
                        name="cellphone"
                        title="Número de celular"
                    />
                </div>
            </FormTableModal>
        </MainLayout>
    )
}
