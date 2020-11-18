const express = require('express');
const bodyPartser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyPartser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/jokesDB',{useNewUrlParser: true, useUnifiedTopology: true});

const jokeSchema = {
    title: String,
    connect: String
};

const Joke = mongoose.model('Joke', jokeSchema);

app.route('/jokes')//можно писать так, чтобы было меньше места занимало
.get(
    (req, res) => {
    console.log(req.body.title);
    console.log(req.body.connect);
    let newJoke = new Joke({
        title: req.body.title,
        connect: req.body.connect
    });
    newJoke.save((error)=>{
        if(!error){
            res.send('Data sent.');
        }else{
            res.send(error);
        }
    });
})
.post(
    (req, res) => {
    console.log(req.body.title);
    console.log(req.body.connect);
    let newJoke = new Joke({
        title: req.body.title,
        connect: req.body.connect
    });
    newJoke.save((error)=>{
        if(!error){
            res.send('Data sent.');
        }else{
            res.send(error);
        }
    });
})
.delete(
    (req, res)=>{
    Joke.deleteMany((error)=>{//удалить все
      if (!error) {
        res.send("Successfully deleted all records.");
      }else{
          res.send(error);
      }
    })
});
/*
app.get('/jokes',(req, res)=>{
    Joke.find((error, jokes)=>{
        if(!error){
            res.send(jokes);
        }else{
            res.send(error);
        }
    });
});

app.post('/jokes', (req, res) => {
    console.log(req.body.title);
    console.log(req.body.connect);
    let newJoke = new Joke({
        title: req.body.title,
        connect: req.body.connect
    });
    newJoke.save((error)=>{
        if(!error){
            res.send('Data sent.');
        }else{
            res.send(error);
        }
    });
});

app.delete('/jokes', (req, res)=>{
    Joke.deleteMany((error)=>{//удалить все
      if (!error) {
        res.send("Successfully deleted all records.");
      }else{
          res.send(error);
      }
    })
});
*/


//to get a joks

app.route("/jokes/:jokeTitle")
.get(
    (req, res)=>{
        Joke.updateOne({title: req.params.jokeTitle}, (error, jokeFound) =>{
            if(jokeFound){
                res.send(jokeFound);
            }else{
                res.send("NO documet found");
            }
        })
    })
.put((req,res)=> {
    Joke.updateOne(
        {title: req.params.jokeTitle},//откуда получаем
        {title: req.body.title, content: req.body.connect},
        {overwrite: true},
        (error)=> {
            if(!error){
                res.send('Document updatd!');
            }else{
                res.send(error);
            }
        })
})
.delete((req,res)=>{
    Joke.deleteOne(
        {title: req.params.jokeTitle},
        (error)=>{
            if(!error){
                res.send("Document deleted.");
            }else{
                res.send(error);
            }
        })
});

/*
app.get("/jokes/:jokeTitle",/* (req, res)=>{
    Joke.updateOne({title: req.params.jokeTitle}, (error, jokeFound) =>{
        if(jokeFound){
            res.send(jokeFound);
        }else{
            res.send("NO documet found");
        }
    })
});


app.put("/jokes/:jokeTitle",/* (req,res)=> {
    Joke.updateOne(
        {title: req.params.jokeTitle},//откуда получаем
        {title: req.body.title, content: req.body.connect},
        {overwrite: true},
        (error)=> {
            if(!error){
                res.send('Document updatd!');
            }else{
                res.send(error);
            }
        }
    )
});

app.delete("/jokes/:jokeTitle",/* (req,res)=>{
    Joke.deleteOne(
        {title: req.params.jokeTitle},
        (error)=>{
            if(!error){
                res.send("Document deleted.");
            }else{
                res.send(error);
            }
        }
    )
});*/

app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
});