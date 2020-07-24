<template>
    <div v-if="times > 0">
  <div class="about">
    <h3>{{times}}</h3>
    <button @click="countDown" v-if="allowPlay">play</button>
    <h1>{{messages}}</h1>
    <button @click="reset"> reset game </button>

    <form @submit.prevent="submitAnswer">
      <input type="text" v-model="inputan" />

      <button type="submit">OK</button>
    </form>
    </div>
    </div>
    <div v-else>
      <button @click="resultScore"> see result score </button>
      <button @click="newGame"> new Game </button>
      <p>Congratulation</p>
      <table class="table" v-if="isShowScore">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody >

            <List v-for="(user, idx) in scoreBoard" :key="idx" :idx="idx" :user="user"> </List>

        </tbody>
      </table>
    </div>
</template>

<script>
import io from "socket.io-client";
import router from '../router'
import List from '../components/List'

const socket = io("http://localhost:3000");
export default {
  data() {
    return {
      messages: "",
      inputan: "",
      times: 20,
      scoreBoard: [],
      isShowScore: false,
      allowPlay: false,
    };
  },
  components: {
    List
  },
  methods: {
    submitAnswer() {
      if (this.messages === this.inputan) {
        let dataUser = {
          username: localStorage.name,
          score: localStorage.score,
        }
        localStorage.score = Number(localStorage.score) + Number(10);
        
        socket.emit("changeScore", dataUser)

        socket.emit("katakata");
        this.inputan = "";
      }
      console.log(this.score);
    },
    countDown() {
      this.submitAnswer()

      socket.emit("time", payload => {
      });

      socket.on("time", payload => {
        console.log(payload, "current time");
        this.times = payload;
      });
    },
    resultScore() {
      socket.emit("resetTime" );
      socket.emit("resultScore");
      socket.on("scores", result => {
        console.log(result, "resultscore");
        this.scoreBoard = result
        console.log(this.scoreBoard, "resultscore");
      });
      socket.emit("resetTime");
      this.isShowScore=true;
    },

    reset() {
      this.times= 20
      socket.emit("resetTime");
    },
    newGame(){
      socket.emit("resetTime");
      localStorage.clear();
      this.isShowScore=false;
      router.push({ path: "/"})
    }
  },
  created() {
    socket.on("sentences", payload => {
      console.log(payload, "soal baru");
      this.messages = payload.content;
    });
    socket.on("time", times => {
      console.log(times, "time");
      this.times = times;
    });
    socket.on("allowPlay", boolean => {
      console.log(boolean, "allowPlay");
      this.allowPlay = boolean;
    });
  }
};
</script>
