# API
A REST API made with Expressjs

# Currently Implemented Routes

| Method   | Route     | Description                                                               | Returns                         | Error(s)                                                                     |
| -------- | --------- | ------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| **GET**  | `/`       | Gets all equipment                                                        | 200 with an array of JS objects | 500 if server error                                                          |
| **POST** | `/new`    | Creates an equipment object, autogenerating ID and QR code                | 200 with the new object         | throws 500 if the insert fails                                               |
| **PUT**  | `/new`    | Creates an equipment object, autogenerating ID and QR code, same as above | 200 with the new object         | throws 500 if the insert fails                                               |
| **GET**  | `/:id`    | Gets equipment object represented by `id`                                 | 200 with the object             | 404 if object not found, throws 500 if the find fails                        |
| **POST** | `/update` | Updates an equipment object                                               | 200 with the updated object     | throws 404 if the doc with `ID` is not found, throws 500 if the update fails |
