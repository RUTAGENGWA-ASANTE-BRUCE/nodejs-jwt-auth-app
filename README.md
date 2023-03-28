# Nodejs Microservice API with Express & JsonPatch

This Node.js API allows users to login and apply JSON patches to documents.

### Getting Started

1. Clone the repository: `git clone https://github.com/RUTAGENGWA-ASANTE-BRUCE/nodejs-jwt-auth-app`

2. Build the Docker image: `docker build -t test_nodejs_microservice .`

3. Start the server: `docker-compose up`

The server will start on port 3400 by default. You can change the port by editing the docker-compose.yml file.

## API Endpoints

#### POST /api/login

This endpoint allows users to login and obtain an access token that can be used to access protected endpoints.

### Request

    - Method: `POST`
    - URL: `/api/login`
    - Headers:
        . Content-Type: `application/json`
    - Body: `{
            "username": "myusername",
            "password": "mypassword"
        }`

### Response

    - Status Code: 200
    - Body: `{
            "token": "my_access_token"
        }`

#### POST /api/apply-json-patch

This endpoint applies a JSON patch to a document.

### Request

    - Method: `PATCH`
    - URL: `/api/apply-json-patch`
    - Headers:
        . Content-Type: `application/json`
        . Authorization: `Bearer my_access_token`
    - Body: `{
            "document": {
                "foo": "bar"
            },
            "patch": [
                {
                    "op": "add",
                    "path": "/baz",
                    "value": "qux"
                }
            ]
        }`

### Response

    - Status Code: 200
    - Body: `{
            "result": {
                "foo": "bar",
                "baz": "qux"
            }
        }`

## Dependencies

    - Express
    - JsonWebToken
    - JsonPatch
