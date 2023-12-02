<template>
  <div class="formDiv">
    <form>
      <div>
        <label for="userName" class="form-label">User Name</label>
        <input type="text" id="userName" class="form-control" v-model="uName" />
      </div>
      <div>
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          v-model="password"
        />
      </div>
      <a @click="goToRegisterView">Create an account</a>
      <button type="submit" class="btn btn-outline-success">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uName: "",
      password: "",
    };
  },
  methods: {
    goToRegisterView() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style scoped>
.formDiv {
  width: 30%;
  height: 50%;
  margin: 0 auto;
  border: 2px solid black;
  position: absolute;
  top: 25%;
  left: 35%;
}
form {
  position: relative;
  left: 25%;
  top: 15%;
}
input {
  width: 50%;
  margin-top: 1%;
  margin-bottom: 2%;
}
button {
  position: absolute;
  top: 100%;
  margin-top: 15%;
  width: 50%;
}
a {
  position: absolute;
  top: 100%;
  left: 13%;
  margin-top: 5%;
}
a:hover {
  background-color: red;
}
</style>
