import { ErrorMessage, Field } from 'formik';

export const FormField = ({ name, label, type = 'text' }) => (
  //Tạo các field để nhập dữ liệu trong form
  <label>
    {label}
    <Field name={name} type={type} />
    <ErrorMessage className="error" component="div" name={name} />
  </label>
);
