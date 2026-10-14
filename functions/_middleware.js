// 짧은 주소(부고.mj4.kr, bugo.mj4.kr 등)로 들어오면 본 사이트의 해당 페이지로 넘긴다.
// 페이지를 두 곳에 두지 않아 검색 점수가 갈라지지 않게 하려는 것이다.
const MAIN = 'https://xn--hz2b29jx3fkcys.com';
const SHORT = {
  'xn--299a782a.mj4.kr': '/bugo', // 부고.mj4.kr
  'bugo.mj4.kr': '/bugo',
  'xn--hq1b18f1rqw5b.mj4.kr': '/funeral-halls', // 장례지도.mj4.kr (2026-10-14 대표님 결정)
};

export async function onRequest(context) {
  const host = new URL(context.request.url).hostname.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(SHORT, host)) {
    return Response.redirect(MAIN + SHORT[host], 302);
  }
  return context.next();
}
