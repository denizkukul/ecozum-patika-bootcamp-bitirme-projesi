export const getCookie = (cookieName: string) => {
  return document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)')?.pop() || null;
}

export const setCookie = (cookieName: string, value: string) => {
  document.cookie = `${cookieName}=${value}`;
}

export const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}