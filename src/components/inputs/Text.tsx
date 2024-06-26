import { Input } from "@nextui-org/react"
import { InputBaseForm } from "./InputBaseForm"
import { useFormContext } from "react-hook-form"

interface TextInputProps {
    name: string
    title: string
    type?: string
    initialValue?: string
}

export const TextInput = ({ 
    name, 
    title, 
    type,
    initialValue
}: TextInputProps) => {
    // const [value, setValue] = useState()
    const { register } = useFormContext()

    return (
        <InputBaseForm
            name={name}
            title={title}
        >
            <Input
                type={type || "text"}
                label
                defaultValue={initialValue}
                className="h-10"

                {...register(name)}
            >

            </Input>
        </InputBaseForm>
    )
}