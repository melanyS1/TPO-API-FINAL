# Dockerfile para construir y correr Spring Boot backend

# --- Build stage -----------------------------------------------------------
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /build

# Copiar pom.xml primero para cachear dependencias
COPY pom.xml ./

# Mostrar contenido del directorio
RUN ls -la

# Copiar el código fuente
COPY src ./src

# Mostrar estructura completa
RUN find . -type f

# Construir la aplicación (-DskipTests omite tests en la construcción)
RUN mvn -B clean package -DskipTests -e


# --- Run stage -------------------------------------------------------------
FROM eclipse-temurin:17-jdk-jammy
ARG JAR_FILE=target/*.jar
WORKDIR /app

# copiar el JAR construido desde la etapa de build
COPY --from=builder /build/target/*.jar app.jar

EXPOSE 8080

ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Verificar que el JAR existe
RUN ls -l /app/app.jar

# Iniciar la aplicación con más logs
ENTRYPOINT ["sh", "-c", "echo 'Starting application...' && java $JAVA_OPTS -jar /app/app.jar --debug"]
