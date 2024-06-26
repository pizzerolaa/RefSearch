# RefSearch: "Explora con Confianza, Investiga con Facilidad"

## Descripción

RefSearch, tiene como propósito el mejoramiento de la calidad de información y recursos digitales a los que los alumnos, docentes y personal de instituciones académicas puedan acceder para realizar los diversos trabajos y entregables de investigación que les sean asignados. Asimismo, pretende eficientar los tiempos en los que se lleva a cabo esta búsqueda, implementando una herramienta que funcione de forma conjunta con la API de google academics, y que haga un despliegue de forma intuitiva de las 5 principales fuentes de información disponibles.

## Requerimientos

Para poder iniciar y correr lo contenido en este repositorio, será necesario contar ciertos programas y dependencias, los cuales se enlistan a continuación...

### Node JS

Es necesario contar con Node JS instalado en su equipo para iniciar tanto la visualización de la página como el servidor de esta. Para ello accede a la siguiente dirección [Download Node JS](https://nodejs.org/en/download/package-manager), y después de elegir de las distintas opciones la que más te convenga, sigue las instrucciones ahí descritas.

### Servicio local de Base de Datos 

También es necesario contar con algún servicio o sistema de gestión de bases de datos, alojado localmente en tu equipo. En caso de este proyecto, será necesario que puede correr MySQL. Para esto nosotros recomendamos XAMPP que se puede encontrar en el siguiente enlace: [XAMPP Installers and Downloads](https://www.apachefriends.org/es/index.html).

### Python

Para ejecutar ciertos scripts y manejar la lógica de búsqueda avanzada, es necesario tener instalado Python en su equipo. Para ello, acceda a la siguiente dirección [Download Python](https://www.python.org/downloads/), elija la versión más reciente compatible con su sistema operativo y siga las instrucciones de instalación.

IDE Recomendado: Para el desarrollo y edición de código en en general, se recomienda utilizar Visual Studio Code (VSCode), que se puede descargar en el siguiente enlace: [Download VSCode](https://code.visualstudio.com/Download). Una vez con esto, puede instalar la extensión oficial de Python para VSCode, la cual facilita la depuración, ejecución y formateo del código Python. Esta extensión se puede encontrar en el [Marketplace de Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python).

## Ejecutar el Proyecto

### Clonar el repositorio locamente

Como primer paso debemos clonar este repositorio localmente con la ayuda del comando...

- `git clone https://github.com/pizzerolaa/RefSearch.git`

..., ejecutándolo en la terminal de tu preferencia, dentro el directorio donde quieras que se ubiquen alojados los archivos de la aplicación. 

### Configurar la Base de Datos

Después de haber clonado el repositorio, necesitamos importar la base de datos al sistema de gestión. Para ello primero abre XAMPP o la aplicación de tu predferencia y asegúrate de que los servicios de Apache y MySQL se encuentren en correcto funcionamiento, como se muestra en la imagen:

![image](https://github.com/pizzerolaa/Aplicacion-MVC/assets/128638772/a82ba355-6b8a-4f82-a11c-e194d3ff97a9)

Posteriormente, ingresamos al panel de administración de MySQL, mediante el botón 'Admin' resaltado. Dentro, en el panel del lateral izquierdo seleccionamos la opción de "Nueva" y crearemos una nueva base de dato llamada 'refsear'. Luego daremos click en "Crear".

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/7e641adb-6f01-458c-b4da-bea0714196ba)

Una vez creadas, en la barra superior seleccionamos "Importar" y seleccionamos el archivo 'RefSear.sql' ubicado en la carpeta SRC del repositorio recién clonado.

![image](https://github.com/Checo894/ArquitecturaMicroServiciosLLM/assets/128638772/d3762390-b9f5-40b7-a987-f93cb18b7228)

Por último, damos en "Importar" al final de la página.

![image](https://github.com/pizzerolaa/Aplicacion-MVC/assets/128638772/a1fc1d23-d6eb-4cd7-8a24-b64d7571ba54)

### Correr localmente la aplicación

Completo lo anterior, en la terminal de tu preferencia ubícate en la carpeta fuente del repositorio clonado y ejecuta los siguientes comandos:

- `npm i`: Instala las dependencias externas del proyecto.

- `npm start`: Inicia la aplicación de REACT.

Ahora, entra a la carpeta de 'backend' con ayuda `cd .\backend\` y ejecuta:

- `npm i`: Instala las dependencias internas del proyecto.

- `node index.js`: Inicia el servidor de Express.

Por último, regresa a la ruta principal con `cd ..` y entra a la carpeta `cd .\API` para ejecutar la Api de Búsqueda alojada en Python:

- Puedes ejecutarlo directamente (recomendable) de tu IDE de preferencia (sugerimos VSCode) o...

- Utilizar el comando `& ./.venv/Scripts/python.exe ./RefSearch/API/scholarly_api.py` (en Windows) desde una terminal justo afuera de la carpeta del proyecto. Es decir, si te encuentras en `c:\...\RefSearch\API>` cambia a `c:\...>` los '...' representando la ruta de tu equipo donde está el proyecto.

Terminado esto, la página estará lista para su uso.
