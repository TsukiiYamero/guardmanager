import { CalendarDate, CalendarDateTime, ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date"
import { DateInput } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from "react-hook-form"
import { InputBaseForm } from "./InputBaseForm"

interface CustomDateInputProps {
    defaultDate?: string
    title: string
    name?: string
}

export const CustomDateInput = ({
    defaultDate,
    title,
    name
}: CustomDateInputProps) => {
    const [date, setDate] = useState(
        defaultDate
            ? parseAbsoluteToLocal(new Date(defaultDate).toISOString())
            : null
    )
    const [valid, isValid] = useState(true)

    const { control } = useFormContext()

    const handleChange = (value: ZonedDateTime | CalendarDate | CalendarDateTime, field: ControllerRenderProps<FieldValues, string>) => {
        field.onChange(value)
        setDate(value as ZonedDateTime)
    }

    useEffect(() => {
        if (!date || date.year < 2000)
            return isValid(false)
        return isValid(true)
        
    }, [date])

    return (
        <InputBaseForm name={name!} title={title}>
            <Controller
                name={name!}
                control={control}
                defaultValue={date}
                render={({ field }) => (
                    <>
                        <DateInput
                            variant="underlined"
                            granularity="second"
                            value={field.value}
                            isInvalid={!valid}
                            errorMessage="Fecha inválida"
                            label
                            onChange={(value) => handleChange(value, field)}
                        />

                    </>
                )}
            />
        </InputBaseForm>
    )
}