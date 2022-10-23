import { useChat } from 'context';
import { useState, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { ImageUpload } from 'components';
import { sendMessage } from 'react-chat-engine';

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const inputRef = useRef(null);
  const [image, setImage] = useState();
  /*
    Khi gửi tin nhắn sẽ tự động tạo nội dung tin nhắn mặc định là:
    setChatInputText('') cho văn bản
    setImage([]) cho file hình ảnh
    Nếu đó là tin nhắn văn bản
    setChatInputText(chatInputText)
    Nếu đó là tin nhắn hình ảnh
    setImage(files)
  */
  const sendChatMessage = () => {
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
    console.log("sendChatMessage:",sendChatMessage);
  };

  const onFileAttach = file => {
    setImage(file);
    setImageModalOpen(true);
    console.log("onFileAttach:",onFileAttach)
  };
  return (
    <>
      <div className="chat-controls">
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = '';
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="file image outline" color="blue" />
        </div>
        <input
          value={chatInputText}
          className="chat-input"
          placeholder="Gửi tin nhắn"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={e => setChatInputText(e.target.value)}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="blue" />
        </div>
      </div>

      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg,image/png"
        onChange={e => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />

      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          mode="message"
          onSubmit={() => {
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: chatInputText,
                files: [image],
              },
              () => {
                setImage(null);
                setChatInputText('');
              },
            );
          }}
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};
