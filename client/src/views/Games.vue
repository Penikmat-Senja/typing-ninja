<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10">
        <div v-if="times > 0">
          <div class="about">
            <h1 style="font-size: 70px">{{times}}</h1>
            <button class="btn btn-secondary" @click="countDown" v-if="allowPlay">Play</button>
            <h3>{{messages}}</h3>
            <button class="btn btn-secondary" @click="reset">Stop Game</button>
            <br />
            <br />
            <form @submit.prevent="submitAnswer">
              <textarea class="form-control" v-model="inputan" rows="5" cols="10" style="font-size: 30px"/>
              <br />
              <button class="btn btn-secondary" type="submit">OK</button>
            </form>
          </div>
        </div>
        <div v-else>
          <!-- <button @click="resultScore"> see result score </button> -->
          <button class="btn btn-secondary" @click="newGame">New Game</button>
          <p>Congratulation</p>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              <List v-for="(user, idx) in scoreBoard" :key="idx" :idx="idx" :user="user"></List>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import router from "../router";
import List from "../components/List";

const socket = io("https://nameless-fjord-30696.herokuapp.com");
export default {
  data() {
    return {
      messages: "",
      inputan: "",
      times: 60,
      scoreBoard: [],
      isShowScore: false,
      allowPlay: false,
    };
  },
  components: {
    List,
  },
  methods: {
    submitAnswer() {
      if (this.messages === this.inputan) {
        let dataUser = {
          username: localStorage.name,
          score: localStorage.score,
        };
        localStorage.score = Number(localStorage.score) + Number(10);

        socket.emit("changeScore", dataUser);

        socket.emit("katakata");
        this.inputan = "";
      }
      console.log(this.score);
    },
    countDown() {
      this.submitAnswer();

      socket.emit("time", (payload) => {});

      socket.on("time", (payload) => {
        console.log(payload, "current time");
        this.times = payload;
      });
    },
    resultScore() {
      socket.emit("resetTime");
      socket.emit("resultScore");
      socket.on("scores", (result) => {
        console.log(result, "resultscore");
        this.scoreBoard = result;
        console.log(this.scoreBoard, "resultscore");
      });
      socket.emit("resetTime");
      this.isShowScore = true;
    },
    reset() {
      this.times= 60
      socket.emit("resetTime");
    },
    newGame() {
      socket.emit("resetTime");
      localStorage.clear();
      this.isShowScore = false;
      router.push({ path: "/" });
    },
  },
  watch: {
    times: function (newTimes, oldTimes) {
      if (newTimes <= 0) {
        this.resultScore();
      }
    },
  },
  created() {
    socket.on("sentences", (payload) => {
      console.log(payload, "soal baru");
      this.messages = payload.content;
    });
    socket.on("time", (times) => {
      console.log(times, "time");
      this.times = times;
    });
    socket.on("allowPlay", (boolean) => {
      console.log(boolean, "allowPlay");
      this.allowPlay = boolean;
    });
  },
};
</script>
