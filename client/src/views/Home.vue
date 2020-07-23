<template>
  <div>

    <ul>
      <li v-for="(newMmessage, i) in messages" :key="i">
        {{ newMmessage.message }}
        sender: {{ newMmessage.sender }}
        {{ newMmessage.sender ===  sender ? "" : "ini pesan dari orang yang berbeda"  }}
      </li>
    </ul>

    <input type="text" v-model="message">
    <button @click="sendMessage">Send message</button>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000")

export default {
  name: 'Home',
  data() {
    return {
      message: "",
      messages: [],
      sender: ""
    }
  },
  methods: {
    sendMessage() {
      this.messages.push({
        message: this.message,
        sender: localStorage.name
      })
      socket.emit("sendMessage", {
        message: this.message,
        sender: localStorage.name
      })
      console.log(this.message)
    },
  },
  created() {
    this.sender = localStorage.name
    socket.on("visited", (payload) => {
      console.log(payload)
    })

    socket.on("new-message",  (payload) => {
      console.log(payload, "listener new message")
      this.messages.push(payload)
    })
  }
}
/*
saya akan membuat aplikasi chat
ketika ada orang yang clik button msg
maka akan mengirim pesan ke server lalu server mengembalikkan ke client
*/ 
/*
  klow orang lain mengirim pesan,
  maka li nya menjadi warna yang berbeda

  1. mengirim pesan sudah bisa
  2. dalam bentuk object 
   {
     message: this.message,
     sender: localStorage.name
   }
*/
</script>
