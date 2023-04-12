# Invest APP

A brief description of what this project does and who it's for

## Please follow the guide.

### Prerequisite

1. Make sure you have [composer](https://getcomposer.org/download/) installed.
2. Make sure you have latest stable version of [node](https://nodejs.org/en/download/) installed.


## Run Locally

Clone the project

```bash
  git clone https://github.com/ozodbekorifjonov/invest-app-b7
```

Go to the project directory

Navagate to the backend and frontend folder, install dependencies and start the server

### For the backend
```bash
  cd backend 
```
```bash
  create a .env file copy content from .env.example and update the values
  DB_DATABASE=laravel (write your own database name)
  DB_PASSWORD=        (write password example: root)
```
```bash
  composer install
```
```bash
  php artisan serve 
```
if you want to have some sample data run
```bash
    php artisan migrate
```
```bash
    php artisan db:seed 
```
or
```bash
    php artisan migrate --seed
```
### For the frontend
```bash
  cd frontend
```
```bash  
  npm install
```
```bash  
  npm run start
```

## Technologies
-  Laravel Framework 10.6.2
-  React 18.2.0
-  Mysql 8.0



## Deployment

To deploy this project run

```bash
  npm run deploy
```