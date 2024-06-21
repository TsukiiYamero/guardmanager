/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import { useHandlePassword } from '@/customHooks/useHandlePassword';
import './login_layout.css';
/* import { type FormEvent, useState } from 'react'; */
import { Controller, useForm } from 'react-hook-form';
import { Button, Input } from '@nextui-org/react';
/* import { PatternPassword } from '@/utils'; */
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { PatternPassword } from '@/utils/utilities'
import { useAuthContext } from '@/store/auth/AuthContext';

type Props = {
    loading: boolean,
    errorMessage: string,
    handdleNotAUser: () => void,
    onSubmit: () => void;
    onForgotPassword: () => void,
}

export const LoginForm = ({
    loading, errorMessage,
    handdleNotAUser,
    onForgotPassword
}: Props) => {
    const { control, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { login } = useAuthContext();

    const loginAdmin = () => {
        login({ username: 'admin', role: 'admin', id: 'admin' })
    }

    const loginUser = () => {
        login({ username: 'user', role: 'user', id: 'user' })
    }

    const title = 'Iniciar Sesion';

    const { isVisible, togglePassword } = useHandlePassword();

    return (
        <div className={'px-[1.5rem] md:px-[2.5rem] py-[1.75rem] w-full sm:max-w-[380px] md:max-w-[640px] rounded-[10px] border-1 border-[#e4e4e7]'}>
            <div className='w-full'>

                {loading && <h1>Loading...</h1>}

                <h2 className='text-[length:1.25rem] mb-7'>{title}</h2>

                <p className={'error-msg-login'} >{errorMessage}</p>

                <form
                    /* onSubmit={handleSubmit(onSubmit)} */
                    noValidate
                    className={'flex flex-col gap-5 max-w-xl w-full'}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Ingresa tu Email',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Ingresa un email valido'
                            }
                        }}
                        render={({ field }) => (
                            <Input
                                size={'md'}
                                type="email"
                                label="Email"
                                variant="bordered"
                                fullWidth
                                className="md:w-[400px]"
                                isInvalid={!!errors.email}
                                color={errors.email ? 'danger' : 'success'}
                                errorMessage={errors.email?.message}
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
                                value: PatternPassword,
                                message: 'Tu Password necesita tener almenos 8 caracteres, debes incluir 1 letra y 1 numero'
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
                        onClick={loginUser}
                        variant="solid"
                        className='mt-2'
                    >
                        Trabajador
                    </Button>

                    <Button
                        fullWidth
                        color='primary'
                        disabled={loading}
                        onClick={loginAdmin}
                        variant="solid"
                        className='mt-2'
                    >
                        Admin
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
