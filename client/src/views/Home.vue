<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="userLogin">
          <div class="form-group">
            <label for="username">Your Name</label>
            <input 
              v-model="username"
              type="text"
              class="form-control text-center"
              id="username"
              aria-describedby="emailHelp"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your privacy with anyone else.</small>
          </div>
          <button type="submit" class="btn btn-primary">Lets Rock</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

const socket = io("https://nameless-fjord-30696.herokuapp.com");
export default {
  data() {
    return {
      username: "",
    };
  },
  methods: {
    userLogin() {
      let payload = { username: this.username, score: 0 };
      this.$store.dispatch("addUser", this.username);
      localStorage.name = this.username;
      localStorage.score = Number(0);
      // socket.emit("addplayer", payload => {
      //   //  this.messages = payload.content;
      // });
      socket.emit("addplayer", payload);
    },
  },
};
</script>