# 베이스 이미지로 Node.js 사용
FROM node:21-alpine
# 작업 디렉토리 설정
WORKDIR /app
# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# .env 파일 복사
COPY .env .env

# 모든 소스 코드 복사
COPY . .

# 리액트 애플리케이션 빌드
RUN npm run build

# `serve` 패키지 글로벌 설치
RUN npm install -g serve

# .env 파일의 주석을 무시하고 환경 변수 설정
RUN apk add --no-cache findutils && \
    set -a && \
    grep -v '^#' .env | xargs -d '\n' && \
    set +a

# 컨테이너가 사용할 포트 번호
EXPOSE 3000
# 앱 실행 명령
CMD ["serve", "-s", "build", "-l", "3000"]