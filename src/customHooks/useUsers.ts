import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IUsers } from '@/types/users.types';
import { getUserProfile, updateUserProfile } from '@/services/user.service';
import { getToken, getUser } from '@/utils/utilities';

export const useUserProfile = () => {
    const [profile, setProfile] = useState<IUsers | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { control, handleSubmit, setValue } = useForm<IUsers>({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    useEffect(() => {
        const token = getToken();
        const user = getUser();
        if (!token || !user?.id) return;

        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const userProfile = await getUserProfile(token, user.id);
                setProfile(userProfile);
                
                setValue('username', userProfile.username);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Ocurrió un error desconocido');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [setValue]);

    const onSubmit: SubmitHandler<IUsers> = async (data) => {
        const token = getToken();
        const user = getUser();

        if (!token || !user?.id) return;
        setLoading(true);
        try {
            await updateUserProfile(token, user.id, data);
            setSuccessMessage('Tu usuario y contraseña han sido cambiados exitosamente');
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Ocurrió un error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        error,
        control,
        successMessage,
        handleSubmit,
        onSubmit
    };
};
