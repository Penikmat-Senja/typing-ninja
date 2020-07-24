<template>
    <tr>
      <th scope="row">{{idx+1}}</th>
      <td>{{user["username"]}}</td>
      <td>{{user["score"]}}</td>
    </tr>
</template>


<script>
import io from "socket.io-client";
import router from '../router'
const socket = io("https://nameless-fjord-30696.herokuapp.com");
export default {
  data() {
    return {
      messages: "",
    };
       
  },
  props : ['user','idx'],
  created() {
    console.log(this.user, "this.user")
    console.log(this.idx, "idx")
  }
};
</script>
