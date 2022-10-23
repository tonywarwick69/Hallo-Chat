import { useState, useEffect } from 'react';

/*
  Mục đích của hook này là có thể xác định xem liệu có
   hay không phải là một giá trị được khởi tạo dưới dạng undefined đã được
   được cập nhật thành kiểu dữ liệu mong đợi. Ví dụ, nếu một
   thành phần có một biến trạng thái được khai báo mà không có
   giá trị ban đầu, nhưng bạn mong đợi giá trị đó xuất hiện tại một số thời điểm ..
   thì có thể sử dụng hook này để xác định khi giá trị không còn là không xác định.
   Điều này đặc biệt hữu ích với authUser.
*/

export const useResolved = (
  ...vals
) => {
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    setResolved(vals.every(v => v !== undefined));
  }, [vals]);

  // Returns true if resolved otherwise false
  return resolved;
};
