# Creación del archivo csv

## OPCION 1

### Usando xlsx

## OPCION 2

### Combinación entre fs y la librería json-2-csv

Considerando que la respuesta que da inmediatamente Sequelize tiene el formato:
PlayerModel {
dataValues: {
...
},
previousDataValues: {
...
},
uniqno: 1,
...
},
Se usaron los comandos:
data0 =JSON.stringify(raw_data, null, 2); => para mostrar los valores como un string
data = JSON.parse(data0); => para poder ser trabajados como objetos

-- Modificado con el comando raw:true al ejecutar la query

Se eligió la librería json-2-csv para simplificar el paso de json a csv, la opción de hacerlo manualmente
con Object.keys (headers) y Object.values (rows) se demostró que producía errores en la compaginación del
resultado.

Se creó la carpeta public para poder crear el archivo y después enviarlo con el método sendFile de ExpressJs. Además, para lograr el path exacto de la carpeta se generó el index.js con unas pocas líneas.
