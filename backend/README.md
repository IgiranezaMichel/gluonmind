# Gluonmind Backend

Java 21 Spring Boot backend with JWT auth, MongoDB storage, email notifications, and CMS endpoints.

## Run

1. Set env vars:
   - `MONGODB_URI` (default `mongodb://localhost:27017/gluonmind`)
   - `JWT_SECRET` (32+ chars)
   - `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM`

2. Start:
```bash
mvn spring-boot:run
```

Swagger UI: `http://localhost:8000/swagger-ui.html`
OpenAPI JSON: `http://localhost:8000/v3/api-docs`

## Test
```bash
mvn test
```

Default admin:
- username: `superadmin`
- password: `superadmin`

Change via env vars `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
