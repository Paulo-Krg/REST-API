const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

// Route definition:
// Sets URI endpoints to request resources
// Defines the URN and a callback function to work as a handler
// The callback receives a request and a response object as default params
// req = incoming data from the request
// res = outgoing data
app.get("/", (req, res) => {
	res.send(`Got a ${req.method} request`);
});
// curl http://localhost:8080/

app.post("/", function (req, res) {
	res.send("Got a POST request");
});
// curl -Method POST http://localhost:8080/

app.put("/", function (req, res) {
	res.send("Got a PUT request");
});
// curl -Method PUT http://localhost:8080/

app.delete("/", function (req, res) {
	res.send("Got a DELETE request");
});
// curl -Method DELETE http://localhost:8080/

app.get("/hello", (req, res) => {
	res.status(200).send({
		message: "Hello message",
		type: "greeting",
	});
});
// curl http://localhost:8080/hello

app.post("/tshirt/:id", (req, res) => {
	const { id } = req.params; // gets the id from the url
	const { logo } = req.body; // gets data from the request body

	if (!logo) {
		res.status(418).send({ message: "We need a logo!" });
	}

	res.send({
		tshirt: `tshirt with your ${logo} and ID of ${id}`,
	});
});
// curl -Method POST -Body '{"logo": "test logo"}' http://localhost:8080/tshirt/23

// Middlewares:

// How to handle a 404 response:
// Add a middleware function at the very bottom of the stack (below all other functions)
app.use(function (req, res, next) {
	res.status(404).send("Sorry can't find that!");
});

// How to define error-handling middleware:
// In the same way as other middleware, but with 4 arguments instead of 3
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Starts the API on the server
// Defines a port and a callback function
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
