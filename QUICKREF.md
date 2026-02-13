# 📝 SAETA 4 - Quick Reference

## 🔗 Links importantes

- **Producción**: https://saeta.penaltycorner.com.ar
- **API Docs**: https://saeta.penaltycorner.com.ar/api/docs
- **Repositorio**: https://github.com/argentinoscaligero/Saeta4
- **Usuario GitHub**: argentinoscaligero

## 🖥️ Servidor

- **OS**: Oracle Linux ARM64
- **CPU**: 4 cores
- **RAM**: 12GB
- **Dominio**: saeta.penaltycorner.com.ar

## 📦 Software instalado

| Software    | Versión | Estado |
|-------------|---------|--------|
| Node.js     | 20.x    | ✅     |
| PostgreSQL  | 16      | ✅     |
| PM2         | Latest  | ✅     |
| Nginx       | 1.x     | ✅     |
| Git         | Latest  | ✅     |

## 🗄️ Base de datos

```
Host: localhost
Port: 5432
Database: saeta4
User: saeta
Password: [configurada]
```

## 🚀 Deployment pendiente

```bash
# En el servidor (/opt/saeta4):
npm install
cp .env.example .env
nano .env  # Configurar credenciales
npm run build
pm2 start dist/main.js --name saeta4
pm2 save
pm2 startup
```

## 📋 Comandos PM2

```bash
pm2 status              # Ver estado
pm2 logs saeta4         # Ver logs
pm2 restart saeta4      # Reiniciar
pm2 stop saeta4         # Detener
pm2 monit               # Monitor en tiempo real
```

## 🔐 Roles disponibles

1. `admin` - Acceso total
2. `coordinator` - Gestión general
3. `coach` - Equipo y entrenamientos
4. `physical_trainer` - Tests físicos
5. `nutritionist` - Nutrición
6. `medical` - Lesiones y médico
7. `player` - Solo lectura propia

## 🎯 Endpoints principales

| Endpoint | Descripción |
|----------|-------------|
| `POST /auth/register` | Registrar usuario |
| `POST /auth/login` | Login (obtener JWT) |
| `GET /teams` | Listar equipos |
| `GET /players` | Listar jugadores |
| `GET /dashboard` | Vista general |
| `GET /api/docs` | Swagger UI |

## 🔒 Próximos pasos

1. ⏳ Completar deployment
2. ⏳ Crear usuario admin inicial
3. ⏳ Volver repo a privado
4. ⏳ Testing de endpoints
5. ⏳ Configurar backups automaticos

## 📚 Documentación completa

- Ver `README.md` para overview
- Ver `DEPLOYMENT.md` para guía completa de deployment
- Ver `src/**/*.dto.ts` para estructura de datos
- Ver `/api/docs` para endpoints interactivos

---

**Última actualización**: 2026-02-13  
**Estado**: Listo para deployment final
