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
    </form>
    <button @click="submitFormLogin" class="btn btn-outline-success">
        Submit
      </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uName: "",
      password: "",
    };
  },
  methods: {
    goToRegisterView() {
      this.$router.push({ name: "register" });
    },
    submitFormLogin() {
      const userName = this.uName;
      axios
        .get(`http://localhost:8090/api/users/${userName}`)
        .then((response) => {
          const userData = response.data[0];
          if(this.password === userData.userPassword) {
            this.$router.push({ name: 'container' })
          } else {
            this.$router.push({ name: 'container' });
            alert("Incorrect password");
          }
        })
        .catch((error) => {
          alert("User does not exist");
          console.error(error);
        });
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
  top: 60%;
  margin-top: 15%;
  width: 50%;
  left: 25%;
}
a {
  position: absolute;
  top: 100%;
  left: 13%;
  margin-top: 5%;
}
</style>
