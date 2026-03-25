# 마을장의사닷컴 (mauljangeui.com)

## 프로젝트 개요
장례지도사가 직접 운영하는 후불장례종합서비스 홈페이지.
정적 HTML/CSS/JS로만 구성된 사이트 (별도 서버/DB 없음).

## 배포
- **플랫폼:** Cloudflare Pages
- **GitHub:** https://github.com/maulap000/maul-jangeuisa
- **배포 방법:** `git push` → Cloudflare 자동 빌드 및 배포

## 파일 구조
| 파일 | 역할 |
|------|------|
| index.html | 메인 홈페이지 |
| sangjo.html | 후불상조서비스 |
| small.html | 화장형 작은장례 (160만원) |
| normal.html | 화장형 일반장례 (250만원) |
| mubinso.html | 무빈소 장례 |
| jangji.html | 화장장지서비스 |
| ijang.html | 개장·이장서비스 |
| favicon.svg | 파비콘 |
| images/ | 로고 등 이미지 |

## 도메인 / 홈페이지
- **공개 도메인:** 마을장의사.com (공식, 대외 공개 및 안내용)
- **내부 주소:** maulj24.com (비공개 — 대외 안내·전단지·홈페이지 등에 노출 금지)

## 연락처 (사이트 내 표시)
- 전화: 1877-1852 (24시간)

## 작업 시 주의사항
- 순수 정적 HTML — 빌드 도구 없음, npm/node 불필요
- 수정 후 반드시 `git add . && git commit -m "설명" && git push`
- 모바일 반응형 유지 필수
