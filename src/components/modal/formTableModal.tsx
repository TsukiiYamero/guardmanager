import './formTableModal.css'
import { IScheduleItem } from "@/types/schedules.types";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { IGuard } from "@/types/guards.types";
import { ILocations } from "@/types/locations.types";
import { formatInternationalizedDateToSQLDate } from "@/utils/utilities";
import { getGuardsData, getLocationsData } from "@/services/schedule.service";
import { AutocompleteInput } from '../inputs/Autocomplete';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CustomDateInput } from '../inputs/Date';
import { yupResolver } from '@hookform/resolvers/yup';
import { createSchedule } from '@/helpers/schedulesValidation';


interface FormTableModalProps {
    data?: IScheduleItem
    isOpen: boolean
    onOpenChange: () => void
    title: string
}

export function FormTableModal({
    data,
    isOpen,
    onOpenChange,
    title
}: FormTableModalProps) {
    const [guards, setGuards] = useState<IGuard[]>([])
    const [locations, setLocations] = useState<ILocations[]>([])

    useEffect(() => {
        getGuardsData().then(data => setGuards(data))
        getLocationsData().then(data => setLocations(data))
    }, [])

    const guardsAutocomplete = useMemo(() => guards.map(guard => ({
        id: guard.id,
        name: guard.full_name
    })), [guards])

    const locationsAutocomplete = useMemo(() => locations.map(location => ({
        id: location.id,
        name: location.location_name
    })), [locations])


    const handleSubmit: SubmitHandler<IScheduleItem> = (data) => {

        const guardName = data.name

        let endDate = data.end
        if(endDate)
            endDate = formatInternationalizedDateToSQLDate(endDate)!

        let startDate = data.start
        if(startDate)
            startDate = formatInternationalizedDateToSQLDate(startDate)!

        const location = data.location

        console.log("guardName: ", guardName);
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        console.log("location: ", location);
    }

    const methods = useForm<IScheduleItem>({
        resolver: yupResolver(createSchedule)
    })

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onclose) => (
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(handleSubmit)} className='text-secondary'>
                            <ModalHeader>{title}</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-8">
                                    <div className="form-table-item">
                                        <AutocompleteInput
                                            items={guardsAutocomplete}
                                            name='name'
                                            title='Nombre del guarda'
                                            initialValue={data?.name}
                                        />
                                    </div>
                                    <div className="form-table-item">
                                        <CustomDateInput 
                                            title='Inicio de turno'
                                            defaultDate={data?.start}
                                            name='start'
                                        />
                                    </div>
                                    <div className="form-table-item">
                                        <CustomDateInput 
                                            title='Fin de turno'
                                            defaultDate={data?.end}
                                            name='end'
                                        />
                                    </div>
                                    <div className="form-table-item">
                                        <AutocompleteInput
                                            items={locationsAutocomplete}
                                            name='location'
                                            title='Lugar'
                                            initialValue={data?.location}
                                        />
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="default"
                                    onPress={onclose}
                                    type="button"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    color="secondary"
                                    type="submit"
                                /* isLoading={true} */
                                >
                                    Editar
                                </Button>
                            </ModalFooter>
                        </form>
                    </FormProvider>
                )}
            </ModalContent>
        </Modal>
    )
}