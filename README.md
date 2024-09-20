# Entrenamiento Santex

## Objetivos

Desarrollar una aplicación web para gestionar un listado de jugadores de FIFA utilizando Node.js en el backend y Angular en el frontend. La aplicación se conectará a una base de datos que contiene información sobre jugadores de fútbol (de ambos géneros) con sus habilidades correspondientes. Los datos abarcan versiones de FIFA desde 2015 hasta 2023, lo que implica que es posible que un jugador aparezca en varias versiones del juego, con variaciones en su edad, versión del juego y habilidades.

## Funcionalidades

1. Listado de jugadores:
   Crear endpoint y pantalla que devuelva un listado de los jugadores paginados y filtrado por nombre, club, o posición, etc.
2. Implementar la posibilidad de descargar el listado filtrado en formato CSV ( Hint: xlsx).
3. Obtener información de un solo jugador:
   Crear endpoint y pantalla que devuelva los detalles de un jugador específico, dado su ID e implementar algun grafico para mostrar sus skills (Hint: pueden utilizar Chart.js Radar Chart)
4. Editar la información de un jugador:
   Crear endpoint y pantalla que permita modificar la información de un jugador (nombre, posición, club, calificación, nacionalidad y sus skills).
5. Crear un jugador:
   Crear un endpoint que te permita crear un jugador, crear uno con tu nombre y las skills que quieras.
6. Autenticación:
   Crear un Login para solo ver la info de forma autenticada
7. Autorización: Los endpoints del back no deben dar información si no estás logueado
8. Implementar un mecanismo (puede ser un endpoint o un script) para subir un archivo CSV con información de jugadores y almacenar los datos en la base de datos. Compartir excel de Fifa de Hombres y Mujeres. (Este es un punto extra, ya se lo damos cargado)

## Detalles técnicos

1.  Backend: Node.Js con Express, Sequelize como ORM (BB.DD con MySQL)

    ### Librerías utilizadas

    1.  Funcionamiento

        - bcrypt: encriptación de contraseñas
        - cors
        - helmet
        - dotenv
        - xss-clean

    2.Validaciones

         - express-validator

    3.  Subida/Bajda de archivos

        - csv-parser
        - multer
        - json-2-csv
        - xlsx

    4.  Autenticación y Autorización

        - jsonwebtoken
        - passport
        - passport-jwt

1.  Frontend: Angular

1.  Base de datos
    Creada con Docker compose, además se modificó el archivo original sql. Se agregaron 2 líneas:

         ```
         CREATE DATABASE IF NOT EXISTS `fifa`;
         USE `fifa`;
         ```
