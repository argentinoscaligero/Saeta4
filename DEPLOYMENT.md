# 🚀 SAETA 4 - Guía de Deployment

## 📋 Estado Actual

### ✅ Completado

1. **Desarrollo local**
   - 11 módulos implementados (Auth, Teams, Players, Attendance, Matches, Match Statistics, Training Plans, Physical Tests, Nutrition, Injuries, Dashboard)
   - Todas las entidades, DTOs, servicios y controladores completos
   - Autenticación JWT con 7 roles
   - Validación con class-validator
   - Documentación Swagger configurada
   - Compilación sin errores

2. **Repositorio GitHub**
   - URL: https://github.com/argentinoscaligero/Saeta4
   - Usuario: argentinoscaligero
   - Estado: Público (temporalmente para deployment)
   - 159 objetos subidos
   - Branch: master

3. **Servidor de Producción**
   - Dominio: saeta.penaltycorner.com.ar
   - OS: Oracle Linux ARM64
   - CPU: 4 cores
   - RAM: 12GB
   - IP: Configurada con DNS

4. **Software instalado en servidor**
   - Node.js 20.x
   - PostgreSQL 16
   - PM2 (process manager)
   - Nginx 1.x
   - Git

5. **Base de datos**
   - PostgreSQL 16 corriendo
   - Database: `saeta4` creada
   - User: `saeta`
   - Password: Configurada (recordar para .env)

6. **Nginx + SSL**
   - Configurado en `/etc/nginx/conf.d/saeta.conf`
   - SSL certificate de Let's Encrypt instalado
   - Certificados en `/etc/nginx/ssl/`
   - Reverse proxy: 443 → localhost:3000
   - HTTP redirect a HTTPS
   - Nginx activo y funcionando

7. **Código clonado**
   - Directorio: `/opt/saeta4`
   - Repositorio clonado exitosamente

### ⏳ Pendiente

1. Instalar dependencias Node.js (`npm install`)
2. Configurar variables de entorno (`.env`)
3. Compilar aplicación (`npm run build`)
4. Iniciar con PM2 (`pm2 start dist/main.js --name saeta4`)
5. Configurar PM2 startup
6. Verificar funcionamiento
7. Volver repositorio a privado

---

## 🔧 Pasos para completar el deployment

### 1. Conectarse al servidor

```bash
ssh root@saeta.penaltycorner.com.ar
# o
ssh usuario@IP_DEL_SERVIDOR
```

### 2. Navegar al directorio del proyecto

```bash
cd /opt/saeta4
ls -la  # Verificar archivos
```

### 3. Ajustar permisos (si es necesario)

```bash
# Si clonaste como root, cambiar owner:
chown -R $USER:$USER /opt/saeta4
```

### 4. Instalar dependencias

```bash
npm install
```

**Tiempo estimado**: 2-3 minutos  
**Esperar a que termine completamente**

### 5. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar con nano o vi
nano .env
```

**Contenido del `.env`**:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=saeta
DB_PASSWORD=TU_PASSWORD_DE_POSTGRES_AQUI
DB_NAME=saeta4

# JWT Configuration
JWT_SECRET=TU_CLAVE_SECRETA_SUPER_LARGA_MINIMO_32_CARACTERES

# Application
PORT=3000
NODE_ENV=production
```

**Generar JWT_SECRET seguro**:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copiar el output y pegarlo en `JWT_SECRET`.

**Guardar en nano**: `Ctrl+O`, `Enter`, `Ctrl+X`

### 6. Compilar la aplicación

```bash
npm run build
```

**Tiempo estimado**: 1-2 minutos  
**Debe completar sin errores**

Verificar que se creó la carpeta `dist/`:
```bash
ls -la dist/
```

### 7. Iniciar con PM2

```bash
pm2 start dist/main.js --name saeta4
```

**Output esperado**:
```
[PM2] Starting dist/main.js in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────┬─────────────┬─────────┬─────────┐
│ id │ name       │ mode        │ ↺       │ status  │
├────┼────────────┼─────────────┼─────────┼─────────┤
│ 0  │ saeta4     │ fork        │ 0       │ online  │
└────┴────────────┴─────────────┴─────────┴─────────┘
```

### 8. Verificar logs

```bash
pm2 logs saeta4
```

**Buscar líneas como**:
```
[Nest] INFO [NestFactory] Starting Nest application...
[Nest] INFO [InstanceLoader] AppModule dependencies initialized
[Nest] INFO [RoutesResolver] AuthController {/auth}:
[Nest] INFO [NestApplication] Nest application successfully started
[Nest] INFO Application is running on: http://[::]:3000
```

**Presionar `Ctrl+C` para salir de los logs**

### 9. Guardar configuración de PM2

```bash
pm2 save
```

Esto guarda la configuración actual de PM2.

### 10. Configurar PM2 para auto-start

```bash
pm2 startup
```

**PM2 mostrará un comando** similar a:
```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u tu_usuario --hp /home/tu_usuario
```

**Copiar y ejecutar ese comando exacto**.

### 11. Verificar estado

```bash
pm2 status
```

Debe mostrar `saeta4` con estado `online`.

```bash
pm2 monit
```

Muestra monitoreo en tiempo real (CPU, RAM, logs). Presiona `q` para salir.

---

## ✅ Verificación del deployment

### 1. Probar endpoints localmente en el servidor

```bash
curl http://localhost:3000
# Debería responder con "Hello World!" o similar

curl http://localhost:3000/api/docs
# Debería devolver HTML de Swagger
```

### 2. Probar desde tu navegador

Abrir:
- https://saeta.penaltycorner.com.ar
- https://saeta.penaltycorner.com.ar/api/docs

**Debería cargar** la documentación de Swagger.

### 3. Crear primer usuario admin

Desde Swagger o con curl:

```bash
curl -X POST https://saeta.penaltycorner.com.ar/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@saeta.com",
    "password": "Admin123!",
    "name": "Admin",
    "role": "admin"
  }'
```

### 4. Login y obtener token

```bash
curl -X POST https://saeta.penaltycorner.com.ar/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@saeta.com",
    "password": "Admin123!"
  }'
```

Guardar el `access_token` devuelto.

---

## 🔒 Volver repositorio a privado

Desde tu máquina local (Windows):

```powershell
cd C:\Users\mbruno\des\Saeta4

& "C:\Program Files\GitHub CLI\gh.exe" repo edit argentinoscaligero/Saeta4 --visibility private --accept-visibility-change-consequences
```

---

## 🔄 Comandos útiles de PM2

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs saeta4

# Ver logs con scroll
pm2 logs saeta4 --lines 100

# Monitorear recursos
pm2 monit

# Reiniciar aplicación
pm2 restart saeta4

# Detener aplicación
pm2 stop saeta4

# Eliminar de PM2
pm2 delete saeta4

# Ver información detallada
pm2 show saeta4
```

---

## 🔧 Troubleshooting

### Error: No se puede conectar a PostgreSQL

**Verificar que PostgreSQL está corriendo**:
```bash
sudo systemctl status postgresql
```

**Si no está corriendo**:
```bash
sudo systemctl start postgresql
```

**Verificar credenciales en .env**:
```bash
cat .env | grep DB_
```

**Testear conexión**:
```bash
psql -U saeta -d saeta4 -h localhost
# Ingresar password cuando lo pida
# Si conecta exitosamente, las credenciales son correctas
```

### Error: Puerto 3000 ya en uso

**Ver qué proceso usa el puerto**:
```bash
sudo lsof -i :3000
# o
sudo netstat -tlnp | grep 3000
```

**Matar el proceso si es necesario**:
```bash
sudo kill -9 <PID>
```

### Error: npm install falla por falta de memoria

**Aumentar swap temporalmente** o **limpiar npm cache**:
```bash
npm cache clean --force
npm install --verbose
```

### Application crashea al iniciar

**Ver logs completos**:
```bash
pm2 logs saeta4 --lines 200
```

**Verificar JWT_SECRET**:
```bash
grep JWT_SECRET .env
```

Debe tener al menos 32 caracteres.

### Nginx no responde

**Verificar status**:
```bash
sudo systemctl status nginx
```

**Ver logs de errores**:
```bash
sudo tail -f /var/log/nginx/error.log
```

**Reiniciar Nginx**:
```bash
sudo systemctl restart nginx
```

---

## 📊 Próximos pasos después del deployment

1. ✅ Verificar API funcional
2. ✅ Crear usuarios iniciales (admin, coordinadores)
3. 📝 Crear equipos de ejemplo
4. 📝 Cargar jugadores de prueba
5. 📝 Testing de flujos principales
6. 🔐 Configurar backups automáticos de PostgreSQL
7. 📈 Configurar monitoreo y alertas
8. 🔒 Configurar rate limiting
9. 📧 Configurar emails (recuperación de password, notificaciones)
10. 📱 Integración con frontend

---

## 🔐 Seguridad post-deployment

1. **Deshabilitar synchronize en producción**
   
   En `src/app.module.ts`, cambiar:
   ```typescript
   synchronize: process.env.NODE_ENV !== 'production',
   ```

2. **Configurar CORS específico**
   
   En `src/main.ts`, limitar origins:
   ```typescript
   app.enableCors({
     origin: ['https://saeta.penaltycorner.com.ar', 'https://app.saeta.com.ar'],
     credentials: true,
   });
   ```

3. **Implementar rate limiting**
   
   Instalar `@nestjs/throttler` y configurar límites.

4. **Backups de PostgreSQL**
   
   Configurar cron job:
   ```bash
   # /etc/cron.daily/backup-saeta4
   pg_dump -U saeta saeta4 > /backups/saeta4_$(date +\%Y\%m\%d).sql
   ```

---

## 📞 Contacto

**Desarrollador**: Martin Bruno  
**GitHub**: argentinoscaligero  
**Proyecto**: SAETA 4 - Sistema de Gestión Deportiva 360°

---

**Última actualización**: 2026-02-13  
**Versión**: 1.0.0  
**Status**: Listo para deployment final
