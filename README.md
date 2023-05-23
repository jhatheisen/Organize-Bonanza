# 🗃️Organize Bonanza
This is the readme for the Organize Bonanza. A platform for organizing your inventory and creating orders of your products. Make a few orders for yourself and go crazy!

## Live Server Link
[https://organizebonanza.onrender.com](https://organizebonanza.onrender.com)

## Photos
![image](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/9b34bb1d-c0a4-45db-a7ea-6e05a4f1f5fa)
![image](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/a9a7cce9-0b07-4102-92fb-cce73b94dd18)
![image](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/68b94cf5-ecf6-4ea4-979a-5651209e378f)

## Tech Stack

* Frameworks, Platforms, and Libraries: 

  * Javascript

  * Python

  * HTML5

  * CSS3

  * Node.js

  * React

  * Redux

  * Flask

  * SQLAlchemy

  * Alembic
  
  * TailwindCSS

* Database

  * Postgres

* Hosting

  * Render

## Getting Started (Local Testing)

To run locally, clone the repository, navigate into the root of the repository and run the command **"sh setup.sh"** to install the dependencies and create a .env file in the backend folder. It will be empty, you must add the following lines into the .env and fill them with the desired variables.

 - PORT=</port number/>
 - DB_FILE=</Desired database location/>
 - JWT_SECRET=</generate a strong secret/>
 - JWT_EXPIRES_IN=</How long untill the JWT (JSON Web Token) Should expire (in Milliseconds) />
 - SCHEMA=</custom_schema_name/>

Then navigate into the backend directory and run **"sh reset-db.sh"** to load the demo data. Next run **"npm start"** to start the backend database. Finally open a second terminal and navigate to the frontend directory and run **"npm start"** again to start up the frontend server, which can be accessed at the url **"http://localhost:</portNumber/>"**.

You will now be able to run the server anytime you run **"npm start"** in the backend folder and open a second terminal and run **"npm start"** in the frontend.

## **See wiki for additional information**
