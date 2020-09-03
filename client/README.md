## Docker React App

### docker build

```bash
# dev
$ docker build -f Dockerfile.dev ./

# real
$ docker build -f Dockerfile ./
```

### docker run

```bash
# COPY
$ docker run -it -p 3000:3000 yilpe/docker-react-app

# Volume
$ docker run -it -p 3000:3000 -v /usr/src/app/node_modules -v $(pwd):/usr/src/app yilpe/docker-react-app
```

### docker compose

```yml
# docker-compose.yml

# 도커 컴포즈의 버전
version: "3"

# 이곳에 실행하려는 컨테이너들을 정의
services:
  # 컨테이너 이름
  react:
    # 현 디렉토리에 있는 Dockerfile 사용
    build:
      # 도커 이미지를 구성하기 위한 파일과 폴더들이 있는 위치
      context: .
      # 도커 파일 어떤 것인지 지정
      dockerfile: Dockerfile.dev
    # 포트 맵핑, 로컬 포트 : 컨테이너 포트
    ports:
      - "3000:3000"
    # 로컬 머신에 있는 파일들 맵핑
    volumes:
      - /usr/src/app/node_modules
      - ./:/usr/src/app
    # 리액트 앱을 끌때 필요
    stdin_open: true
```

## Nginx

```dockerfile
# Builder Stage : 빌드 파일들을 생성
FROM node:alpine as builder

WORKDIR "/usr/src/app"

COPY package.json ./

RUN npm install

COPY ./ ./

# CMD [ "npm", "run", "build" ]
RUN npm run build

# Run Stage : Nginx를 가동하고 첫번째 단계에서 생성된 빌드 폴더의 팔일들을 웹 브라우저의 요청에 따라 제공
FROM nginx

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
```

> --from=builder : 다른 Stage에 있는 파일을 복사할때 다른 Stage 이름을 명시

> /usr/src/app/build /usr/share/nginx/html : builder stage에서 생성된 파일들은 `/usr/src/app/build`에 들어가게 되며 그곳에 저장된 파일들을 `/usr/share/nginx/html`로 복사하여 nginx가 웹 브라우저의 http 요청이 올때 마다 알맞은 파일을 전해 줄 수 있게 만든다.

```bash
# Docker Image Build
$ docker build

# Docker Image Run : nginx의 기본 포트는 80
docker run -p 8080:80
```
