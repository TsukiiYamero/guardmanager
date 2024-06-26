import './formTableModal.css'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { DefaultValues, FormProvider, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FormTableModalProps<T extends Record<string, any>> {
    data?: T | null
    isOpen: boolean
    onOpenChange: () => void
    title: string
    onSubmit?: (data: T) => Promise<unknown> | unknown
    resolver?: yup.ObjectSchema<Partial<T>>
    defaultValues?: DefaultValues<T>
    children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FormTableModal<T extends Record<string, any>>({
    data,
    isOpen,
    onOpenChange,
    title,
    onSubmit,
    resolver,
    defaultValues,
    children
}: FormTableModalProps<T>) {
    const [loadingEdit, isLoadingEdit] = useState(false)

    const handleSubmit: SubmitHandler<T> = async (data) => {
        isLoadingEdit(true)
        await onSubmit!(data)
        isLoadingEdit(false)
    }

    const defaultSchema = yup.object().shape({}) as yup.ObjectSchema<Partial<T>>
    const methods = useForm<T>({
        resolver: yupResolver(resolver || defaultSchema) as unknown as Resolver<T>,
        defaultValues: defaultValues
    })

    const { reset } = methods

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

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
                                {children}
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
                                    isLoading={loadingEdit}
                                >
                                    {data ? "Editar" : "Añadir"}
                                </Button>
                            </ModalFooter>
                        </form>
                    </FormProvider>
                )}
            </ModalContent>
        </Modal>
    )
}