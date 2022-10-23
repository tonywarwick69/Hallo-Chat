import { useState } from 'react';
import { useChat } from 'context';
import { joinUsernames } from 'helpers';
import { Icon } from 'semantic-ui-react';
import { SearchUsers } from 'components';

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);
  /*Tạo thanh search set trạng thái thành search to false khi chưa bấm vào add-user-icon
    Khi bấm vào icon set trạng thái sang true và hiển thị thanh search
    Hiện thị tên các thành viên trong phòng chat ở chat-header-text
   */

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>

        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          ></Icon>
        </div>
      </div>
      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};
