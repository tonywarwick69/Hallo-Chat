import { useChat } from 'context';
import { useDebounce } from 'hooks';
import { Search } from 'semantic-ui-react';
import { useEffect, useRef, useState } from 'react';
import { addPerson, getOtherPeople } from 'react-chat-engine';

export const SearchUsers = ({ visible, closeFn }) => {
  let searchRef = useRef();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  //useDebounce Chức năng yêu cầu function phải đơi khoảng thời gian nhất dịnh sau khi user ngưng thao tác rồi mới bắt đầu thực hiện
  // null -> not searching for results
  // [] -> No results
  // [...] -> Results
  const [searchResults, setSearchResults] = useState(null);
  //Nếu thanh search được kích hoạt thì request focus con trỏ vào thanh search
  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible]);

  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setSelectedChat,
  } = useChat();
  //Lọc user đang đăng nhập khỏi danh sách search
  //Khi user được selectUser username thì add User đó vào phòng chat hiện tại (selectedChat)
  const selectUser = username => {
    addPerson(chatConfig, selectedChat.id, username, () => {
      const filteredChats = myChats.filter(c => c.id !== selectedChat.id);
      const updatedChat = {
        ...selectedChat,
        people: [...selectedChat.people, { person: { username } }],
      };

      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFn();
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
        const userNames = Object.keys(data)
          .map(key => data[key].username)
          .filter(u =>
            u.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
          );
        setSearchResults(userNames.map(u => ({ title: u })));
        setLoading(false);
      });
    } else {
      setSearchResults(null);
    }
    console.log("selectedChat:",selectedChat);
  }, [debouncedSearchTerm, chatConfig, selectedChat]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <Search
        fluid
        onBlur={closeFn}
        loading={loading}
        value={searchTerm}
        placeholder="Tìm tên user"
        open={!!searchResults && !loading}
        input={{ ref: r => (searchRef = r) }}
        onSearchChange={e => setSearchTerm(e.target.value)}
        results={searchResults}
        onResultSelect={(e, data) => {
          if (data.result?.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};
