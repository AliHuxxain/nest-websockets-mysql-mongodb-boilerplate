------------------------------------------------------------------------------
Boilerplate for Nest Js and Websockets
------------------------------------------------------------------------------

Features for APIs:
----------------------------------------------------
- Basic Authentication using Nest Guards
- JWT Authorization using Nest Guards
- Refresh Tokens and their rotations
- Connectivity with MySQL and MongoDB
- Rate Limiting (you can skip Throttling on specific endpoints)
- Public routing (bypassing auth guards)

Features for WebSockets:
----------------------------------------------------
- Basic Authentication using Guards
- Connection of socket client
- Can easily add multiple namespaces
- Listening at port 5000


Setup:
----------------------------------------------------
1- Run command npm install
2- Install MySQL and MongoDB (if not already installed)
3- Create database with 'databaseName'
4- Create table in mysql for users (user_id, first_name, last_name, email, password, contact)
5- Create table in mysql for refresh tokens (id, user_id, token, data, created_at, expired_at)
6- Run command nest start


Now your HTTP Server should start running on port 4000 and your Socket Server should be listening for clients at port 5000


Test Socket Client:
----------------------------------------------------
Goto ./socket-client directory and run index.html on browser and you will be connected to socket at 5000 port