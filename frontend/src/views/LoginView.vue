<template>
  <h1>Personal Cloud Storage</h1>
  <div class="formDiv">
    <form>
      <div class="alert alert-danger" role="alert" v-if="showAlert">
        Invalid username or password
      </div>
      <div>
        <label for="userName" class="form-label">User Name</label>
        <input
          type="text"
          placeholder="Username"
          id="userName"
          class="form-control"
          v-model="uName"
        />
      </div>
      <div>
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button @click="submitFormLogin" class="btn btn-outline-success">
        Login
      </button>
      <b @click="goToRegisterView">Create an account</b>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      uName: '',
      password: '',
      showAlert: false,
    };
  },
  methods: {
    goToRegisterView() {
      this.$router.push({ name: 'register' });
    },
    submitFormLogin() {
      event.preventDefault();
      if (this.uName === '' || this.password === '') {
        this.showAlert = true;
        return;
      }
      const formData = {
        userName: this.uName,
        userPassword: this.password,
      };
      axios
        .post(`http://localhost:3000/users/login`, formData)
        .then((response) => {
          const userData = response.data;
          if (userData.userName === formData.userName) {
            this.$store.commit('setUserName', formData.userName);
            this.$store.commit('setToken', userData.token);
            this.$router.push({
              name: 'container',
            });
          } else {
            this.showAlert = true;
          }
        })
        .catch((err) => {
          console.log(err);
          alert('User does not exist');
        });
    },
  },
};
</script>

<style scoped>
.formDiv {
  width: 40%;
  height: 60%;
  margin: 0 auto;
  border: 2px solid black;
  position: absolute;
  top: 20%;
  left: 30%;
  background-color: #f5f5f5;
}
form {
  position: relative;
  left: 25%;
  top: 15%;
}
input {
  width: 50%;
  margin-top: 0%;
  margin-bottom: 5%;
}
button {
  display: block;
  top: 10%;
  margin-top: 5%;
  width: 50%;
  left: 25%;
  font-weight: bold;
}
b {
  display: block;
  cursor: pointer;
}
b:hover {
  color: #007bff;
}
h1 {
  position: absolute;
  top: 5%;
  left: 30%;
  font-size: 80px;
}
.alert {
  width: 50%;
}
</style>
