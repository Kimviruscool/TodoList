# Vercel 배포 가이드

## 🚀 배포 준비사항

### 1. 필수 파일 확인
현재 프로젝트에는 다음 파일들이 포함되어 있습니다:
- ✅ `vercel.json` - Vercel 배포 설정
- ✅ `package.json` - Node.js 프로젝트 설정
- ✅ `.vercelignore` - 배포 시 제외할 파일들
- ✅ `application-production.properties` - 프로덕션 환경 설정
- ✅ `WebConfig.java` - CORS 및 정적 파일 설정

### 2. 로컬 테스트
배포 전에 로컬에서 정상 작동하는지 확인:
```bash
./gradlew build
./gradlew bootRun
```
`http://localhost:8888`에서 접속 확인

## 🌐 Vercel 배포 방법

### 방법 1: Vercel CLI 사용 (권장)

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **프로젝트 배포**
   ```bash
   vercel
   ```

4. **환경 변수 설정** (Vercel 대시보드에서)
   - `SPRING_PROFILES_ACTIVE` = `production`
   - `PORT` = `8080`

### 방법 2: GitHub 연동

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "Add portfolio website"
   git push origin main
   ```

2. **Vercel 웹사이트에서 GitHub 연동**
   - [vercel.com](https://vercel.com) 접속
   - "Import Project" 클릭
   - GitHub 저장소 선택
   - 자동 배포 설정

## 🔧 배포 후 확인사항

### 1. 웹사이트 접속
- Vercel에서 제공하는 URL로 접속
- 예: `https://your-project.vercel.app`

### 2. API 엔드포인트 테스트
다음 URL들이 정상 작동하는지 확인:
- `https://your-project.vercel.app/api/profile`
- `https://your-project.vercel.app/api/skills`
- `https://your-project.vercel.app/api/projects`
- `https://your-project.vercel.app/api/experience`

### 3. 정적 파일 로딩 확인
- CSS, JS 파일이 정상적으로 로드되는지 확인
- 이미지 및 아이콘이 표시되는지 확인

## ⚠️ 주의사항

### 1. Spring Boot + Vercel 제한사항
- Vercel은 주로 정적 사이트와 서버리스 함수에 최적화됨
- Spring Boot 애플리케이션은 무료 플랜에서 제한적일 수 있음
- 콜드 스타트 시간이 있을 수 있음

### 2. 대안 배포 옵션
Spring Boot 애플리케이션의 경우 다음 플랫폼들도 고려해보세요:
- **Heroku**: Spring Boot에 최적화
- **Railway**: 간단한 배포
- **Render**: 무료 티어 제공
- **AWS/GCP/Azure**: 더 많은 제어권

## 🛠 문제 해결

### 1. 빌드 실패
```bash
# 로컬에서 빌드 테스트
./gradlew clean build -x test
```

### 2. API 응답 오류
- CORS 설정 확인
- `WebConfig.java` 설정 확인

### 3. 정적 파일 로딩 실패
- `application-production.properties` 설정 확인
- 파일 경로 확인

## 📊 성능 최적화

### 1. 이미지 최적화
- WebP 형식 사용
- 적절한 크기로 리사이즈

### 2. CSS/JS 최적화
- 압축된 파일 사용
- CDN 활용

### 3. 캐싱 설정
- 정적 파일 캐싱
- API 응답 캐싱

## 🔄 업데이트 배포

코드 수정 후 재배포:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
# Vercel이 자동으로 재배포
```

또는 CLI로:
```bash
vercel --prod
```

---

💡 **팁**: Vercel 배포가 복잡하다면, 먼저 Heroku나 Railway에서 테스트해보는 것을 권장합니다.
