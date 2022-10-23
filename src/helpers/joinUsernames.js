/*
  Lấy mảng tập hợp các thành viên và hợp tên các thành viên lại
  các tên ngăn cách bởi đấu phẩy ','.
  Đồng thời lọc username của user đang login.
  Nếu chỉ có tên 1 thành viên khác thì chỉ trả về tên thành viên đó ko dấu phẩy
*/

export const joinUsernames = (people, currentUsername) => {
  return   people
    .map(p => p.person.username)
    .filter(un => un !== currentUsername)
    .join(',');
};
