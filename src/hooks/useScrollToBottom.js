import { useEffect } from "react";

export const useScrollToBottom = (trigger, className) => {
  /*
    Scrolls xuống cuối message list của phòng chat xuống message mới nhất
    Nếu có tin nhắn hình ảnh trong phòng chat thì
    chương trình đợi đến khi ảnh đã load xong và tự động scroll xuống tin nhắn mới nhất
  */
  useEffect(() => {
    if (!!trigger) {
      Promise.all(
        Array.from(document.images)
          .filter(img => !img.complete)
          .map(img => new Promise(resolve => {
            img.onload = img.onerror = resolve;
          }))
      )
        .then(() => {
          document.getElementsByClassName(className)[0].scrollTop = document.getElementsByClassName(className)[0].scrollHeight;
        });
    }
  }, [trigger, className]);
};
