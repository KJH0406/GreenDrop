# [B103] Green Drop

Green Drop 프로젝트는 Docker, Docker Compose, 그리고 Jenkins Pipeline을 활용한 CI/CD 자동화 환경을 구성하고 있습니다.

Gitlab의 Webhook 설정으로 인해 Push 또는 Merge 이벤트 발생 시, Jenkins Pipeline을 통해 자동 빌드와 배포가 이루어집니다.

프론트엔드 부분은 npm 환경에서 빌드하고 배포합니다.

백엔드는 Gradle을 사용하여 빌드하며, Docker Compose를 통해 컨테이너를 관리하고 배포합니다.


## Version

### Frontend

| Type             | Version |
| ---------------- | ------- |
| Node.js          | 18.16.1 |
| React.js         | 18.2.0  |
| Axios            | 1.4.0   |
| React-bootstrap  | 2.8.0   |
| Redux-toolkit    | 1.9.5   |
| react-query      | 3.39.3  |
| react-router-dom | 6.14.1  |
| react-apexcharts | 1.4.1   |
| react-calendar   | 4.6.0   |
| serialport       | 11.0.1  |
| react-slick      | 0.29.0  |
| VsCode           | 1.8.1   |

### Backend

| Type              | Version          |
| ----------------- | ------------     |
| Java              | openjdk : 17.0.7 |
| Spring Boot       | 3.0.8            |
| Gradle            | 7.6.1            |
| Spring Security   | 6.0.x            |
| JPA & QueryDsl    | -                |
| Hibernate         | -                |
| IntelliJ Ultimate | 2023.1.3

### Embedded

| Type       | Version   |
| ---------- | --------- |
| Ubuntu     | 22.04     |
| Python     | 3.7.3     |
| Tensorflow | 2.4.0     |
| OpenCV     | 47.1.0.25 |
| Flask      | 2.2.5     |
| Pycharm    | 2023.2    |

### Database

| Type            | Version |
| --------------- | ------- |
| MySQL           | 8.0.33  |
| MySQL Workbench | 8.0 CE  |


## Nginx Port forwarding

| Port   | Content     |
| ------ | ----------- |
| 22     | SSH         |
| 80     | HTTP        |
| 443    | HTTPS       |
| 3306   | MySQL       |
| 8000   | API Gateway |
| 9090   | Jenkins     |
| 8888   | AI          |
| 3000   | React       |


## Docker And Docker Compose Install

https://docs.docker.com/engine/install/ubuntu/


## Nginx Install

```sh
# Nginx 설치
$ sudo apt update
$ sudo apt install nginx

# Nginx 시작
$ sudo service nginx start
```


## SSL/TSL Install / Apply

### snapd. core

```sh
# snap을 이용하여 core 설치 -> snap을 최신 버전으로 유지하기 위해 설치
$ sudo snap install core

# core를 refresh 해준다.
$ sudo snap refresh core
```

### SSL 설치 및 설정

```sh
# 기존에 잘못된 certbot이 설치되어있을 수도 있으니 삭제 해준다.
$ sudo apt remove certbot

# certbot 설치
$ sudo snap install --classic certbot

# certbot 명령을 로컬에서 실행할 수 있도록 snap의 certbot 파일을 로컬의 cerbot과 링크(연결) 시켜준다. -s 옵션은 심볼릭링크를 하겠다는 것.
$ ln -s /snap/bin/certbot /usr/bin/certbot

# certbot 설정
sudo certbot --nginx
```

### SSL  갱신

```sh
certbot renew
```


## Nginx Config

```sh
server {
    if ($host = i9b103.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    server_name i9b103.p.ssafy.io;
    listen 80;
    return 404;
}

server {
    listen 443 ssl;
    server_name i9b103.p.ssafy.io;

    ssl_certificate /etc/letsencrypt/live/i9b103.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i9b103.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        root /jenkins/workspace/FE-pipeline/frontend/build;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
    }


    location /api {
        proxy_pass http://localhost:8000/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_ssl_verify off;
    }
}
```

### frontend 권한 설정

```sh
sudo chmod -R 755 index.html
```


## Environment Variables

### Backend

- application.yml 은 aws server 안에서 vim 으로 작성 후 docker-image 와 함께 띄워서 사용하여,
  mysql은 따로 docker-image로 올리지 않았습니다.
- mysql 172.26.7.105 IP 주소로 외부접속 허용

```sh
# application.yml
debug: false
management.endpoints.web.exposure.include: "*"

logging:
    level:
        com.ssafy.common: debug
        org.springframework.web.service: debug
        org.hibernate.type.descriptor.sql.BasicBinder: trace

server:
    port: 8000

spring:
    pid:
        file: spring.pid
    datasource:
        url: jdbc:mysql://i9b103.p.ssafy.io:3306/commonpjt?useSSL=false&serverTimezone=Asia/Seoul&characterEncoding=UTF-8
        username: root
        password: pjtcommonteam3Greendrop@protecting@the@earth
        driver-class-name: com.mysql.cj.jdbc.Driver
    jpa:
        database: mysql
        defer-datasource-initialization: true
        hibernate.ddl-auto: none
        show-sql: false
        properties:
            hibernate.format_sql: true
            hibernate.default_batch_fetch_size: 100
    sql.init.mode: always
    data.rest:
        base-path: /api

jwt:
    secret-key: NiOeyFbN1Gqo10bPgUyTFsRMkJpGLXSvGP04eFqj5B30r5TcrtlSXfQ7TndvYjNvfkEKLqILn0j1SmKODO1Yw3JpBBgI3nVPEahqxeY8qbPSFGyzyEVxnl4AQcrnVneI
    expiration-hours: 3
    issuer: chunjh1103
```

### Database ERD

link : https://www.erdcloud.com/d/RTYgzhRmjXqdDoYvu

## deploy.sh

### Frontend

```Sh
sudo service nginx restart
```


## Docker : Dockerfile

Dockerfile은 git에 작성하지 않고 aws server 내부에 vim으로 작성 후 사용하였습니다.

### Backend

```sh
FROM jenkins/jenkins:jdk17

COPY backend/build/libs/common-0.0.1-SNAPSHOT.jar app.jar
COPY application.yml /config/application.yml

EXPOSE 8000

ENTRYPOINT ["sh", "-c", "nohup java -jar -Dspring.config.location=/config/application.yml app.jar"]
```


## Docker Compose : docker-compose.yml

```sh
version: '3'

services:
    jenkins:
        image: jenkins/jenkins:jdk17
        container_name: jenkins
        environment:
            - TZ=Asia/Seoul
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
            - /jenkins:/var/jenkins_home
            - /usr/bin/docker:/usr/bin/docker
        ports:
            - "9090:8080"
        user: root

    nginx:
        restart: always
        container_name: nginx
        ports:
            - "3000:80"
        user: root
        image: nginx
        environment:
            - TZ=Asia/Seoul
```


## Jenkins

jenkins admin ID : common-pjt-samjo-admin
jenkins admin password : qovhentlrksWowlrma11tldi

### Jenkins Job

- FE-pipeline
- imporve-pipeline 

### Jenkins file

Jenkins file git에 작성하지 않고, Jenkins 내부에 pipeline을 직접 작성하였다.

#### Frontend

```sh
pipeline{
    agent any
    
    stages{

        stage('Git-clone'){
            steps {
                git branch: 'develop', credentialsId: '6b20ffd1-0f04-4f2b-9363-4dc91dbcfc35', url: 'https://lab.ssafy.com/s09-webmobile3-sub2/S09P12B103.git'
            }
        }

        stage('FE-build') {
            steps {
                dir("./frontend") {
                    nodejs(nodeJSInstallationName: 'NodeJS 18.16.1') {
                        sh 'npm install && npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['caeaf159-7ae2-46b1-bb02-d5efb8a0a9b4']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@i9b103.p.ssafy.io uptime
                        scp /var/jenkins_home/workspace/FE-pipeline/frontend/dist.tar ubuntu@i9b103.p.ssafy.io:/home/ubuntu
                        ssh -t ubuntu@i9b103.p.ssafy.io ./deploy-fe.sh
                    '''
                }
            }
        }
        
    }
    
}
```

### Backend

- docker container name : start_java
- docker image name : common

```sh
pipeline {
    agent any
    
    stages {
        
        stage('Git Clone') {
            steps {
                git branch: 'develop', credentialsId: '6b20ffd1-0f04-4f2b-9363-4dc91dbcfc35', url: 'https://lab.ssafy.com/s09-webmobile3-sub2/S09P12B103.git'
            }
        }

        stage('BE-Build') {
            steps {
                dir("./backend") {
                    sh 'chmod +x gradlew'
                    sh  './gradlew clean build'

                }
            }
        }

        stage('Dockerize') {
            steps {
                sh '''
                    docker stop start_java || true
                    docker rm start_java || true
                    docker rmi common || true
                    docker build -t common .
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker run --log-opt max-size=10m --log-opt max-file=3 -d --name start_java -e TZ=Asia/Seoul -p 8000:8000 common'
            }
        }
        
    }
}
```
