import express from "express";
import mysql from "mysql"

const app = express()

const db = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"alexandru95",
    database:"test",
    port: 3310
})

app.use(express.json())

app.get("/",(req,res) =>{
    res.json("hello im ovidiu")
})

// Get operation

app.get("/movies", (req,res) => {
    const q = "SELECT * FROM movies"
    console.log("123")
    db.query(q,(err,data)=>{
        console.log(data)
        console.log(err)
        if(err) return res.json(err)
        return res.json(data)
    })
})

//Get operation by ID

app.get('/movies/:id', (req, res) => {
    const movieId = req.params.id;

    const query = 'SELECT * FROM movies WHERE id = ?';

    db.query(query, [movieId], (err, results) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Movie not found');
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

//Post operation


app.post("/movies", (req, res) => {
    const q = "INSERT INTO movies (`idmovies`, `title`, `Description`, `cover`) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.idmovies, 
        req.body.title,
        req.body.Description, 
        req.body.cover
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json("Movie has been added");
    });
});

//Update operation

app.put("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const { title, Description, cover } = req.body;

    if (!title && !Description && !cover) {
        return res.status(400).json("At least one field (title, Description, cover) is required for update");
    }

    const q = "UPDATE movies SET title = ?, Description = ?, cover = ? WHERE idmovies = ?";
    const values = [title, Description, cover, movieId];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);

        if (data.affectedRows === 0) {
            return res.status(404).json("Movie not found");
        }

        return res.json("Movie has been updated");
    });
});

//Delete operation

app.delete("/movies/:id", (req, res) => {
    const movieId = req.params.id;
    const q = "DELETE FROM movies WHERE idmovies = ?";

    db.query(q, [movieId], (err, data) => {
        if (err) return res.json(err);
        
        if (data.affectedRows === 0) {
            return res.status(404).json("Movie not found");
        }

        return res.json("Movie has been deleted");
    });
});

app.listen(8000,() => {
    console.log("Connected to backend")
})