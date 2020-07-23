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


console.log('RANDOM >>>>>>>>>>>>>>>>>>>');
const getRandom = () => { return dictionaries[Math.floor(Math.random() * dictionaries.length)] }; 
let data = getRandom()

io.on('connection', (socket) => {
  setInterval(function () {
    socket.emit('sentences', getRandom());
  }, 1000);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
