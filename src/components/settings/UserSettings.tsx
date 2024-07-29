import { Controller} from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
import { useUserProfile } from '@/customHooks/useUsers';
import '@/components/settings/UserSettings.css';


export const UserSettings = () => {
    const { profile, loading, error, control, successMessage, handleSubmit, onSubmit } = useUserProfile();

    return (
        <div className="container-settings-profile">
            <h2 className='text-[length:1.25rem] mb-7'>Settings</h2>
            {loading ? (
                <p>Cargando perfil...</p>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-xl w-full">
                    {error && <p className="error-msg"></p>}
                    {successMessage && <p className="success-msg">{successMessage}</p>}
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Ingresa tu nombre de usuario' }}
                        render={({ field, fieldState }) => (
                            <Input
                                size='md'
                                type="text"
                                label="Username"
                                variant="bordered"
                                fullWidth
                                isInvalid={!!fieldState.error}
                                color={fieldState.error ? 'danger' : 'success'}
                                errorMessage={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Ingresa tu contraseña', pattern: { value: /^.{9,}$/, message: 'Tu contraseña necesita tener más de 8 caracteres' } }}
                        render={({ field, fieldState }) => (
                            <Input
                                size='md'
                                type="password"
                                label="Contraseña"
                                variant="bordered"
                                fullWidth
                                isInvalid={!!fieldState.error}
                                color={!!fieldState.error ? 'danger' : 'success'}
                                errorMessage={fieldState.error?.message}
                                {...field}
                            />
                        )}
                    />

                <div className="flex gap-3 mt-5">
                    <Button type="button" variant="bordered" color="danger">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="solid" color="primary">
                        Guardar
                    </Button>
                </div>
            </form>
             )}
        </div>
    );
};
