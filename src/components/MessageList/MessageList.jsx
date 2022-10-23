import { useChat } from 'context';
import { ChatAvatar } from 'components';
import { groupMessages } from 'helpers';
import { useScrollToBottom } from 'hooks';


export const MessageList = () => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');
  console.log("selectedChat:",selectedChat);
  /*
    MessageList để hiện thị array dãy các tin nhắn trong phòng chat
    Các tin nhắn được gộp theo dạng groupMessage thành nhóm các tin nhắn
    cùng 1 người gửi trong cùng 1 chuỗi tin nhắn
    Thông tin tin nhắn cùng 1 chuỗi từ cùng 1 người gửi gồm:
    Avatar sender, username, các tin nhắn
  */

  return (
    <div className="chat-messages">
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <ChatAvatar
                className="message-avatar"
                username={m[0].sender.username}
                chat={selectedChat}
              />
              <div className="message-author">{m[0].sender.username}</div>
            </div>
            <div className="message-content">
              {m.map((individualMessage, index) => (
                <div key={index}>
                  <div className="message-text" >{individualMessage.text}
                  </div>
                  {!!individualMessage.attachments.length && (
                    <img
                      className="message-image"
                      src={individualMessage.attachments[0].file}
                      alt={individualMessage.id + '-attachment'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages-yet">Chưa có tin nhắn</div>
      )}
    </div>
  
  );
};
