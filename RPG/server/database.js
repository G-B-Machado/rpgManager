const pg = require("pg");
const express = require("express");
const app = express();

const config = {
	user: "postgres",
	database: "rpgmanager",
	password: "123456",
	port: 5432 // Default port, change it if needed
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

pool
	.query("select * from ficha")
	.then(res => console.log(res.rows))
	.catch(e => console.error(e.stack));

app.get("/", (req, res, next) => {
	pool.connect(function (err, client, done) {
		if (err) {
			console.log("Can not connect to the DB" + err);
		}
		client.query("SELECT * FROM ficha", function (err, result) {
			done();
			if (err) {
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send(result.rows);
		});
	});
});

app.listen(4000, function () {
	console.log("Server is running.. on Port 4000");
});