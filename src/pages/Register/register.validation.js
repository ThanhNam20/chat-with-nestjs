import * as Yup from 'yup';
export const signUpValidation = Yup.object({
  email: Yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup
    .string()
    .min(8, 'Minimum 8 characters length')
    .required('Password is required'),
    re_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
});

