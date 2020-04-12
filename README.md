# API
A REST API made with Expressjs

# Currently Implemented Routes

| Method   | Route     | Description                                                               | Returns                         | Error(s)                                                                     |
| -------- | --------- | ------------------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| **GET**  | `/equipment`       | Gets all equipment                                                        | 200 with an array of JS objects | 500 if server error                                                          |
| **POST** | `/equipment/new`    | Creates an equipment object, autogenerating ID and QR code                | 200 with the new object         | throws 500 if the insert fails                                               |
| **PUT**  | `/equipment/new`    | Creates an equipment object, autogenerating ID and QR code, same as above | 200 with the new object         | throws 500 if the insert fails                                               |
| **GET**  | `/equipment/:id`    | Gets equipment object represented by `id`                                 | 200 with the object             | 404 if object not found, throws 500 if the find fails                        |
| **POST** | `/equipment/update` | Updates an equipment object                                               | 200 with the updated object     | throws 404 if the doc with `ID` is not found, throws 500 if the update fails |
| **POST** | `/equipment/delete` | Deletes an equipment object                                               | 200 with happy message| throws 500 if the delete fails |


**Sample JSON response from /equipment/new**
```JSON
{
    "daysOver": 0,
    "_id": -9000,
    "dateOfLastService": "2020-04-03T01:21:00.353Z",
    "qrCode": {
        "id": "D8X44TU",
        "title": null,
        "description": null,
        "datetime": 1585876860,
        "type": "image/png",
        "animated": false,
        "width": 150,
        "height": 150,
        "size": 989,
        "views": 0,
        "bandwidth": 0,
        "vote": null,
        "favorite": false,
        "nsfw": null,
        "section": null,
        "account_url": null,
        "account_id": 0,
        "is_ad": false,
        "in_most_viral": false,
        "has_sound": false,
        "tags": [],
        "ad_type": 0,
        "ad_url": "",
        "edited": "0",
        "in_gallery": false,
        "deletehash": "1WjzBdabPs07jUM",
        "name": "",
        "link": "https://i.imgur.com/D8X44TU.png"
    },
    "__v": 0
}
```
