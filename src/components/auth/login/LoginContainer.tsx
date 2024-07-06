import { LoginForm } from './LoginForm';
import { useLogin } from '@/customHooks/useUser';
import { useAuthContext } from '@/store/auth/AuthContext';
import { useEffect } from 'react';

export const LoginContainer = () => {
    const { data, fetchLogin, error, loading } = useLogin();
    const { login } = useAuthContext();

    const forgotPassword = () => {

    };

    const handdleNotAUser = () => {

    };

    const onSubmit = ({ username, password }: { username: string, password: string }) => {
        const uNoSpaces = username.trim();
        const pNoSpaces = password.trim();
        fetchLogin({ username: uNoSpaces, password: pNoSpaces })
    };

    useEffect(() => {
        if (data?.user && data.token) {
            const user = data.user;
            login({
                username: user.user,
                id: user.id,
                role: user.role
            }, data.token);
        }
    }, [data]);

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
