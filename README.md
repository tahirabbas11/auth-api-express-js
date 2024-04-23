# Authentication using Express js

## Project Link
[Project Repository](https://github.com/tahirabbas11/auth-api-express-js)

Brief description of your project.

## Technologies Used
- Express.js
- Node.js
- MongoDB (or any other relevant technologies)

## Endpoints

### Authentication Endpoints
- **Login:** `POST http://localhost:4000/auth/login`
- **Logout:** `POST http://localhost:4000/auth/logout`
- **Register:** `POST http://localhost:4000/auth/register`
- **Refresh Token:** `POST http://localhost:4000/auth/refreshToken`

### Protected Endpoint
- **Access Protected Route:** `GET http://localhost:4000/` Requires access token in the request headers.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/tahirabbas11/auth-api-express-js.git
   cd auth-api-express-js
   ```
2. Copy the example environment file and configure your environment variables:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and exectute it:
   ```bash
      npm i
      npm start
      ````
      this command is optional to make code formatted 
      ```bash
      npm pretty
      ```
## Requirements
- Node.js (version >= 12)
- MongoDB (or any other required services)

## Code Structure
```bash
|-- controllers/ :      Contains route handlers (controllers).
|-- models/ :           Contains Mongoose models.
|-- routes/ :           Contains route definitions.
|-- services/ :         Contains business logic (services).
|-- utils/ :            Contains utility functions.
|-- .env :              Environment variables file.
|-- app.js :            Entry point of the application.
|-- package.json :      File containing dependencies and metadata.
```


## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

We welcome contributions! If you'd like to contribute to this project, please consider making a pull request (PR). Follow these steps:

- Fork the repository.
- Clone your forked repository to your local machine.
- Create a new branch for your contribution:
   ```bash
   git checkout -b feature/new-feature
   git commit -m "Brief description of your changes"

## Credits

- [Tahir Abbas](https://github.com/tahirabbas11) - Creator

## Contact

For any inquiries or feedback, feel free to contact us at [tahir.12868@iqra.edu.pk](mailto:tahir.12868@iqra.edu.pk).


# auth-api-express-js
