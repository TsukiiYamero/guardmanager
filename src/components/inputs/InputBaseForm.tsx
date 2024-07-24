import { useFormContext } from "react-hook-form"

interface InputBaseFormProps {
    children: React.ReactNode
    title: string
    name: string
}

export const InputBaseForm = ({ children, name, title }: InputBaseFormProps) => {
    const { formState } = useFormContext()

    const error = formState.errors[name!]

    return (
        <>
            <label className="text-[.8rem] font-semibold">{title}</label>
            {children}
            <div>
                <span className="text-red-600 text-sm font-semibold">{error?.message?.toString()}</span>
            </div>
        </>
    )
}