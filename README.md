# Ecommerce Frontend

Este proyecto es una aplicación frontend para un ecommerce de productos, desarrollada con Angular en su version 18.

## Capturas de pantalla del Proyecto

A continuación se muestra una imagen de la interfaz de la aplicación:

![Vista previa del proyecto modo light](./public/web_modo_light.png)

![Vista previa del proyecto modo dark](./public/web_modo_dark.png)

## Características

- Catálogo de productos
- Carrito de compras
- Proceso de pago
- Confirmación de pago
- Gestión de usuarios
- Interfaz moderna y responsiva

## Instalación

Asegúrate de tener [Bun](https://bun.sh/) instalado en tu sistema.

1. Clona el repositorio:

   ```bash
   git clone https://github.com/yclicourt/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. Instala las dependencias:

   ```bash
   bun install
   ```

3. Inicia la aplicación:

   ```bash
   bun run dev
   ```

## Variables de entorno

Este proyecto **no** usa el mecanismo clásico de `environment.ts` con `fileReplacements`
(el `angular.json` lo deja vacío a propósito). En su lugar, la configuración se resuelve
en **runtime** mediante un JSON servido junto a la app:

1. `src/assets/config.json` contiene todos los valores configurables:

   ```json
   {
     "apiUrl": "http://localhost:3000/api/v1",
     "clientUrl": "http://localhost:4200",
     "brandName": "Ecommerce Yoyo Shop",
     "tokenKey": "tokenKey",
     "currentUser": "currentUser",
     "PAYPAL_API": "",
     "cloudinaryBaseUrl": ""
   }
   ```

2. `angular.json` copia ese archivo al build con el glob de assets
   (`src/assets/config.json` → `/assets/config.json`), tanto en `build` como en `test`.
3. `ConfigService` (`src/app/shared/services/config.service.ts`) lo carga vía HTTP
   **antes** de que arranque la app, usando `APP_INITIALIZER` en `app.config.ts`,
   y expone getters tipados (`apiUrl`, `clientUrl`, `brandName`, `tokenKey`, `currentUser`).

| Clave | Descripción |
|---|---|
| `apiUrl` | URL base del backend (NestJS) |
| `clientUrl` | URL pública del frontend |
| `brandName` | Nombre de la tienda mostrado en la UI |
| `tokenKey` | Clave usada para guardar el JWT en el almacenamiento local |
| `currentUser` | Clave usada para guardar el usuario actual en el almacenamiento local |
| `PAYPAL_API` | Client ID de PayPal para los pagos |
| `cloudinaryBaseUrl` | URL base de Cloudinary para las imágenes |

**Ventaja:** como la config se lee en runtime y no se compila dentro del bundle,
puedes cambiar de entorno (dev / staging / producción, Docker, Vercel) editando
o sustituyendo `assets/config.json` **sin recompilar** la aplicación.

## Contribución

¡Las contribuciones son bienvenidas! Por favor, abre un issue o un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.

## 🛠️ Stack Tecnológico

- **Framework:** Angular 18  
- **Lenguaje:** TypeScript  
- **Gestor de paquetes:** Bun  
- **Estilos:** TailwindCSS  
- **Control de versiones:** Git  
- **Integración de pagos:** PayPal API  
- **Autenticación:** JWT  
- **Herramientas adicionales:** RxJS, Signals, Angular Material
- **Deploy:** Vercel 


