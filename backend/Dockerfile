FROM jenkins/jenkins:jdk17

COPY backend/build/libs/common-0.0.1-SNAPSHOT.jar app.jar
COPY application-deploy2.yml ./

EXPOSE 8888

CMD ["nohup", "java", "-jar", "-Dspring.profiles.active=deploy2" , "app.jar", "&"]
