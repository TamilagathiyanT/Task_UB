DB Connection:
Enter your MongoDB database details in config.env file.
(DATABASE, DATABASE_PASSWORD)

Step 1: Mobile Number Input & OTP send to user
End Point: 127.0.0.1:9000/api/v1/users/
Method: POST

# Sample Reqest:

{
"mobile":"9898989898"
}

# Sample Response:

{
"status": "success",
"data": {
"user": {
"mobile": 9898989898,
"otp": 9999,
"createdAt": "2023-04-26T18:48:54.044Z",
"\_id": "644972537adb0a98c25cde8a",
"\_\_v": 0
}
}
}

Step 2: OTP verification for login
End Point: 127.0.0.1:9000/api/v1/users/
Method: POST

# Sample Reqest:

{
"mobile":"9898989898",
"otp":9999
}

# Sample Response:

{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDk3MjUzN2FkYjBhOThjMjVjZGU4YSIsImlhdCI6MTY4MjUzNTM1NCwiZXhwIjoxNjkwMzExMzU0fQ.QtKSrCkQcaTxMQIT44SF6c7DwvCsIXqBsvl7-cMb0ik",
"data": {
"user": {
"\_id": "644972537adb0a98c25cde8a",
"mobile": 9898989898,
"otp": 9999,
"\_\_v": 0
}
}
}

Step 3: Get All the mobile numbers if user logged in
End Point: 127.0.0.1:9000/api/v1/users/
Method: GET

# Authorization: Bearer Token

# Sample Response:

{
"status": "success",
"results": 2,
"data": {
"users": [
{
"_id": "64496902391349747fd7c531",
"mobile": 9790097900,
"__v": 0
},
{
"_id": "644969cf391349747fd7c539",
"mobile": 9790097911,
"__v": 0
}
]
}
}

Step 4: Update the mobile number if user logged in
End Point: 127.0.0.1:9000/api/v1/users/64496902391349747fd7c531
Method: PATCH

# Authorization: Bearer Token

# Sample Request

{
"mobile":9899009900
}

# Sample Response:

{
"status": "success",
"data": {
"user": {
"\_id": "64496902391349747fd7c531",
"mobile": 9899009900,
"otp": 9999,
"\_\_v": 0
}
}
}

Step 5: Delete the mobile number
End Point: 127.0.0.1:9000/api/v1/users/64496902391349747fd7c531
Method: DELETE

# Authorization: Bearer Token
