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
let times = 10
let tempUser = []
const getRandom = () => { return dictionaries[Math.floor(Math.random() * dictionaries.length)] };

let user = [{ username: 'bima', score: '50' },
            { username: 'herlian', score: '80' },
            { username: 'abdullah', score: '100' },
            { username: 'heriant0', score: '9999' },]
io.on('connection', (socket) => {
  // socket.broadcast.emit('time', 10);
  let limit 
  socket.on('time', () => {

    limit = setInterval(() => {
      times -= 1
      // socket.broadcast.emit('time', times);
      // socket.broadcast('time', times);
      socket.broadcast.emit('time', times)
      io.emit('time', times);
    }, 1000);

  })

  socket.on("changeScore", function (dataUser) {
    for( let i = 0 ; i<user.length;i++){
      if(user[i].username == dataUser.username){
        user[i].score = dataUser.score
        break
      }
    }
    console.log(dataUser, "dataUser setelah update app.js")
  })

  socket.on("katakata", function () {
    let temp = getRandom()
    socket.broadcast.emit('sentences', temp)
    // socket.emit('sentences', temp);
    io.emit('sentences', temp);
    count = 5000
  })

  let randomKata
  randomKata = setInterval(function () {
    io.emit('sentences', getRandom());
  }, count);


  socket.on("sendMessage", function (messageDariClient) {
    io.emit("new-message", messageDariClient)
  })

  socket.on("resultScore", function () {
    socket.broadcast.emit('sentences', user)

    socket.emit('scores', user.sort(function(a, b) {
        return b.score - a.score;
    }));
    times = 10
    // io.emit('scores', user);
  })

  
  socket.on('addplayer', data => {
    user.push(data)
    tempUser.push(data)
    console.log(tempUser, "tempUser")
    if(tempUser.length >= 2){
      io.emit("allowPlay", true)
    } else {
      io.emit("allowPlay", false)
    }
    console.log(user);
  })

  socket.on('resetTime', data => {
    clearInterval(limit)
    clearInterval(randomKata)
    times = 10
  })

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});
