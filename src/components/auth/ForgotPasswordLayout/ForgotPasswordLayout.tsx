/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './forgot_password_layout.css';
import { useForm } from 'react-hook-form';

export const ForgotPasswordLayout = () => {
  const [disableBtn, setDisableBtn] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    defaultValues: {
      email: ''
    }
  });

  const onSendRecoveryLink = async () => {

  };

  return (
    <div className="forgot-password-container">
      <h3>Recovery Password</h3>

      {/* <Box
        component="form"
        noValidate
      >
        <TextField
          {...register('email', {
            required: 'Please Provide an email',
            pattern: {
              value: PatternEmail,
              message: 'Please enter a valid email'
            }
          })}
          id="email_recovery"
          error={!!errors.email}
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          required
          helperText={errors.email?.message}
        />
        <Button
          fullWidth
          disabled={disableBtn}
          type='submit'
          variant="contained"
          onClick={handleSubmit(onSendRecoveryLink)}
        >Send Recovery Link</Button>
      </Box> */}
    </div>
  );
};
