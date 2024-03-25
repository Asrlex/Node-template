# Nombre de la herramienta

## Descripción

- **assets**
  - Sirve recursos estáticos como imágenes, hojas de estilo y scripts.
  - **css**
    - Hojas de estilo css.
    - Contiene hojas de estilo css y las traducciones de Sass a css.
  - **js**
    - Scripts.
    - Contiene algunas librerías de uso común como sweetalert o exceljs.
  - **img**
    - Imágenes
    - Contiene el logo de Servinform, favicon y otros iconos útiles no disponibles en fontawesome (o similar).
  - **scss**
    - Hojas de estilo en formato SCSS.
    - Opcional. Se puede borrar si no se usa Sass, pero se deben seguir pasos:
      - Borrar la dependencia de Sass en package.json.
      - Modificar el script de ejecución para no ejecutar concurrentemente traductor y servidor.
- **db**
  - Contiene los ficheros de gestión de la base de datos.
    - Inicialización de base de datos sqlite3 para desarrollo.
    - Inicialización de base de datos mssql para producción.
    - Inicialización de base de datos mariadb para producción.
    - Testeo de base de datos.
      - Conexión
      - Creación de tablas
      - Queries
      - Migraciones
    - Recopilación de funciones reutilizables.
- **controllers**
  - Contiene los controladores de cada sección de la aplicación, todo el código que se encarga de manejar las peticiones y respuestas.
  - Organizado por secciones.
- **routes**
  - Contiene las rutas de la aplicación, se encarga de redirigir las peticiones a los controladores.
  - Organizado por secciones.
- **utils**
  - Contiene las funciones y clases que se utilizan en la aplicación.
- **views** ⭕ Ignorar/borrar directorio si se usa un frontend separado o se quiere integrar React.
  - Contiene las vistas de la aplicación, se encarga de mostrar la información al usuario.
  - **layouts**
    - Contiene los layouts de la aplicación, los ficheros estructurales.
    - Tan solo existe boilerplate como esqueleto.
  - **partials**
    - Contiene los partials de la aplicación, ficheros reutilizables en las vistas.
    - Por defecto se usan header, navbar, header y scripts.
- **middleware.js**
  - Contiene las funciones reutilizables de middleware de la aplicación.
- **server.js**
  - Contiene el servidor de la aplicación.

---

## Instalación

Si se quiere usar como plantilla para otro proyecto:

```bash
git clone <url del repositorio> (https://github.com/Asrlex/santalucia_node.git)
# Opcional: renombrar el directorio
cd <nombre del repositorio> (santalucia_node)
rm -rf .git
git init
git commit -m "Initial commit"
# Opcional: crear nuevo repositorio en GitHub
git branch -M main
git remote add origin <url del repositorio>
git push -u origin main
```

Una vez creado el repositorio, se deben instalar las dependencias:

```bash
npm install
```

Si se quiere migrar a yarn:

```bash
corepack enable
yarn set version berry
yarn install
```

---

## Configuración

En el caso que fuera necesario, especificar instrucciones para configurar la herramienta.

---

## Requerimientos

En el caso que fuera necesario, especificar los requerimientos de la herramienta.

---

## Uso

Ejemplo de uso de la herramienta.
