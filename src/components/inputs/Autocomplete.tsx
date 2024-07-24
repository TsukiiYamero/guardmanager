import { Autocomplete, AutocompleteItem } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"
import { InputBaseForm } from "./InputBaseForm"

interface AutocompleteInputProps<T> {
    items: Array<T>
    initialValue?: string
    title: string
    name?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AutocompleteInput<T extends Record<string, any>>({
    items,
    initialValue,
    title,
    name,
}: AutocompleteInputProps<T>) {
    const { register } = useFormContext()

    return (
        <InputBaseForm name={name!} title={title}>
            <Autocomplete
                variant="underlined"
                defaultInputValue={initialValue}
                defaultItems={items}
                className='h-10'
                label

                {...register(name!)}
            >
                {(item) => (
                    <AutocompleteItem key={item.id}>
                        {item.name}
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </InputBaseForm>
    )
}