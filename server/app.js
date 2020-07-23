const express = require("express")
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')

app.use(cors())
// app.use(express.json())

app.get('/', (req, res) => {
  res.send("hello world")
});

io.on('connection', (socket) => {
  let  data = 
    [
      {
        name :'jaja',
        score: 3,
      },
      {
        name :'miharja',
        score: 6,
      },
    ]
  
  data.push({ name: 'sukro', score: 4 })
  
  
  console.log('a user connected');
  // ketika ada orang yang terkoneksi socket yang diserver
  // saya akan ngbuat event emitter untuk client
  socket.emit('visited', "Hi kamu berhasik konek ke server kami");

  socket.on("sendMessage", function (messageDariClient) {
    data.push({ name: messageDariClient.sender, score: 4 })
    socket.emit('new-message', messageDariClient);
    // io.emit("new-message", messageDariClient)
  })
  
  console.log(data);
  // app.set("io", {
  //   io: io,
  //   socket: socket
  // })
});


// req.app.socket
// req.app.io
http.listen(3000, () => {
  console.log('listening on *:3000');
});
