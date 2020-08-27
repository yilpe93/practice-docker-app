## 도커는 무엇인가?

`컨테이너`를 사용하여 응용 프로그램을 더 쉽게 만들고 배포하고 실행할 수 있도록 설계된 도구 이며 `컨테이너` 기반의 오픈소스 가상화 플랫폼이며 생태계이다.

## 서버에서의 컨테이너 개념

컨테이너 안에 다양한 프로그램, 실행환경을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포 및 관리를 단순하게 해준다.
일반 컨테이너의 개념에서 물건을 손쉽게 운송 해주는 것 처럼 프로그램을 손쉽게 이동 배포 관리를 할수 있게 해준다.
AWS, Azure, Google cloud 등 어디에서든 실행 가능하게 해준다.

## 도커 이미지와 컨테이너 정의

`컨테이너`는 코드와 모든 종속성을 패키지화하여 응용 프로그램이 한 컴퓨팅 환경에서 다른 컴퓨팅 환경으로 빠르고 안정적으로 실행되도록 하는 소프트웨어의 표준 단위이다.

여러가지 방향으로 컨테이너를 정의할때 간단하고 편리하게 프로그램을 실행 시켜주는 것으로 정의를 내리고 있다.

`컨테이너 이미지`는 코드, 런타임, 시스템 도구, 시스템 라이브러리 및 설정과 같은 **응용 프로그램을 실행하는데 필요한 모든 것을 포함**하는 가볍고 독립적으로 실행 가능한 소프트웨어 패키지이다.

또한, 컨테이너 이미지는 런타임에 컨테이너가 되고 도커 컨테이너의 경우 도커 엔진에서 실행될 때 이미지가 컨테이너가 된다.

리눅스와 윈도우 기반 애플리케이션 모두에서 사용할 수 있는 컨테이너화된 소프트웨어는 인프라에 관계없이 항상 동일하게 실행된다.

컨테이너는 소프트웨어를 환경으로부터 격리시키고 개발과 스테이징의 차이에도 불구하고 균일하게 작동하도록 보장한다.

`도커 이미지는 프로그램을 실행하는데 필요한 설정이나 종속성을 갖고 있으며 도커 이미지를 이용해서 컨테이너를 생성하며 도커 컨테이너를 이용하여 프로그램을 실행한다.`

## 도커 사용법

1. 도커 CLI에 컨맨드 입력
2. 그러면 도커 서버(도커 Daemon)가 그 커맨드를 받아서 그것에 따라 이미지를 생성하든 컨테이너를 실행하든 모든 작업을 한다.

### CLI에서 커맨드를 입력

```bash
$ docker run hello-world
```

1. 도커 클라이언트에 커맨드를 입력하면 클라이언트에서 도커 서버로 요청을 보냄

2. 서버에서 hello-world라는 이미지가 이미 로컬에 cache가 되어 있는지 확인

3. 현재는 없기에 Unable to find image ~ 라는 문구가 표출

4. `Docker Hub`라는 이미지가 저장되어 있는 곳에 가서 해당 이미지를 가져오고 로컬에 Cache로 보관

5. 그 후 이미지가 있으니 그 이지를 이용해서 컨테이너를 생성

6. 그리고 이미지로 생성된 컨테이너는 이미지에서 받은 설정이나 조건에 따라 프로그램을 실행

### 도커와 VM(가상화 기술) 비교

VM과 비교했을 때 컨테이너는 하이퍼 바이저와 게스트 OS가 필요하지 않으므로 더 가볍다.

어플리케이션을 실행할 때는 컨테이너 방식에서는 호스트 OS위에 어플리케이션의 실행 패키지인 이미지를 배포하기만 하면 되는데, VM은 어플리케이션을 실행 하기 위해서 VM을 띄우고 자원을 할당한 다음, 게스트 OS를 부팅하여 어플리케이션을 실행 해야 해서 훨씬 복잡하고 무겁게 실행을 해야한다.

---

> `도커 컨테이너`에서는 돌아가는 어플리케이션은 컨테이너가 제공하는 격릴 기능 내부에 샌드박스가 있지만, 여전히 같은 호스트의 다른 컨테이너와 **동일한 커널을 공유**한다. 결과적으로, 컨테이너 내부에서 실행되는 프로세스는 호스트 시스템(모든 프로세스를 나열할 수 있는 충분한 권한이 있음)에서 볼 수 있다.
>
> 예를 들어, 도커와 함께 몽고DB 컨테이너를 시작하면 호스트의 일반 쉘에 ps-e grep 몽고를 실행하면 프로세스가 표시된다. 또한, 컨테이너가 전체 OS를 내장할 필요가 없는 결과, 그것들은 매우 가볍고 일반적으로 약 5 - 100MB 이다.

> `가상 머신`과 함께 VM 내부에서 실행되는 모든 것은 호스트 운영 체제 또는 하이퍼바이저와 독립되어 있다. 가상 머신 플랫폼은 특정 VM에 대한 가상화 프로세스를 관히라기 위해 프로세스를 시작하고 호스트 시스템은 그것의 하드웨어 자원의 일부를 VM에 할당한다. 그러나 VM과 근본적으로 다른 것은 시간에 이 VM 환경을 위해 새롭고 이 특정 VM만을 위한 커널을 부팅하고 운영체제 프로세스 세트를 시작한다는 것이다. 이것은 응용 프로그램만 포함하는 일반적인 컨테이너보다 VM의 크기를 훨씬 크게 만든다.

### 어떻게 해서 도커 컨테이너를 겨리를 시키나?

먼저 리눅스에서 쓰이는 Cgroup(control groups)과 네임스페이스(namespaces)에 대해서 알아야 한다.

이것들은 컨테이너와 호스트에서 실행되는 다른 프로세스 사이에 벽을 만드는 리눅스 커널 기능들이다.

#### C Group

CPU, 메모리, Network Bandwith, HD i/o등 프로세스 그룹의 시스템 리소스 사용량을 관리

어떤 어플이 사용량이 너문 많다면 그 어플리케이션 같은 것을 C group에 집어 넣어서 CPU와 메모리 사용 제한 가능

#### 네임스페이스

하나의 시스템에서 프로세스를 격리시킬 수 있는 가상화 기술

별도의 독립된 공간을 사용하는 것처럼 격리된 환경을 제공하는 경량 프로세스 가상화 기술

---

## 도커 이미지로 컨테이너 만들기

> `이미지`는 응용 프로그램을 실행하는데 필요한 모든 `필요한 것`을 포함하고 있다.

### 이미지로 컨테이너 만드는 순서

1. Docker 클라이언트에 `docker run <이미지>` 입력

2. 도커 이미지에 있는 파일 스냅샷을 컨테이너 하드 디스크에 옮겨 준다.

### 이미지 내부 파일 시스템 구조

> \$ docker run <이미지 이름> ls

- docekr : 도커 클라이언트 언급
- run : 컨테이너 생성 및 실행
- 이미지 이름 : 이 컨테이너를 위한 이미지
- ls : ls 커맨드는 현재 디렉토리의 파일 리스트 표출 (해당 옵션의 자리는 이미지가 가지고있는 시작 명령어를 무시하고 커맨트를 실행하게 함)

### 컨테이너 나열하기

```bash
# ps : process status
$ docker ps
```

- CONTAINER ID : 컨테이너의 고유한 아이디 해쉬갑. 실제로는 더욱 길지만 일부분만 표출.

- IMAGE : 컨테이너 생성시 사용한 토커 이미지.

- COMMAND : 컨테이너 시작시 실행될 명령어. 대부분 이미지에 내장되어 있으므로 별도 설정이 필요 X.

- CREATED : 컨테이너가 생성된 시간.

- STATUS : 컨테이너의 상태입니다. 실행중은 Up, 종료는 Exited, 일시정지 Pause.

- NAMES : 컨테이너 교유한 이름. 컨테이너 생성시 `--name 옵션`으로 이름을 설정하지 않으면 도커 엔진이 임의로 형용사와 명사를 조합해 설정. id와 마찬가지로 중복이 안되고 docker rename 명령어로 이름을 변경할 수 있다.

  ```bash
  $ docker rename [original-name] [changed-name]
  ```

#### 원하는 항목만 보기

```bash
$ docker ps --format 'table{{.Names}}\table{{.Image}}'
```

#### 모든 컨테이너 나열

```bash
$ docker ps -a
```

## 도커 컨테이너의 생명주기

> `생성(Create) - 시작(Start) - 실행(Running)` - 중지(Stopped) - 삭제(Deleted)

```bash
# 생성
$ docker create <이미지 이름>

# 시작,
$ docker start <시작할 컨테이너 아이디/이름>
# 옵션 -a (attach) : output을 화면에 표출
$ docker start -a <시작할 컨테이너 아이디/이름>

# 실행 = (생성 + 시작)
$ docker run <이미지 이름>

# 중지
$ docker stop <중지할 컨테이너 아이디/이름>
$ docker kill <중지할 컨테이너 아이디/이름>

# 삭제
$ docker rm <삭제할 컨테이너 아이디/이름>

# 모든 컨테이너 삭제
$ docker rm `docker ps -a -q`

# 도커 이미지 삭제
$ docker rmi <이미지 id>

# 한번에 컨테이너, 이밎, 네트워크 모두 삭제
$ docker system prune
```

### Stop과 Kill의 차이점

- `Stop`은 Gracefully하게 중지를 시킨다.

  정리하는 시간을 주어 그동안 하던 작업들을(메시지를 보내고 있었다면 보내고 있던 메시지) 완료하고 컨테이너를 중지 시킨다.

- `Kill`의 경우는 Stop과 달리 어떠한 것도 기다리지 않고 바로 컨테이너를 중지 시킨다.

### 한번에 컨테이너, 이밎, 네트워크 모두 삭제

> \$ docker system prune

- 도커를 쓰지 않을때 모두 정리하고 싶을때 사용해주면 좋음
- 이것도 실행중인 컨테이너에는 영향을 주지 않음

## 실행중인 컨테이너에 명령어 전달

> \$ docker exec <컨테이너 아이디>

> \$ docker exec -it <컨테이너 아이디> <명령어>

`-it`를 붙여줘야 명령어를 실행한 후 계속 명령어를 적을 수 있다.

### **docker run** vs **docker exec**

- docker run은 `새로 컨테이너`를 만들어서 실행
- docker exec은 이미 `실행중인 컨테이너`에 명령어 전달

## 컨테이너를 쉘 환경으로 접근

1. 두개의 터미널을 실행 후, alpine 이미지를 이용하여 컨테이너 실행

   ```
   $ docker run alpine ping localhost
   ```

2. 두번째 터미널에서 exec을 이용하고 마지막 명령어 부분에 `sh`를 입력후 컨테이너 안에서 터미널 환경을 구축

   ```
   $ docker exec -it <컨테이너 아이디> sh
   ```

3. 그 안에서 여러가지 터미널에서 원래 할 수 있는 작동을 한다.

   위 터미널에서 빠져나오려면 `ctrl + D`

## 도커 이미지 생성 순서

1. `Dockerfile` 작성,

   `Docker File`이란 Docker Image를 만들기 위한 설정 파일이며, 컨테이너가어떻게 행동해야 하는지에대한 설정들을 정의

2. 도커 클라이언트

   도커 파일에 입력된 것들이 도커 클라이언트에 전달되어야 한다.

3. 도커 서버

   도커 클라이언트에 전달된 모든 중요한 작업들을 하는 곳

4. 이미지 생성

## 도커 파일 만들기

> 도커 이미지를 만들기 위한 설정 파일이며, 컨테이너가 어떻게 행동해야 하는지에 대한 설정들을 정의해 주는 곳이다.

### 도커 파일 만드는 순서 (도커 이미지가 필요한 것이 무엇인지 생각)

1. 베이스 이미지를 명시 (파일 스냅샷에 해당)

2. 추가적으로 필요한 파일을 다운 받기 위한 몇가지 명령어를 명시해준다. (파일 스냅샷에 해당)

3. 컨테이너 시작시 실행 될 명령어를 명시해준다. (시작시 실행 될 명령어에 해당)

#### 베이스 이미지?

도커 이미지는 여러개의 레이어로 되어있다.

그중에서 베이스 이미즈는 이 이미지의 기반이 되는 부분이다.

대게 OS라 생각하면 된다.

## "helow 출력하기" 순서

1. 프로젝트 폴더 내 `dockerfile`이라는 이름으로 파일을 생성

2. 위 파일 안에 어떻게 진행해 나갈지 기본적인 토대를 명시

```dockerfile
# 베이스 이미지를 명시
FROM baseImage

# 추가적으로 필요한 파일들을 다운로드
RUN command

# 컨테이너 시작시 실행 될 명령어 명시
CMD ["executable"]
```

3. 베이스 이미지부터 실제 값으로 추가

4. 베이스 이미지는 프로젝트 사이즈에 따라 고려

   ubuntu를 써도 되고 centos등을 써도 되지만, hello를 출력하는 기능만을 사용할 것이기에 굳이 사이즈가 큰 베이스 이미지를 쓸 필요가 없기에 사이즈가 작은 alpine 베이스 이미지 사용

5. hello 문자를 출력해주기 위해 echo를 사용하여야 하는데 이미 alpine 안에 echo를 사용하게 할수 있는 파일이 있기에 해당 부분에서 RUN은 생략

6. 마지막으로 컨테이너 시작시 실행 될 명령어 echo hello 작성

```dockerfile
# 베이스 이미지를 명시
FROM alpine

# 컨테이너 시작시 실행 될 명령어 명시
CMD ["echo", "hello"]
```

7. 도커 파일을 통해 이미지 생성(build)

   도커 파일에 입력된 것들이 도커 클라이언트에 전달되어서 도커 서버가 인식하게 한다.

   ```bash
   $ docekr build ./
   # or
   $ docker build .
   ```

   - 해당 디렉토리 내에서 dockerfile 파일을 찾아서 도커 클라이언트에 전달시켜준다.

   - docker build ./ 와 . 는 둘다 현재 디렉토리를 가르킨다.

8. run 이미지

   ```bash
   $ docker run -it dbde2256070e
   hello
   ```

- `FROM` : 이미지 생성시 기반이 되는 이미지 레이어

  <이미지 이름> : <태그> 형식으로 작성

  태그를 안붙이면 자동적으로 가장 최신것으로 다운

  ex) ubuntu: 14.04

- `RUN` : 도커 이미지가 생성되기 전에 수행할 쉘 명령어

- `CMD` : 컨테이너가 시작되었을 때 실행할 실행 파일 또는 쉘 스크립트이다.

  해당 명령어는 DockerFile내 1회만 쓸 수 있다.

### 도커 이미지에 이름 주는 방법

> docker build -t <나의 도커 아이디>/<저장소/프로젝트 이름>:<버전> ./

```bash
# 이미지 명명하여 생성
$ docker build -t yilpe/hello:latest ./

# 명명한 이미지로 실행
$ docker run yilpe/hello
hello
```

## Docker Compose 란?

`Docker Compose`는 다중 컨테이너 도커 어플리케이션을 정의하고 실행하기 위한 도구이다.

---

### 하이퍼 바이저

호스트 시스템에서 다수의 게스트 OS를 구동할 수 있게 하는 소프트웨어, 그리고 하드웨어를 가상화하면서 하드웨어와 각각의 가상화 기술(VM)을 모니터링 하는 중간 관리자이다.

#### 네이티브 하이퍼 바이저

> 하드웨어 -> 하이퍼 바이저 -> OS

하이퍼 바이저가 하드웨어를 직접 제어하기에 자원을 효율적으로 사용 가능 하며, 별도의 호스트 OS가 없으므로 오버헤드가 적다. 다만, 여러 하드웨어 드라이버를 세팅해야 하므로 설치가 어렵다.

#### 호스트형 하이퍼 바이저

> 하드웨어 -> 호스트 OS -> 하이퍼 바이저 -> 게스트 OS

일반적인 소프트웨어처럼 호스트OS 위에서 실행되며, 하드웨어 자원을 VM 내부의게스트 OS에 에뮬레이트 하는 방식으로 오버헤드가 크다. 다만, 게스트OS 종류에 대한 제약이 없고 구현이 다소 쉽다. `일반적오르 많이 이용하는 방법!`

#### VM의 어플리케이션 실행 과정

VM을 먼저 띄우고 게스트 OS 부팅 후 어플리케이션 실행

---

[Window 10 Home에 Docker Desktop 설치하기](https://blog.sapzil.org/2019/06/09/docker-desktop-for-windows-home/)

[docker for windows 설치 및 문제 해결](https://blog.gaerae.com/2019/04/docker-for-windows-troubleshooting.html)

<!-- ---

## Windows 10 Home에 Docker Desktop 설치하기

Docker Desktop for Windows를 설치하려면 Hyper-V를 지원하는 OS가 필요하다. Home은 여기에 포함되지 않으므로, VirtualBox 기반의 레거시 Docker Toolbox를 사용하라고 나와있다.

다만 최신버전을 쓰기 위해서는 [Docker 포럼](https://forums.docker.com/t/installing-docker-on-windows-10-home/11722/29)과 같이 설정한다.

### 1단계: Hyper-V 설치

아래 스크립트를 `.bat` 확장자 파일로 저장한 다음 관리자 권한으로 실행

```bat
pushd "%~dp0"
dir /b %SystemRoot%\servicing\Packages\*Hyper-V*.mum >hyper-v.txt
for /f %%i in ('findstr /i . hyper-v.txt 2^>nul') do dism /online /norestart /add-package:"%SystemRoot%\servicing\Packages\%%i"
del hyper-v.txt
Dism /online /enable-feature /featurename:Microsoft-Hyper-V -All /LimitAccess /ALL
pause
```

Home에서 지원하지 않는 Hyper-V 설치 후 재부팅한다.

### 2단계: Docker 인스톨러의 윈도우 에디션 체크 우회

Hyper-V를 켜도 Docker 인스톨러가 지원하는 윈도우 버전인지 확인하기 때문에 우회가 필요

레지스트리(regedit) 편집기를 열어 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion`의 경로를 찾아 들어가 키 네임이 EditionID의 데이터를 `Core -> Professional` 로 수정한다.

이후 인스톨러 실행하면 설치가 잘 되는것을 확인할 수 있따. 설치가 끝난 후 EditionID의 데이터 값은 원복해준다.

--- -->
