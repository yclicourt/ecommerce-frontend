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

Para el uso correcto del proyecto debe declarar en el archivo environment.ts las siguientes variables de entorno

    API_URL="",
    CLIENT_URL="",
    BRAND_NAME="",
    TOKEN_KEY="",
    CURRENT_USER=" ",
    PAYPAL_API=" ",

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

