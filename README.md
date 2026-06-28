# 24/7 series Weather Lookbook

성수동 날씨에 따라 룩북 이미지를 추천하는 GitHub Pages용 정적 MVP입니다.

## 빠른 설정

1. 기상청 공공데이터포털에서 `VilageFcstInfoService_2.0` 활용신청을 합니다.
2. `src/config.js`의 `serviceKey`에 일반 인증키를 입력합니다.
3. 룩북 PNG를 `assets/lookbook/`에 업로드합니다.
4. `src/lookbook-rules.js`에서 온도, 습도, 눈/비 여부별 이미지 규칙을 수정합니다.
5. GitHub 저장소의 `Settings > Pages`에서 `Build and deployment`의 `Source`를 `GitHub Actions`로 설정합니다. 이 설정을 먼저 켜지 않으면 `Get Pages site failed` 오류가 납니다.

> 현재 MVP는 브라우저에서 기상청 API를 직접 호출하므로 API 키가 노출됩니다.

## 룩북 이미지 교체

임시 SVG 파일은 직접 업로드한 PNG로 교체할 수 있습니다. 예를 들어 `assets/lookbook/cold-clear.png`를 추가한 뒤 `src/lookbook-rules.js`의 `image` 값을 `./assets/lookbook/cold-clear.png`로 바꾸면 됩니다.

## 지역

기본 지역은 서울 성수동이며, `src/config.js`의 위도/경도 값을 기준으로 기상청 격자 좌표를 계산합니다.


## GitHub Pages 배포 오류 해결

`Get Pages site failed` 또는 `HttpError: Not Found`가 나오면 GitHub Pages가 아직 저장소에서 활성화되지 않은 상태일 가능성이 큽니다. GitHub 저장소 화면에서 `Settings > Pages`로 이동한 뒤 `Build and deployment`의 `Source`를 `GitHub Actions`로 설정하고 저장한 다음, 실패한 workflow를 다시 실행하세요.

Node 20 deprecation 경고를 피하기 위해 Pages 관련 공식 액션은 Node 24 기반 최신 major 버전을 사용합니다.
