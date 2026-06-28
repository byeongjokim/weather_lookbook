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

## GitHub Environment로 날씨값 테스트

실제 배포 전에 GitHub Actions의 `workflow_dispatch`와 GitHub Environment 변수를 이용해 테스트 날씨값을 주입할 수 있습니다.

1. GitHub 저장소에서 `Settings > Environments`로 이동해 테스트용 Environment를 만듭니다. 예: `weather-test`.
2. 해당 Environment의 Variables에 아래 값을 추가합니다.
   - `ENABLE_WEATHER_TEST_MODE`: `true` (이 값이 있는 Environment에서만 테스트값 주입이 진행됩니다.)
   - `TEST_TEMPERATURE`: 테스트할 기온 숫자. 예: `27`, `15`
   - `TEST_PRECIPITATION_TYPE`: `none`, `rain`, `snow` 중 하나
   - 선택: `TEST_HUMIDITY`: 테스트 습도 숫자. 기본값은 `55`입니다.
3. `Actions > Deploy static site to GitHub Pages > Run workflow`에서 테스트 Environment를 선택합니다.
4. 필요하면 실행 화면에서 `test_temperature`, `test_precipitation` 입력값으로 Environment 변수값을 일시적으로 덮어쓸 수 있습니다. `test_precipitation`은 `none`, `rain`, `snow` 중 하나로 입력합니다.

테스트 입력값을 넣었는데 선택한 Environment에 `ENABLE_WEATHER_TEST_MODE=true`가 없으면 workflow가 실패합니다. 일반 push 배포는 기본 `github-pages` Environment를 사용하며 실제 기상청 API 값을 표시합니다.

현재 룩북 노출 규칙은 다음과 같습니다.

- 비가 오면 기온과 상관없이 `assets/lookbook/rainy.jpeg`
- 눈/비가 없고 25°C 이상이면 `assets/lookbook/hot.jpeg`
- 눈/비가 없고 10°C 이상 20°C 이하이면 `assets/lookbook/mild.jpeg`
