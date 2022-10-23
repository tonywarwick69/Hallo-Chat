import * as Yup from 'yup';
//Kiểm tra ràng buộc điều kiện để đăng nhập
export const defaultValues = {
  email: '',
  password: '',
};

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});
