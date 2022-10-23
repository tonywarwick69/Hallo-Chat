/* 
  Chuyển đổi mảng (array) 1 chiều sang mảng 2 chiều bằng cách gộp nhóm 
  tất cả các tin nhắn của cùng 1 user gửi nếu nó đang trong cùng 1 chuỗi
   Minh họa:
  [
    { sender: 'USER-A', text: 'Hi'},
    { sender: 'USER-A', text: 'hello world'},
    { sender: 'USER-B', text: 'Test 123'},
    { sender: 'USER-A', text: 'Bye'},
  ]
  Chuyển thành
  [
    [
      { sender: 'USER-A', text: 'Hi'},
      { sender: 'USER-A', text: 'hello world'},
    ],
    [
      { sender: 'USER-B', text: 'Test 123'},
    ],
    [
      { sender: 'USER-A', text: 'Bye'},
    ]
  ]
*/

export const groupMessages = messages => {
  const finalArr = [];

  let currentArr = [];
  let currentAuthor = '';
  messages.forEach(m => {
    /* Nếu chúng ta là một user mới
     Điều này cũng hoạt động trên lần lặp đầu tiên vì giá trị ban đầu là chuỗi trống
  */
    if (m.sender.username !== currentAuthor) {
      if (currentAuthor) {
        finalArr.push([...currentArr]);
      }
      currentArr.splice(0, currentArr.length); // empty the array
      currentArr.push(m);
      currentAuthor = m.sender.username;
    } else {
      currentArr.push(m);
    }
  });

  //  Phải gọi lại sắp xếp array group bởi vì
  // khi loop kết thúc, block if(){} đầu tiên sẽ ko dc group
  // dẫn dến lệnh finalArr.push cũng ko thực hiện dc
  finalArr.push([...currentArr]);

  return finalArr;
};
