import { useEffect } from 'react';
import { useChat } from 'context';
import { getChats, ChatEngine } from 'react-chat-engine';
import { LeftRail, ChatToolbar, ChatInput, MessageList } from 'components';

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
    closeChat,
  } = useChat();

  useEffect(() => {
    console.log('Danh sách phòng chat: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Thông tin phòng chat được click vào: ', selectedChat);
  }, [selectedChat]);
  //closechat

  useEffect(()=>{
    console.log('Close chat', closeChat);
    //closeChat={()=> ChatEngine(false)}
  }, [closeChat]);
 
  return (
    <>
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            console.log("ProjectID"+chatConfig.projectID)
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={chat => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={chat => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
            );
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
            console.log("Tin nhắn thuộc về:",chatThatMessageBelongsTo);
            const filteredChats = myChats.filter(c => c.id !== chatId);
            console.log("filteredChats:",filteredChats);
            const updatedChat = {
              ...chatThatMessageBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
            );
          }}
          
        />
      )}
    
      <div className="chat-container">
        <LeftRail />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                src="/img/pointLeft.png"
                className="point-left"
                alt="point-left"
              />
              Chọn phòng chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};
