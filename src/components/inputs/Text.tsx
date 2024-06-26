import { Input } from "@nextui-org/react"
import { InputBaseForm } from "./InputBaseForm"
import { Controller, useFormContext } from "react-hook-form"

interface TextInputProps {
    name: string
    title: string
    type?: string
}

//PARA OTORGAR VALOR INICIAL, HAY QUE PASARLE LOS ATRIBUTOS INICIALES AL FORMULARIO DIRECTAMENTE (Ex: componente workers en pages)
export const TextInput = ({
    name,
    title,
    type,
}: TextInputProps) => {
    const { control } = useFormContext()

    return (
        <InputBaseForm
            name={name}
            title={title}
        >
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <Input
                            variant="underlined"
                            type={type || "text"}

                            { ...field}
                        />
                    </>
                )}
            />

        </InputBaseForm>
    )
}