import { IScheduleItem } from "@/types/schedules.types";
import { parseAbsoluteToLocal } from "@internationalized/date";
import { Autocomplete, AutocompleteItem, Button, DateInput, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useId, useState } from "react";
import { guardsData, locationData } from "@/mocks/schedules.json"
import { IGuard } from "@/types/guards.types";
import { ILocations } from "@/types/locations.types";
import { formatInternationalizedDateToSQLDate } from "@/utils/utilities";

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
    const scheduleName = useId()
    const scheduleStart = useId()
    const scheduleEnd = useId()
    const scheduleLocation = useId()

    const [startDate, setStartDate] = useState(
        parseAbsoluteToLocal(data?.start
            ? new Date(data?.start).toISOString()
            : new Date().toISOString())
    )
    const [endDate, setEndDate] = useState(
        parseAbsoluteToLocal(data?.end
            ? new Date(data?.end).toISOString()
            : new Date().toISOString())
    )
    const [guards, setGuards] = useState<IGuard[]>([])
    const [locations, setLocations] = useState<ILocations[]>([])

    useEffect(() => {
        setGuards(guardsData)
        setLocations(locationData)
    }, [])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const guardName = event.currentTarget.guardName.value

        let endDate = event.currentTarget.endDate.value
        endDate = formatInternationalizedDateToSQLDate(endDate)

        let startDate = event.currentTarget.startDate.value
        startDate = formatInternationalizedDateToSQLDate(startDate)

        const location = event.currentTarget.location.value
        
        console.log("guardName: ", guardName);
        console.log("startDate: ", startDate);
        console.log("endDate: ", endDate);
        console.log("location: ", location);
    }

    // console.log(guards);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
                {(onclose) => (
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <div className="">
                                    <label htmlFor={scheduleName}>Nombre del guarda</label>
                                    <Autocomplete
                                        variant="underlined"
                                        id={scheduleName}
                                        placeholder={data?.name}
                                        defaultItems={guards}
                                        name="guardName"
                                        label
                                    >
                                        {(guard) => (
                                            <AutocompleteItem key={guard.id}>
                                                {guard.full_name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                </div>
                                <div className="">
                                    <label htmlFor={scheduleStart}>Inicio de turno</label>
                                    <DateInput
                                        id={scheduleStart}
                                        name="startDate"
                                        variant="underlined"
                                        granularity="second"
                                        onChange={setStartDate}
                                        value={startDate}
                                        label
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor={scheduleEnd}>Fin de turno</label>
                                    <DateInput
                                        id={scheduleEnd}
                                        name="endDate"
                                        variant="underlined"
                                        granularity="second"
                                        onChange={setEndDate}
                                        value={endDate}
                                        label
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor={scheduleLocation}>Lugar</label>
                                    <Autocomplete
                                        variant="underlined"
                                        id={scheduleLocation}
                                        placeholder={data?.location}
                                        defaultItems={locations}
                                        name="location"
                                        label
                                    >
                                        {(location) => (
                                            <AutocompleteItem key={location.id}>
                                                {location.location_name}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
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
                )}
            </ModalContent>
        </Modal>
    )
}