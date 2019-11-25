# OpenTasky

## Daily manager for your Organisation

* roles like admin and user
* create project -> create tasks in project -> assign it to user -> then user can start,pause,resume,complete task
* time sheet(automatic generation of timesheet based on the activity of user) 
* and more feature comming soon

## To Join Discussion 
* [Telegram](https://t.me/joinchat/FDVzKxcwfHWUyWWuTuaPHA)

## SETUP

we are using postgres as our Database you can create a db with name "task", password "task", and username "task"
or you can create custom and put in util/db.js 
for intial logins it provide a username "admin@admin.com" with password "admin" <br/>
* run this command to create session table in your DB to create the session table <br/> 
```psql <your DB> < node_modules/connect-pg-simple/table.sql``` 
