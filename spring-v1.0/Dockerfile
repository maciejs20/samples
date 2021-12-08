FROM gradle:latest AS builder
RUN mkdir app
ADD SpringHelloWorld.zip app/
WORKDIR app
RUN unzip SpringHelloWorld.zip
WORKDIR SpringHelloWorld
RUN rm src/main/java/com/amw/labs/SpringHelloWorld/SpringHelloWorldApplication.java
COPY SpringHelloWorldApplication.java src/main/java/com/amw/labs/SpringHelloWorld/Application.java
RUN gradle build
RUN ls -la
RUN ls -la build
RUN ls -la build/libs/
RUN ls -la /home/gradle/app/SpringHelloWorld/build/libs/SpringHelloWorld-0.0.1-SNAPSHOT.jar

 
FROM openjdk:8-jdk-alpine AS run
COPY --from=builder /home/gradle/app/SpringHelloWorld/build/libs/SpringHelloWorld-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
