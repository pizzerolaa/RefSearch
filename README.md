# RefSearch: "Explora con Confianza, Investiga con Facilidad"

## Descripción

(texto)

## Requerimientos

Para poder iniciar y correr lo contenido en este repositorio, será necesario contar ciertos programas y dependencias, los cuales se enlistan a continuación...

### Node JS

Es necesario contar con Node JS instalado en su equipo para iniciar tanto la visualización de la página como el servidor de esta. Para ello accede a la siguiente dirección [Download Node JS](https://nodejs.org/en/download/package-manager), y después de elegir de las distintas opciones la que más te convenga, sigue las instrucciones ahí descritas.

### Servicio local de Base de Datos 

También es necesario contar con algún servicio o sistema de gestión de bases de datos, alojado localmente en tu equipo. En caso de este proyecto, será necesario que puede correr MySQL. Para esto nosotros recomendamos XAMPP que se puede encontrar en el siguiente enlace: [XAMPP Installers and Downloads](https://www.apachefriends.org/es/index.html).

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

- `npm i`: Instala las dependencias del proyecto.

- `npm start`: Inicia el servidor de Express.

Terminado esto, la página estará lista para su uso.
