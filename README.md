# AdvertisingService

ASP.NET Core 8 Web API using Dapper and SQL Server with JWT authentication.

Quick start

- Update the connection string in `backend/appsettings.json` (`ConnectionStrings:DefaultConnection`).
- Update `Jwt:Key` in `backend/appsettings.json` to a secure random value for production.
- From project folder run:

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

Database

- Run the SQL script at `Scripts/CreateTables.sql` against your SQL Server to create `Users` and `Services` tables.

API Endpoints

- `POST /api/account/register` — register a user
- `POST /api/account/login` — login and receive JWT
- `POST /api/account/logout` — logout (stateless — token revocation must be added)
- `GET /api/services` — (auth) list services
- `GET /api/services/{id}` — (auth) get service
- `POST /api/services` — (auth) create service
- `PUT /api/services/{id}` — (auth) update service
- `DELETE /api/services/{id}` — (auth) delete service

Swagger

- Swagger UI is available in Development environment. Use the "Authorize" button to provide `Bearer {token}`.

Docker

- Build and run the app with SQL Server using Docker Compose:
  ```bash
  docker compose up --build
  ```
- The API will be available at `http://localhost:5000` and SQL Server at `localhost:1433`.
- On startup, the `backend/Scripts/CreateTables.sql` script is mounted and executed automatically by the `db-init` service.

Files

- See the `backend/Controllers`, `backend/Services`, `backend/Repositories`, `backend/Models`, `backend/DTOs`, `backend/Data`, `backend/Middleware`, and `backend/Extensions` folders for implementation.
# AdvertisingService
A service for small businesses to advertise their services
