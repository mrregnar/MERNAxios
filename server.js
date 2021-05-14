const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")
const mongoose = require('mongoose')
// const { response } = require("express")
const PORT = 3001

app.use(bodyParser.json())
app.use(cors())

//Mongoose
mongoose.connect('mongodb://localhost/moviesDB',  { useNewUrlParser: true, useUnifiedTopology: true  })

//Data Schema
const movieSchema = {
    title: String,
    genre: String,
    year: String
}

const Movie = mongoose.model('Movie', movieSchema)

//my app.get test
app.get('/', (request, response) => {
    response.send('Main Page')
})

app.get('/movies', function(request, response) {
    Movie.find().then(movies => response.json(movies))
})

app.post('/newmovie', function(request, response) {
    const title = request.body.title;
    const genre = request.body.genre;
    const year = request.body.year

    const newMovie = new Movie({
        title,
        genre,
        year
    })

    newMovie.save()
})

app.delete('/delete/:id', function(request, response) {
    const id = request.params.id
    Movie.findByIdAndDelete({_id: id}, function(err){
        if(!err) {
            console.log('movie deleted')
        } else {
            console.log(err)
        }
    })
})

app.listen (PORT, function() {
    console.log(`express is running listening on port: ${PORT}`)
})
