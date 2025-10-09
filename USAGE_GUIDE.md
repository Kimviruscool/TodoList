# 포트폴리오 웹사이트 사용 가이드

## 🔄 환경별 설정 방법

### 1. Spring Boot 로컬 개발 환경

#### 사용하는 파일들:
- `src/main/resources/templates/index.html` (Thymeleaf 템플릿)
- `src/main/resources/static/CSS/style.css`
- `src/main/resources/static/JS/script.js`

#### 설정 방법:
```html
<!-- Spring Boot용 Thymeleaf (활성화) -->
<link rel="stylesheet" th:href="@{/CSS/style.css}">
<script th:src="@{/JS/script.js}"></script>

<!-- Vercel 배포용 (주석 처리) -->
<!-- <link rel="stylesheet" href="/CSS/style.css"> -->
<!-- <script src="/JS/script.js"></script> -->
```

#### 실행:
```bash
./gradlew bootRun
# http://localhost:8888 에서 확인
```

### 2. Vercel 배포 환경

#### 사용하는 파일들:
- `public/index.html` (정적 HTML)
- `public/CSS/style.css`
- `public/JS/script.js`

#### 설정 방법:
```html
<!-- Vercel 배포용 (활성화) -->
<link rel="stylesheet" href="/CSS/style.css">
<script src="/JS/script.js"></script>

<!-- Spring Boot용 Thymeleaf (주석 처리) -->
<!-- <link rel="stylesheet" th:href="@{/CSS/style.css}"> -->
<!-- <script th:src="@{/JS/script.js}"></script> -->
```

#### 배포:
```bash
git push origin main
# Vercel이 자동으로 배포
```

## 📝 환경 전환 방법

### Spring Boot → Vercel 전환 시:
1. `src/main/resources/templates/index.html`에서:
   - Thymeleaf 태그 주석 처리
   - 일반 HTML 태그 주석 해제

2. `public/index.html`에서:
   - 일반 HTML 태그 활성화 (이미 설정됨)
   - Thymeleaf 태그 주석 처리 (이미 설정됨)

### Vercel → Spring Boot 전환 시:
1. `src/main/resources/templates/index.html`에서:
   - Thymeleaf 태그 주석 해제
   - 일반 HTML 태그 주석 처리

2. `public/index.html`에서:
   - 일반 HTML 태그 주석 처리
   - Thymeleaf 태그 주석 해제

## 🔧 데이터 소스 차이

### Spring Boot 환경:
- **API 호출**: Spring Boot REST API (`/api/profile`, `/api/skills` 등)
- **동적 데이터**: 서버에서 실시간으로 데이터 제공
- **Thymeleaf**: 서버사이드 템플릿 렌더링

### Vercel 환경:
- **정적 데이터**: JavaScript 파일 내 하드코딩된 데이터
- **클라이언트사이드**: 브라우저에서 직접 렌더링
- **일반 HTML**: 정적 파일 서빙

## 🎯 권장 워크플로우

### 개발 단계:
1. Spring Boot 환경에서 개발 및 테스트
2. API 기능 및 템플릿 수정
3. 로컬에서 `./gradlew bootRun`으로 확인

### 배포 단계:
1. 변경사항을 `public` 폴더에도 동기화
2. 필요시 정적 데이터 업데이트
3. Git 푸시로 Vercel 자동 배포

## ⚠️ 주의사항

1. **파일 동기화**: `src/main/resources/static/`와 `public/` 폴더의 파일들이 일치해야 함
2. **데이터 일관성**: Spring Boot API 데이터와 Vercel 정적 데이터가 동일해야 함
3. **경로 설정**: 각 환경에 맞는 주석 처리 확인

## 🚀 빠른 전환 스크립트

### Spring Boot 활성화:
```bash
# templates/index.html에서 주석 변경
sed -i 's|<!-- <link rel="stylesheet" th:href="@{/CSS/style.css}"> -->|<link rel="stylesheet" th:href="@{/CSS/style.css}">|g' src/main/resources/templates/index.html
sed -i 's|<link rel="stylesheet" href="/CSS/style.css">|<!-- <link rel="stylesheet" href="/CSS/style.css"> -->|g' src/main/resources/templates/index.html
```

### Vercel 활성화:
```bash
# public/index.html에서 주석 변경
sed -i 's|<!-- <link rel="stylesheet" href="/CSS/style.css"> -->|<link rel="stylesheet" href="/CSS/style.css">|g' public/index.html
sed -i 's|<link rel="stylesheet" th:href="@{/CSS/style.css}">|<!-- <link rel="stylesheet" th:href="@{/CSS/style.css}"> -->|g' public/index.html
```

---

💡 **팁**: 개발 시에는 Spring Boot를 사용하고, 배포 시에는 Vercel을 사용하는 것이 가장 효율적입니다!
