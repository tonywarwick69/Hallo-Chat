import { fb } from 'service';
import { useEffect, useState } from 'react';

//  Khởi tạo mặc định là undefined và set null useAuth null nếu ko login
//   việc này giúp xác dịnh xem hook được xử lý hay chưa
// 

/*Điều này rất quan trọng để có thể phân biệt
    giữa việc chưa xác định trạng thái xác thực và xác định
   rằng không có người dùng hiện đang đăng nhập.
*/

// Từ đó cho 3 trạng thái authUser
// 1. Unresolved
// 2. No user
// 3. User exists
export const useAuth = () => {
  const [authUser, setAuthUser] = useState(); // undefined | firebase.User | null

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return {
    authUser,
  };
};
