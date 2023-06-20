# 🗃️Organize Bonanza
This is the readme for the Organize Bonanza. A platform for organizing your inventory and creating orders of your products. Make a few orders for yourself and go crazy!

## Live Server Link
[https://organizebonanza.onrender.com](https://organizebonanza.onrender.com)

## Photos
![Screenshot 2023-06-20 132252](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/ebcf594c-ff0e-41fc-a2ab-9dc67b92d8d7)
![Screenshot 2023-06-20 132312](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/86837c22-80c6-4999-83ed-7c51a94858cc)
![Screenshot 2023-06-20 132327](https://github.com/jhatheisen/Organize-Bonanza/assets/106848904/1a2e9eff-efe3-4ef7-aa52-f719797e79e7)

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
