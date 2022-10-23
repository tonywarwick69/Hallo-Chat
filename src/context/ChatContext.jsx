import { fb } from 'service';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

export const ChatContext = createContext();

export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();
  //Tạo phòng chat với tên là tên của userName đang login
  const createChatClick = () => {
    newChat(chatConfig, { title: chatConfig.userName });
  };
  const deleteChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    if (
      isAdmin &&
      window.confirm('Bạn có muốn xóa phòng chat này?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (window.confirm('Bạn có muốn rời khỏi phòng chat này?')) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };
  const selectChatClick = chat => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    console.log("chat.admin.username:",chat.admin.username );
    console.log("chatConfig.userName:",chatConfig.userName);
    getMessages(chatConfig, chat.id, messages => {
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  // Set thông tin cấu hình app chat khi
  // authUser được kích hoạt.
  useEffect(() => {
    if (authUser) {
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: '6a583332-a0d0-43a6-abd7-2b5a4b0c4a04',
          });
        });
    }
  }, [authUser, setChatConfig]);

  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  };
};
