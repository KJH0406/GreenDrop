FROM jenkins/jenkins:jdk17

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8888
	
CMD ["nohup", "java", "-jar", "-Dspring.profiles.active=deploy2", "app.jar", "-Dspring.config.location=application-deploy2.yml", "&"]
