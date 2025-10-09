# 포트폴리오 웹사이트

Spring Boot와 HTML/CSS/JavaScript를 활용한 개인 포트폴리오 웹사이트입니다.

## 🚀 주요 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험
- **모던한 UI/UX**: 깔끔하고 직관적인 인터페이스
- **동적 콘텐츠**: Spring Boot API를 통한 실시간 데이터 로딩
- **인터랙티브 요소**: 스크롤 애니메이션, 부드러운 전환 효과
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 🛠 기술 스택

### Backend
- **Java 17**
- **Spring Boot 3.5.6**
- **Thymeleaf** (템플릿 엔진)

### Frontend
- **HTML5**
- **CSS3** (Flexbox, Grid, 애니메이션)
- **JavaScript (ES6+)**
- **Font Awesome** (아이콘)
- **Google Fonts** (Noto Sans KR)

### 배포
- **Vercel** (클라우드 플랫폼)
- **Gradle** (빌드 도구)

## 📁 프로젝트 구조

```
src/
├── main/
│   ├── java/
│   │   └── WEB/
│   │       ├── AppStart.java          # Spring Boot 메인 클래스
│   │       └── Controller/
│   │           └── ViewController.java # REST API 컨트롤러
│   └── resources/
│       ├── application.properties     # 개발 환경 설정
│       ├── application-production.properties # 프로덕션 설정
│       ├── static/
│       │   ├── CSS/
│       │   │   └── style.css         # 메인 스타일시트
│       │   └── JS/
│       │       └── script.js         # 메인 JavaScript
│       └── templates/
│           └── index.html            # 메인 HTML 템플릿
├── build.gradle                      # Gradle 빌드 설정
├── vercel.json                       # Vercel 배포 설정
└── package.json                      # Node.js 프로젝트 설정
```

## 🚀 로컬 개발 환경 설정

### 필요 조건
- Java 17 이상
- Gradle 7.0 이상

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **의존성 설치**
   ```bash
   ./gradlew build
   ```

3. **애플리케이션 실행**
   ```bash
   ./gradlew bootRun
   ```

4. **브라우저에서 접속**
   ```
   http://localhost:8888
   ```

## 🌐 Vercel 배포

### 1. Vercel CLI 설치
```bash
npm i -g vercel
```

### 2. 프로젝트 배포
```bash
vercel
```

### 3. 환경 변수 설정 (선택사항)
Vercel 대시보드에서 다음 환경 변수를 설정할 수 있습니다:
- `SPRING_PROFILES_ACTIVE=production`
- `PORT=8080`

## 📱 주요 섹션

### 1. Hero Section
- 개인 소개 및 직업
- CTA 버튼 (프로젝트 보기, 연락하기)

### 2. About Section
- 개발자 소개
- 연락처 정보

### 3. Skills Section
- 기술 스택을 카테고리별로 분류
- Frontend, Backend, Database, Tools

### 4. Projects Section
- 프로젝트 포트폴리오
- 기술 스택 태그
- GitHub 링크

### 5. Experience Section
- 경력 타임라인
- 회사별 상세 정보

### 6. Contact Section
- 연락처 폼
- 소셜 미디어 링크

## 🎨 커스터마이징

### 개인 정보 수정
`ViewController.java`의 API 엔드포인트에서 다음 정보를 수정하세요:
- 이름, 직업, 이메일, 전화번호
- 프로젝트 목록
- 경력 정보

### 스타일 수정
`src/main/resources/static/CSS/style.css`에서 다음을 수정할 수 있습니다:
- 색상 테마
- 폰트
- 레이아웃

### 기능 추가
`src/main/resources/static/JS/script.js`에서 새로운 기능을 추가할 수 있습니다.

## 🔧 API 엔드포인트

| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/` | GET | 메인 페이지 |
| `/api/profile` | GET | 개인 정보 |
| `/api/skills` | GET | 기술 스택 |
| `/api/projects` | GET | 프로젝트 목록 |
| `/api/experience` | GET | 경력 정보 |

## 📝 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

이메일: developer@example.com
GitHub: [yourusername](https://github.com/yourusername)
LinkedIn: [yourusername](https://linkedin.com/in/yourusername)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
