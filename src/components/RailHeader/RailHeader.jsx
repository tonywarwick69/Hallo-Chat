import { fb } from 'service';
import { useChat } from 'context';
import { useResolved } from 'hooks';
import { useRef, useState } from 'react';
import { ImageUpload } from 'components';
import { Icon, IconGroup, Image, Loader } from 'semantic-ui-react';

export const RailHeader = () => {
  const { chatConfig } = useChat();
  const configResolved = useResolved(chatConfig);
  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const onFileAttach = file => {
    setImage(file);
  };
  /*
    Hiển thị avatar , tên và icon thay đổi ảnh đại diện cho user đang login vào app
  */

  return (
    <>
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

      {!!image && (
        <ImageUpload
          crop
          file={image}
          header="Set Your Avatar"
          mode="message"
          onSubmit={croppedImage => {
            const storageRef = fb.storage.ref();
            const uploadRef = storageRef.child(
              `${chatConfig.userSecret}_avatar.jpg`,
            );
            uploadRef.put(croppedImage).then(() => {
              uploadRef.getDownloadURL().then(url => {
                fb.firestore
                  .collection('chatUsers')
                  .doc(chatConfig.userSecret)
                  .update({ avatar: url })
                  .then(() => {
                    setImage(null);
                  });
              });
            });
          }}
          close={() => setImage(null)}
        />
      )}

      <div className="left-rail-header">
        <div className="log-out-icon"> <Icon
           onClick={() => {if(window.confirm('Bạn có muốn đăng xuất?')){
            fb.auth.signOut();
          } }}
          className="sign-out"
          name="sign out"
        /></div>
        {configResolved && !!chatConfig ? (
          <div className="current-user-info">
            <IconGroup
              onClick={() => {
                const input = inputRef.current;
                if (input) {
                  input.value = '';
                  input.click();
                }
              }}
              className="user-avatar"
              size="large"
            >
              {chatConfig.avatar ? (
                <Image src={chatConfig.avatar} avatar />
              ) : (
                <div className="empty-avatar">
                  {chatConfig.userName[0].toUpperCase()}
                </div>
              )}

              <Icon corner name="camera" inverted circular />
            </IconGroup>

            <div className="current-username">{chatConfig.userName}</div>
          </div>
        ) : (
          <div className="user-loading">
            <Loader active size="small" />
          </div>
        )}
      </div>
    </>
  );
};
