import { DataTable } from "@/components/dataTable/dataTable";
import { AutocompleteInput } from "@/components/inputs/Autocomplete";
import { CustomDateInput } from "@/components/inputs/Date";
import { FormTableModal } from "@/components/modals/FormTableModal";
import { MainLayout } from "@/layouts/MainLayout"
import { createSchedule } from '@/helpers/Validations';
import { useSchedules } from "@/customHooks/useSchedules";


export const Schedules = () => {
    const {
        schedulesItems,
        modalData,
        isOpen,
        dialog,
        onOpenChange,
        handleAdd,
        handleEdit,
        handleDelete,
        handleEditSubmit,
        handleAddSubmit,
        guardsAutocomplete,
        shiftsAutocomplete,
        locationsAutocomplete
    } = useSchedules()

    return (
        <MainLayout>
            {dialog}
            <DataTable
                items={schedulesItems}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleAdd={handleAdd}

                //Name of column to filter by the input value
                searchColumn={"name"}
            />
            {isOpen &&
                <FormTableModal
                    data={modalData}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    title={modalData ? "Editar horario" : "Agregar horario"}
                    onSubmit={modalData ? handleEditSubmit : handleAddSubmit}
                    resolver={createSchedule}
                >
                    <div className="flex flex-col gap-5">

                        <div className="form-table-item">
                            <AutocompleteInput
                                items={guardsAutocomplete}
                                name='name'
                                title='Nombre del guarda'
                                initialValue={modalData?.name}
                            />
                        </div>
                        <div className="form-table-item">
                            <CustomDateInput
                                title='Inicio de turno'
                                defaultDate={modalData?.start}
                                name='start'
                            />
                        </div>
                        <div className="form-table-item">
                            <CustomDateInput
                                title='Fin de turno'
                                defaultDate={modalData?.end}
                                name='end'
                            />
                        </div>
                        <div className="form-table-item">
                            <AutocompleteInput
                                items={shiftsAutocomplete}
                                name='shift'
                                title='Horario'
                                initialValue={modalData?.shift}
                            />
                        </div>
                        <div className="form-table-item">
                            <AutocompleteInput
                                items={locationsAutocomplete}
                                name='location'
                                title='Lugar'
                                initialValue={modalData?.location}
                            />
                        </div>
                    </div>
                </FormTableModal>
            }
        </MainLayout>
    )
}
