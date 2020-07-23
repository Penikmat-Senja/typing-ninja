const express = require("express")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
const mainRoute = require('./routes/mainRoute');
const dictionaries = require('./dictionaries.json')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', mainRoute);
let count = 100000
let times = 20
const getRandom = () => { return dictionaries[Math.floor(Math.random() * dictionaries.length)] };

let user = []
io.on('connection', (socket) => {
  // socket.broadcast.emit('time', 20);

  socket.on('time', () => {

    let limit = setInterval(() => {
      times -= 1
      io.emit('time', times);
    }, 1000);

  })

  socket.on("katakata", function () {
    let temp = getRandom()
    // socket.broadcast.emit('sentences', temp)
    // socket.emit('sentences', temp);
    io.emit('sentences', temp);
    count = 100000
  })
  setInterval(function () {
    io.emit('sentences', getRandom());
  }, count);


  socket.on("sendMessage", function (messageDariClient) {
    io.emit("new-message", messageDariClient)
  })


  socket.on('addplayer', data => {
    user.push(data)
    console.log(user);
  })

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
