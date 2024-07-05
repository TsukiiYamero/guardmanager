/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useHandlePassword } from '@/customHooks/useHandlePassword';
import './login_layout.css';
/* import { type FormEvent, useState } from 'react'; */
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
/* import { PatternPassword } from '@/utils'; */
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { PatternPassword } from '@/utils/utilities'

type Props = {
    loading: boolean,
    errorMessage?: string | null,
    handdleNotAUser: () => void,
    onLogin: ({ username, password }: { username: string, password: string }) => void;
    onForgotPassword: () => void,
}

export const LoginForm = ({
    loading, errorMessage,
    handdleNotAUser,
    onForgotPassword,
    onLogin
}: Props) => {
    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    });

    /* const handleSubmit = (data: FormEventHandler<HTMLFormElement>) => {
        onSubmit({ username: 'user', role: 'user', id: 'user' })
    } */
    const onSubmit: SubmitHandler<{ username: string, password: string }> = (data) => onLogin(data);

    const title = 'Iniciar Sesion';

    const { isVisible, togglePassword } = useHandlePassword();

    return (
        <div className={'px-[1.5rem] md:px-[2.5rem] py-[1.75rem] w-full sm:max-w-[380px] md:max-w-[640px] rounded-[10px] border-1 border-[#e4e4e7]'}>
            <div className='w-full'>

                <h2 className='text-[length:1.25rem] mb-7'>{title}</h2>

                <span className="block text-red-700 px-4 py-3">
                    {errorMessage}
                </span>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className={'flex flex-col gap-5 max-w-xl w-full'}
                >
                    <Controller
                        name="username"
                        control={control}
                        rules={{
                            required: 'Ingresa tu username',
                        }}
                        render={({ field }) => (
                            <Input
                                size={'md'}
                                type="text"
                                label="Username"
                                variant="bordered"
                                fullWidth
                                className="md:w-[400px]"
                                isInvalid={!!errors.username}
                                color={errors.username ? 'danger' : 'success'}
                                errorMessage={errors.username?.message}
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Ingresa tu password',
                            pattern: {
                                /* value: PatternPassword, */
                                value: /^.{9,}$/g,
                                message: 'Tu Password necesita tener mas de 8 caracteres '
                            }
                        }}
                        render={({ field }) => (
                            <Input
                                size='md'
                                label="Password"
                                variant="bordered"
                                fullWidth
                                className="md:w-[400px]"
                                isInvalid={!!errors.password}
                                color={errors.password ? 'danger' : 'success'}
                                errorMessage={errors.password?.message}
                                type={isVisible ? 'text' : 'password'}
                                {...field}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={togglePassword}>
                                        {
                                            isVisible
                                                ? (
                                                    <IconEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                                )
                                                : (
                                                    <IconEye className="text-2xl text-default-400 pointer-events-none" />
                                                )}
                                    </button>
                                }
                            />
                        )}
                    />

                    <Button
                        fullWidth
                        color='primary'
                        disabled={loading}
                        type="submit"
                        variant="solid"
                        className='mt-2'
                    >
                        Ingresar
                    </Button>

                </form>

            </div>

            <div className='pt-[11px] relative'>
                <p onClick={onForgotPassword} className='forgot-msg-login'>Olvidaste tu Password?</p>


                <div className='login-social-media'>
                    <div className='custom-line'>
                        <span>O</span>
                    </div>

                    <div className='login-others-opts'>

                        <span className='underline text-[length:var(--font-size-common)]'
                            onClick={() => { handdleNotAUser(); }}>
                            No tienes cuenta aun?
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
};
