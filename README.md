# SAETA 4

**Sistema de Alto Rendimiento Deportivo Digital** — Plataforma 360° de gestión integral deportiva.

SAETA conecta todas las áreas que intervienen en el desarrollo de un jugador:
Jugador ←→ Entrenador ←→ Preparador Físico ←→ Nutricionista ←→ Área Médica ←→ Coordinación

## Tech Stack

- **Framework**: NestJS 11 (TypeScript)
- **Database**: PostgreSQL + TypeORM
- **Auth**: JWT (Passport)
- **Docs**: Swagger/OpenAPI

## Prerequisites

- Node.js v18+
- PostgreSQL 14+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Copy env and configure database
cp .env.example .env
# Edit .env with your PostgreSQL credentials

# Start in development mode
npm run start:dev
```

The API runs at `http://localhost:3000`. Swagger docs at `http://localhost:3000/api/docs`.

## API Modules

| Module              | Endpoint              | Description                                      |
| ------------------- | --------------------- | ------------------------------------------------ |
| Auth                | `/auth`               | Register & login (JWT)                           |
| Dashboard           | `/dashboard`           | Overview stats, goals by team, attendance trends |
| Teams               | `/teams`              | CRUD de equipos                                  |
| Players             | `/players`            | ABM de jugadores con ficha integral              |
| Attendance          | `/attendance`         | Control de asistencias (individual y masivo)      |
| Matches             | `/matches`            | Ficha de partido, convocatoria, eventos          |
| Match Statistics    | `/match-statistics`    | Taggeo avanzado (2 taggeadores)                  |
| Training Plans      | `/training-plans`     | Planificación de entrenamientos                  |
| Physical Tests      | `/physical-tests`     | Test físicos con evolución                       |
| Nutrition           | `/nutrition`          | Control nutricional (peso, IMC, evolución)       |
| Injuries            | `/injuries`           | Ficha de lesiones e historial                    |

## User Roles

- `admin` — Full access
- `coordinator` — Dashboard + all management
- `coach` — Teams, players, matches, training
- `physical_trainer` — Physical tests, attendance
- `nutritionist` — Nutrition records
- `medical` — Injuries, medical history
- `player` — Read-only own data

## Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run build`      | Compile TypeScript                 |
| `npm run start:dev`  | Development with hot reload        |
| `npm run start:prod` | Production mode                    |
| `npm run lint`       | Run ESLint                         |
| `npm test`           | Run unit tests                     |
| `npm run test:e2e`   | Run end-to-end tests               |

## Project Structure

```
src/
├── common/              # Shared enums, entities, decorators, guards
├── auth/                # Authentication (JWT, users, roles)
├── dashboard/           # Dashboard / centro de control
├── teams/               # Gestión de equipos
├── players/             # Gestión de jugadores
├── attendance/          # Control de asistencias
├── matches/             # Ficha de partido + eventos + convocatoria
├── match-statistics/    # Taggeo avanzado de estadísticas
├── training-plans/      # Planificación de entrenamientos
├── physical-tests/      # Test físicos
├── nutrition/           # Control nutricional
├── injuries/            # Ficha de lesiones
├── app.module.ts        # Root module
└── main.ts              # Entry point + Swagger setup
```

## License

Private
