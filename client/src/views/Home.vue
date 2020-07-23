<template>
  <div class="container">
  <form @submit.prevent="userLogin" >
  <div class="form-group">
    <label for="username">Your Name</label>
    <input v-model="username" type="text" class="form-control" id="username" aria-describedby="emailHelp">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    userLogin() {
      this.$store.dispatch('addUser', this.username);

    }
  }

}
</script>