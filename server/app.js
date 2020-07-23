const express = require("express")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const mainRoute = require('./routes/mainRoute');
const dictionaries = require('./dictionaries.json')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', mainRoute);
let count = 10000

const getRandom = () => { return dictionaries[Math.floor(Math.random() * dictionaries.length)] }; 

io.on('connection', (socket) => {
  socket.on("katakata", function () {
    let temp =  getRandom()
    // socket.broadcast.emit('sentences', temp)
    // socket.emit('sentences', temp);
    io.emit('sentences', temp);
    count = 10000
    })
  setInterval(function () {
    // socket.broadcast.emit('sentences', getRandom());
    io.emit('sentences', getRandom());
  }, count);
  
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
