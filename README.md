# ms-samuel-tulus- betest

## Requirements :
```
1. Node JS
2. MongoDB
3. Redis Server
```

## Preparation :
```
1. Move config folder to the outside of project folder in the same directory
2. Rename and remove ".example" for .env.example
3. Fill the config according to your machine
```

## Setup :
```
1. npm install
```

### Run :
```
1. npm start
```

### Deployment Info :
```
This web app is deployed on : https://ms-samuel-tulus-betest.onrender.com

1. Web-app : render.com
2. MongoDB : cloud.mongodb.com
3. Redis : redislabs.com
```

### Postman Collection :
```
Please visit folder postman-collection inside root folder to find the example requests.
Add your own environment on postman with these variables and values :
1. url = ms-samuel-tulus-betest.onrender.com
2. path = /api
3. auth = Bearer eyJhbGciOiJIUxxxxx
For auth you can use api "LOGIN" to get the headers authorization. You need to copy the response headers authorization first.
```

### Default Credential :
```
You can use below login credential to get authorization :
username = admin
password = abcdefgh

```