//  Trả về tên user đầu tiên trong phòng chat
//  mà username đó ko phải là user đang login

export const notMe = (chatConfig, selectedChat) => {
  return selectedChat.people.find(p => p.person.username !== chatConfig.userName)?.person?.username;
};
