export function getToken(cookieHeader) {
  let token = null;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';');
    const tokenCookie = cookies.find((c) => c.trim().startsWith('token='));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
    }
  }
  if (token) {
    return token;
  } else {
    return null;
  }
}
