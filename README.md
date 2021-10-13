# test-redis

## Запуск
`npm i` - установка зависимостей

`npm start` - запуск сервера

## Запросы
### GET / 
query params : {name: string}

name - имя ключа в редисе

### POST /
body: {key: string, value: string}

key - ключ, value - значение

### ENV
Переменные лежат в `.env`
