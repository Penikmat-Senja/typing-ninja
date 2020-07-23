<template>
  <div class="about">
        <h1> {{messages}} </h1>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:3000")
export default {
  data() {
    return {
      messages: []
    }
  },
  created() {
    socket.on("sentences", (payload) => {
      console.log(payload, "listener new message")
      this.messages = payload.content;
    });
  },
}
</script>
