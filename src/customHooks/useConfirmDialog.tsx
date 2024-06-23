import { ConfirmDialog } from "@/components/confirmDialog/ConfirmDialog"
import { useState } from "react"

export const useConfirmDialog = () => {
    const [dialog, setDialog] = useState<React.ReactNode | null>(null)

    const showDialog = ({ title, message }: { title: string, message: string}) => {
        return new Promise<boolean>((resolve) => {
            const handleAccept = () => {
                setDialog(null)
                resolve(true)
            }

            const handleReject = () => {
                setDialog(null)
                resolve(false)
            }
            
            
            setDialog(
                <ConfirmDialog 
                    title={title}
                    message={message}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )
        })
    }

    return { dialog, showDialog }
}