# ModuloUsuariosRespirAR-Mobile

ModuloUsuariosRespirAR-Mobile es un proyecto mobile realizado con [Expo](https://docs.expo.dev/) para la administración de usuarios y roles.

## Características

- CRUD de usuarios
- CRUD de roles
- Asignación de roles

## Requisitos

- Node.js: [Descargar e instalar Node.js](https://nodejs.org/en)
- npm: npm se instala automáticamente junto con Node.js
- Git: para control de versiones [Descargar e instalar Git](https://git-scm.com/)
- LocalTunnel: necesario para testear la aplicación [Instalar localtunnel](https://github.com/localtunnel/localtunnel)
- Docker: [Descargar e instalar Docker](https://www.docker.com/)

## Estructura del proyecto

- Index.js: Punto de partida de la aplicación.
- src/: Contiene el código fuente de la aplicación.
- src/assets/: imagenes del proyecto.
- src/screens/: Pantallas principales de la aplicación.
- src/navigator: Navigators de la aplicación.
- src/layout: Layout de la aplicación.
- src/auth: Pantalla de Login.
- src/context: Contexto de la aplicación.
- src/services/: Módulos de servicios para comunicarse con los servicios de KeyRock.

## Instalación

1. Clona el repositorio: `git clone https://github.com/ModuloUsuariosRespirAR/ModuloUsuariosRespirAR-Mobile.git`
2. Instala las dependencias: `npm install`

## Configuración y uso

1- Antes de ejecutar el proyecto mobile, asegurarse de crear un archivo `imagen-docker.yml` y volcar allí la siguiente informacion:

```
version: '3.5'
services:
keyrock:
  image: 41facujc/keyrock-ciudades-del-futuro:2.0
  container_name: fiware-keyrock
  hostname: keyrock
  networks:
    default:
      ipv4_address: 172.14.1.5
  depends_on:
    - mysql-db
  ports:
    - '3000:3000'
    - '443:443'
  environment:
    - DEBUG=idm:*
    - IDM_DB_HOST=mysql-db
    - IDM_HOST=http://localhost:3000
    - IDM_PORT=3000
    - IDM_DB_PASS=secret
    - IDM_DB_USER=root
    - IDM_ADMIN_USER=admin
    - IDM_ADMIN_EMAIL=admin@test.com
    - IDM_ADMIN_PASS=1234
    - IDM_EMAIL_HOST=mailer
    - IDM_EMAIL_PORT=25

mysql-db:
  restart: always
  image: mysql:5.7
  hostname: mysql-db
  container_name: db-mysql
  expose:
    - '3306'
  ports:
    - '3306:3306'
  networks:
    default:
      ipv4_address: 172.14.1.6
  environment:
    - 'MYSQL_ROOT_PASSWORD=secret'
    - 'MYSQL_ROOT_HOST=172.14.1.5'
  volumes:
    - mysql-db:/var/lib/mysql

networks:
default:
  ipam:
    config:
      - subnet: 172.14.1.0/24
volumes:
mysql-db: ~
```

En el directorio donde alojamos este archivo ejecutar:

`docker-compose up`

2. Luego, ejecutar el proyecto [ModuloUsuariosRespirAR-Back](https://github.com/ModuloUsuariosRespirAR/ModuloUsuariosRespirAR-Back) presente en la organización [ModuloUsuariosRespirAR](https://github.com/ModuloUsuariosRespirAR).

3. Ejecutar localtunnel: `npx localtunnel --port 8000`. Este comando devuelve una url que debemos copiar
4. En el proyecto encontrará un archivo llamdo `env.example`. Renombrarlo a `.env` y agregar la url que nos devuelve localtunnel a la variable `BACKEND_URL`.

5. Inicia la aplicación: `Expo Start` .
6. Pulsar la letra a para abrir el emulador de Android (en caso de tenerlo instalado) o instalar en tu celular la aplicacion Expo([Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1) - [IOS](https://apps.apple.com/us/app/expo-go/id982107779)) y en la misma escanear el QR que nos devuelve Expo

7. Iniciar sesion con usuario `admin@test.com`, contraseña: `1234`.

8. En la aplicación podrás realizar las siguientes acciones:

- Agregar un nuevo usuario.
- Ver la lista de usuarios existentes.
- Editar la información de un usuario.
- Asignar roles a usuarios.
- Eliminar un usuario.
- Agregar un nuevo rol.
- Ver la lista de roles existentes.
- Editar la información de un rol.
- Eliminar un rol.
