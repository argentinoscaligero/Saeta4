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

## 🚀 Production Deployment

### Server Info
- **URL**: https://saeta.penaltycorner.com.ar
- **OS**: Oracle Linux ARM64
- **Resources**: 4 CPUs, 12GB RAM
- **Web Server**: Nginx + SSL (Let's Encrypt)
- **Process Manager**: PM2
- **Repository**: https://github.com/argentinoscaligero/Saeta4

### Deployment Steps

```bash
# 1. Clone repository (already done)
cd /opt/saeta4

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
nano .env

# Generate JWT_SECRET with:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Required .env variables:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=saeta
# DB_PASSWORD=<your_postgres_password>
# DB_NAME=saeta4
# JWT_SECRET=<generated_secret>
# PORT=3000
# NODE_ENV=production

# 4. Build application
npm run build

# 5. Start with PM2
pm2 start dist/main.js --name saeta4
pm2 save
pm2 startup  # Follow instructions

# 6. Monitor
pm2 logs saeta4
pm2 monit
```

### Nginx Configuration

Already configured at `/etc/nginx/conf.d/saeta.conf`:
- HTTPS on port 443 with valid SSL certificate
- HTTP redirect to HTTPS
- Reverse proxy to Node.js on port 3000

### SSL Certificate

- Let's Encrypt certificates via Podman + Certbot
- Located at: `/etc/nginx/ssl/`
- Auto-renewal configured

### Current Status

✅ Repository created and code pushed  
✅ Server infrastructure ready (Nginx, PostgreSQL, PM2)  
✅ Database created (saeta4)  
✅ SSL certificate configured  
⏳ Pending: npm install + build + pm2 start  

### Next Steps

1. SSH to server and complete deployment steps above
2. Test API: https://saeta.penaltycorner.com.ar/api/docs
3. Create admin user via API
4. Set repository to private

## License

Private - Penalty Corner © 2026
