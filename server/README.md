## 도커 이미지 생성시 npm install 에러가 발생하는 이유

- 어플리케이션에 필ㅇ한 종속성을 다운받아 준다.
- 이렇게 다운 받을때 먼저 package.json을 보고 그곳에 명시된 종속성들을 다운받아서 설치해준다.
- 하지만 package.json이 컨테이너 안에 없기에 찾을수 없다는 에러가 발생하게 된다.

위의 이유때문에 `COPY`를 이용해서 package.json을 컨테이너 안으로 넣어준다.

```dockerfile
FROM node:10

# COPY package.json ./

# 모든 파일 복사
COPY ./ ./

RUN npm install

CMD ["node", "index.js"]
```

```bash
$ docker run yilpe/nodejs:latest
Server is running
```

위와 같이 docker build하면 이미지를 생성 후 컨테이너 실행 시, 해당 8080 port에 접근할 수 없는 것을 확인할 수 있다.

이를 해결하기 위해서는 docker run 명령시 -p 옵션을 통해 로컬호스트 네트워크(49160)과 컨테이너 :8080 포트를 맵핑 시켜주어야 한다.

```bash
$ docker run -p 49160:8080 <이미지 이름>
```

## WORKING DIRECTORY 명시해주기

도커 파일에 이 `WORKDIR`이라는 부분을 추가해주어야 한다.

```dockerfile
# Create app directory
WORKDIR /urs/src/app
```

이미지 안에서 어플리케이션 소스 코드를 갖고 있을 디렉토리를 생성하는 것이다.

### WORKDIR를 지정하지 않고 그냥 COPY할때 생기는 문제점

1. 혹시 이 중에서 원래 이미지에 있던 파일과 이름이 같다면?

   ex) 베이스 이미지에 이미 home이라는 폴더가 있고 COPY를 하므로서 새로 추가되는 폴더 중에 home이라는 폴더가 있다면 중복이 되므로 원래있던 폴더가 덮어 씌어져 버린다.

2. 모든 파일이 한 디렉토리에 들어가 버리니 정리가 안되어있다.

위와 같은 이유로 **모든 어플리케이션을 위한 소스들은 WORKDIR를 따로 만들어서 보관**한다.

### WORKDIR 만드는 방법

```dockerfile
FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD ["node", "index.js"]
```

## 효율적으로 npm install 하기

아래와 같이 캐시를 이용하여 모듈에 변화가 생길때만 다시 다운 받아주며, 소스 코드에 변화가 생길때 모듈을 다시 받는 현상을 없애 줄 수 있다.

```dockerfile
# ...

COPY package.json ./

RUN npm install

COPY ./ ./

# ...
```

## Docker Volume 이란?

Docker build를 통해서 로컬 -> 도커 컨테이너로 복사하는 구조가 아닌,
도커 컨테이너 -> 로컬 파일을 맵핑하도록 한다.

### Volume 사용해서 어플리케이션 실행하는 방법

> docker run -p 5000:8080 -v /usr/src/app/node_modules -v \$(pwd):/usr/src/app <이미지 아이디>

- `-v /usr/src/app/node_modules` : 호스트 디렉토리에 node_module은 없기에 컨테이너에 맵핑을 하지 말라고 하는 것

- `-v $(pwd):/usr/src/app` : pwd 경로에 있는 디렉토리 혹은 파일을 /usr/src/app 경로에서 참조

- **pwd** : 현재 작업 중인 디렉터리의 이름을 출력

Mac 기준 `$(pwd)` / Windows 기준 `%cd%` 으로 사용

---

## 레디스란?

Redis(REmote Dictionary Server)는 메모리 기반의 key-value 구조의 데이터 관리 시스템이며, 모든 데이터를 메모리에 저장하고 빠르게 조회할 수 있는 비관계형 데이터베이스(NoSql)이다.

### 레디스를 쓰는 이유?

메모리에 저장을 하기 때문에 Mysql같은 데이터베이스에 데이터를 저장하는 것과 데이터를 불러올때 훨씬 빠르겟 처리할 수 있으며, 비록 메모리에 저장하지만 영속적으로 보관이 가능하다. 그렇기에 서버를 재부팅해도 데이터를 유지할 수 있는 장점이 있다.

### Node.js 환경엣 Redis 사용 방법

- redis-server 작동
- redis 모듈 다운
- `redis.createClient()`를 통해 레디스 클라이언트 생성,

  redis server가 작동하는 곳과 Node.js 앱이 작동하는 곳이 다르기에 host 인자와 port 인자를 명시해주어야 한다.

  ```javascript
  const redis = require("redis");

  const client = redis.createClient({
    host: "https://redis-server.com",
    port: 6379,
  });
  ```

  redis의 기본 port 번호는 `6379` 이며, redis 서버가 작동하는 곳에 따라 host를 변경해야 하며 기본적으로 `https://redis-server.com` 이다.

### 도커 환경에서 레디스 클라이언트 생성시 주의사항

도커 Compose를 사용할 때는 host 욥션을 docker-compose.yml 파일에 명시한 컨테이너 이름으로 주어야 한다.

```javascript
const redis = require("redis");

const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});
```

서로 다른 컨테이너에 있어 컨테이너 사이에 아무런 설정 없이는 접근할 수 없기에 Node.js 앱에서 레디스 서버에 접근할 수 없다.

멀티 컨테이너 상황에서 쉽게 네트워크를 연결 시켜주기 위해서 `Docker Compose`를 이용하면 된다.

### Docker Compose 파일 작성하기

현재 프로젝트에 `docker-compose.yml` 파일 생성 후

```dockerfile
# 도커 컴포즈의 버전
version: "3"

# 이곳에 실행하려는 컨테이너
services:
  # 컨테이너 이름
  redis-server:
    # 컨테이너에서 사용하는 이미지
    image: "redis"
  # 컨테이너 이름
  node-app:
    # 현 디렉토리에 있는 Dockerfile
    build: .
    # 포트 맵핑 => 로컬 포트:컨테이너 포트
    ports:
      - "5000:8080"
```

터미널을 두개 킨 후 하나는

redis 서버에 대한 컨데이너 실행

```bash
$ docker run redis
```

다란 하나에서는 현재 프로젝트 실행

```bash
$ docker-compose up
```

> docker-compose up : 이미지가 없을 때 이미지를 빌드하고 컨테이너 실행
> docker-compose up --build : 이미지가 있든 없든 이미지를 빌드하고 컨테이너 실행

```bash
# -d : detached 모드로서 앱을 백그라운드에서 실행시킨다.
$ docker-compose up -d --build
```
