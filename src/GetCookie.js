export function getCookie(name) {
  var cookieArr = document.cookie.split(";");

  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    // Xóa khoảng trắng thừa
    var cookieName = cookiePair[0].trim();

    if (cookieName === name) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Trả về null nếu không tìm thấy cookie
  return null;
}
