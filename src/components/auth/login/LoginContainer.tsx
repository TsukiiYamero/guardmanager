import { LoginForm } from './LoginForm';
import { useAuthHandler } from '../useAuthHandler';

export const LoginContainer = () => {

    const {
        loading, errorMessage
    } = useAuthHandler();

    const forgotPassword = () => {

    };

    const handdleNotAUser = () => {

    };

    const onSubmit = () => {

    };

    return (
        <>
            <LoginForm
                loading={loading}
                errorMessage={errorMessage}
                onSubmit={onSubmit}
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
