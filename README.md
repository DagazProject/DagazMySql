1. Download ZIP-file from https://github.com/GlukKazan/DagazMySQL
2. Unpack ZIP-file on the host-system
3. Change to the directory with the unpacked files and run the following command: <b>npm install</b>
4. Create a database in MySQL with the following command: <b>CREATE DATABASE dagaz CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;</b>
5. Edit the settings in the <b>ormconfig.json</b> file, specifying the correct parameters for the connection with the MySQL
6. Go back to the directory with the unpacked files and run the following command: <b>npm start</b>
7. Make sure that there are no error messages in the log, then stop execution by <b>Ctrl+C</b> pressing
8. Run the following command (make sure there are no errors): <b>ts-node ./node_modules/typeorm/cli.js migration:run</b>
9. Edit the <b>.env</b> file to set the listening port
10. Re-enter the following command (from now on the service is ready to using): <b>npm start</b>
11. Use nginx-proxy to change listening port or connect SSL certificates
12. Configure autostart of service
13. https://boardgamesandcards.com/
