import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"

interface ConfirmDialogProps {
    title: string
    message: string
    onAccept: () => void
    onReject: () => void
    isVisible?: boolean
}

export const ConfirmDialog = ({ title, message, onAccept, onReject, isVisible=true }: ConfirmDialogProps) => {
    const { /* isOpen, onOpen, onClose, */ onOpenChange } = useDisclosure()

    // useEffect(() => {
    //     if(isVisible) 
    //         onOpen()
    //     else
    //         onClose()
    // }, [isVisible])

    const handleAccept = (onClose: () => void) => {
        onAccept()
        onClose()
    }

    const handleReject = (onClose: () => void) => {
        onReject()
        onClose()
    }

    return (
        <Modal isOpen={isVisible} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>{message}</ModalBody>
                        <ModalFooter>
                            <Button onPress={() => handleReject(onClose)}>Cancelar</Button>
                            <Button color="secondary" onPress={() => handleAccept(onClose)}>Aceptar</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}