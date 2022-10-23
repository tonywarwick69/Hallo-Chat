import * as Yup from 'yup';

export const defaultValues = {
  email: '',
  password: '',
  userName: '',
  verifyPassword: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Required'),
  password: Yup.string().required('Required').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  verifyPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Mật khẩu tái xác nhận phải giống nhau'),
  userName: Yup.string().required('Required').matches(/^\S*$/, 'No spaces').min(3, 'Tên người dùng phải có ít nhất 3 ký tự'),
});
