import { fb } from 'service';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormField } from 'components/FormField/FormField';
import { defaultValues, validationSchema } from './formikConfig';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');
  //Tạo form signup với 3 dữ liệu input { email, userName, password }
  // Tạo user  trên chatengine sử dụng api, POST, tạo user trên Firebase sử dụng firestore
  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res?.user?.uid) {
          res.user.sendEmailVerification();
          fetch('/api/createUser', {
            method: 'POST',
            body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });
          });
        } else {
          setServerError(
            "Xin lỗi chúng tôi gặp lỗi khi thực hiện đăng ký tài khoản. Xin thử lại sau.",
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('Tài khoản với email hoặc mật khẩu này đã tồn tại ');
        } else {
          setServerError(
            "Xin lỗi chúng tôi gặp lỗi khi thực hiện đăng ký tài khoản. Xin thử lại sau.",
          );
        }
      })
      .finally(() => setSubmitting(false));
    
  };

  return (
    <div className="signup">
      <div className="signupWrapper">
        <div className="signupLeft">
            <h3 className="signupLogo">Hallo Chat</h3>
            <span className="signupDesc">
                Kết nối với bạn bè và trò chuyện với bạn bè xung quanh vối Hallo Chat
              </span>
          </div>
          <div className="signupRight">
          <div className="auth-form-signup">
        <h1>Đăng ký</h1>
        <Formik
          onSubmit={signup}
          validateOnMount={true}
          initialValues={defaultValues}
          validationSchema={validationSchema}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <FormField name="userName" label="User Name" />
              <FormField name="email" label="Email" type="email" />
              <FormField name="password" label="Password" type="password" />
              <FormField
                type="password"
                name="verifyPassword"
                label="Verify Password"
              />

              <div className="auth-link-container-signup">
                Đã có tài khoản?{' '}
                <span className="auth-link-signup" onClick={() => history.push('login')}>
                  Đăng nhập!
                </span>
              </div>

              <button disabled={isSubmitting || !isValid} type="submit">
                Đăng Ký
              </button>
            </Form>
          )}
        </Formik>

        {!!serverError && <div className="error-signup">{serverError}</div>}
      </div>
          </div>
      </div>
    </div>
  );
};
