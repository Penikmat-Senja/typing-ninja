<template>
  <div class="about">
    <h1>{{messages}}</h1>
    <form @submit.prevent="submitAnswer">
      <input type="text" v-model="inputan" />

      <button type="submit">OK</button>
    </form>
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
    };
  },
  methods: {
    submitAnswer() {
      if (this.messages === this.inputan) {
        localStorage.score = Number(localStorage.score) + Number(10);
        socket.emit("katakata", (payload) => {
          //  this.messages = payload.content;
        });
      }
      console.log(this.score);
    },
  },
  created() {
    socket.on("sentences", (payload) => {
      console.log(payload, "listener new message");
      this.messages = payload.content;
    });
  },
};
</script>
