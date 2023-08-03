FROM jenkins/jenkins:jdk17

ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8888
	
CMD ["nohup", "java", "-jar", "app.jar", "-Dspring.config.location=/var/jenkins_home/workspace/imporve-pipeline/application.yml", "&"]
