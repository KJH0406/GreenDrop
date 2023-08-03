FROM jenkins/jenkins:jdk17

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
COPY /home/ubuntu/application-deploy2.yml ./

EXPOSE 8888

CMD ["nohup", "java", "-jar", "-Dspring.profiles.active=deploy2" , "app.jar", "&"]
