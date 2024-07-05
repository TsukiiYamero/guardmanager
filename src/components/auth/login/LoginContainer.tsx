import { LoginForm } from './LoginForm';
import { useLogin } from '@/customHooks/useUser';
import { useAuthContext } from '@/store/auth/AuthContext';
import { useEffect } from 'react';

export const LoginContainer = () => {
    const { user, fetchLogin, error, loading } = useLogin();
    const { login } = useAuthContext();

    const forgotPassword = () => {

    };

    const handdleNotAUser = () => {

    };

    const onSubmit = ({ username, password }: { username: string, password: string }) => {
        fetchLogin({ username, password })
    };

    useEffect(() => {
        if (user) {
            login({
                username: user.user,
                id: user.id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                role: user.role as any
            });
        }
    }, [user]);

    return (
        <>
            <LoginForm
                loading={loading}
                errorMessage={error}
                onLogin={onSubmit}
                handdleNotAUser={handdleNotAUser}
                onForgotPassword={forgotPassword}
            />

            {/* <Modal
                isOpen={isOpenModalForgPass}
                onClose={closeModalForgotPassword}
                closeByClickOutside={false}
                displayLevel={2}
            >
                <ForgotPasswordLayout />
            </Modal> */}
        </>
    );
};
