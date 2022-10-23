import { useState, useEffect } from 'react';
//useDebounce Chức năng yêu cầu function phải đơi khoảng thời gian nhất dịnh sau khi user ngưng thao tác rồi mới bắt đầu thực hiện
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
