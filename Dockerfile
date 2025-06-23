# Use a lightweight Java runtime
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/optra-hr-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8082

# Command to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
