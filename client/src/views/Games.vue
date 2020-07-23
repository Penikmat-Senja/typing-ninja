<template>
    <div v-if="times > 0">
  <div class="about">
    <h3>{{times}}</h3>
    <button @click="countDown">play</button>
    <h1>{{messages}}</h1>
    <form @submit.prevent="submitAnswer">
      <input type="text" v-model="inputan" />

      <button type="submit">OK</button>
    </form>
    </div>
    </div>
    <div v-else>

<p>cek</p>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000");
export default {
  data() {
    return {
      messages: "",
      inputan: "",
      times: 20,
    };
       
  },
  methods: {
    submitAnswer() {
      if (this.messages === this.inputan) {
        localStorage.score = Number(localStorage.score) + Number(10);
        socket.emit("katakata", payload => {
          //  this.messages = payload.content;
        });
        this.inputan = "";
      }
      console.log(this.score);
    },
    countDown() {
      //  setInterval(( )=> {
      //   this.times -= 1;

        socket.emit("time", payload => {
          //  this.messages = payload.content;
        });
      // }, 1000);
      // console.log(this.times);
    socket.on("time", payload => {
      console.log(payload, "listener new message");
      this.times = payload;
    });
    }
  },
  created() {
    socket.on("sentences", payload => {
      console.log(payload, "listener new message");
      this.messages = payload.content;
    });
  }
};
</script>
