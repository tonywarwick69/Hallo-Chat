import { fb } from 'service';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField/FormField';
import { validationSchema, defaultValues } from './formikConfig';


export const Login = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        if (!res.user) {
          setServerError(
            "Chúng tôi gặp lỗi trong quá trình đăng nhập.Xin hãy thử đăng nhập lại.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setServerError('Sai mật khẩu hoặc email');
        } else if (err.code === 'auth/user-not-found') {
          setServerError('Sai mật khẩu hoặc email');
        } else {
          setServerError('Something went wrong :(');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Hallo Chat</h3>
          <span className="loginDesc">
            Kết nối với bạn bè và trò chuyện với bạn bè xung quanh trên với Hallo Chat
          </span>
        </div>
        <div className="loginRight">
            <div className="auth-form">
              <h1>Đăng nhập</h1>
              <Formik
                onSubmit={login}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
              >
                {({ isValid, isSubmitting }) => (
                  <Form>
                    <FormField name="email" label="Email" type="email" />
                    <FormField name="password" label="Password" type="password" />
                    <div className="auth-link-container">
                      Chưa có tài khoản?{' '}
                      <span
                        className="auth-link"
                        onClick={() => history.push('signup')}>
                        Đăng ký!
                      </span>
                    </div>
                    <button type="submit" disabled={!isValid || isSubmitting}>
                      Đăng nhập
                    </button>
                  </Form>
                )}
              </Formik>
              {!!serverError && <div className="error">{serverError}</div>}
        </div>
        </div>
      </div>
    </div>
  );
};
