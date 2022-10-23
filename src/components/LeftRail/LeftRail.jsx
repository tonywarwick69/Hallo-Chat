import { useChat } from 'context';
import { useResolved } from 'hooks';
import { ChatList } from 'components';
import { RailHeader } from 'components';
import { Loader } from 'semantic-ui-react';

export const LeftRail = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats);
  /* LeftRail bên trái sẽ chứa Tên app,
    chứa Avatar và tên user đang login
    chứa danh sách các phòng chat
    chứa button Tạo Chat để tạo phòng chat mới
  */
  return (
    <div className="left-rail">
      <div className="left-rail-title">
        Hallo Chat
      </div>
      <RailHeader />
      {chatsResolved ? (
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>Chưa có tin nhắn</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatClick}>
            Tạo Chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};
