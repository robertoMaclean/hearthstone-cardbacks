# HearthStone Cardbacks

Este es un proyecto Realizado para una prueba técnica como desarrollador Fron End.

![HearthStone Cardbacks App](image.png)

## Tecnologías

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.2.3. Para ver la compatibilidad entre dependencias ir al siguiente link [Dependencias](https://angular.io/guide/versions).

## ¿Cómo Iniciar?

### Clonar el proyecto.

```bash
git clone https://github.com/robertoMaclean/hearthstone-cardbacks.git
```

### Levantar el proyecto

#### Modo estándar
Ejecutar `ng serve` para correr en local la aplicación. Ir a `http://localhost:4200/`. La aplicación automáticamente se refrescará al detectar los cambios.

#### Modo con Netlify Functions
Para desarrollar con las funciones de Netlify, primero instala Netlify CLI:

```bash
npm install -g netlify-cli
```

Luego, ejecuta el servidor de desarrollo de Netlify:

```bash
netlify dev
```

Accede a la aplicación en `http://localhost:8888`. Esto permitirá que las funciones de Netlify estén disponibles durante el desarrollo local.

## Generar directivas

Ejecuta `ng generate component component-name` para generar un nuevo componente. Tambien puedes utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Ejecuta `ng build` para generar el build del proyecto. El resultado quedará guardado en el directorio `dist/`.

## Demo

Puedes ver la aplicación en el siguiente enlcace [HearthStone CardBacks Demo](https://hearthstone-cardbacks.netlify.app).

## Funciones de Netlify

Este proyecto utiliza funciones serverless de Netlify para acceder a la API de HearthStone. La configuración se realiza a través del archivo `netlify.toml` en la raíz del proyecto.

### Estructura de funciones
- Las funciones se encuentran en el directorio `netlify/functions/`
- La función principal `hearthstone.ts` gestiona las peticiones a la API externa
- En desarrollo local, las funciones son accesibles a través de la ruta `/api/*`

### Variables de entorno
Las funciones de Netlify requieren las siguientes variables de entorno:
- `HEARTHSTONE_API_KEY`: Tu clave API para HearthStone
- `HEARTHSTONE_API_HOST`: El host de la API de HearthStone

Estas variables deben configurarse en un archivo `.env` en la raíz del proyecto para desarrollo local, o en la configuración de Netlify para producción.

## Ayuda

Para obtener ayuda usando Angular CLI usa `ng help` ve a [Angular CLI Descripción general y lista de Commandos](https://angular.io/cli).

Para ayuda con Netlify CLI, usa `netlify --help` o visita la [documentación oficial de Netlify](https://docs.netlify.com/cli/get-started/).
