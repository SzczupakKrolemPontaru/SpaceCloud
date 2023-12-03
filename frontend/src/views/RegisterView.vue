<template>
  <h1>Personal Cloud Storage</h1>
  <div class="formDiv">
    <form>
      <h2>Create an account</h2>
      <div>
        <label for="userName" class="form-label">User Name</label>
        <input type="text" id="userName" placeholder="Username" class="form-control" v-model="uName" />
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
      <div>
        <label for="passwordConfirm" class="form-label">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          class="form-control"
          placeholder="Confirm Password"
          v-model="passwordConfirm"
        />
        <div class="alert alert-danger" role="alert" v-if="showError">
          Passwords do not match
        </div>
      </div>
      <button @click="submitFormRegister" type="submit" class="btn btn-outline-success">
        Confirm
      </button>
      <b>Already have an account? <a @click="goToLoginPage">Login</a></b>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      uName: "",
      password: "",
      passwordConfirm: "",
      showError: false,
    };
  },
  methods: {
    goToLoginPage() {
      this.$router.push({ name: "login" });
    },
    submitFormRegister() {
      event.preventDefault();
      if (this.password.valueOf() !== this.passwordConfirm.valueOf()) {
        this.showError = true;
        console.log("Passwords did not match, user was not created!");
        return;
      } else {
        const formData = {
          userName: this.uName,
          userPassword: this.password,
        };
        axios
          .post("http://localhost:8090/api/users", formData)
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
          this.$router.push({ name: "login", query: { userCreated: true }});
      }
    },
  },
  watch: {
    passwordConfirm() {

      if (this.password.valueOf() !== this.passwordConfirm.valueOf()) {
        this.showError = true;
      }
      else {
        this.showError = false;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  position: fixed;
  top: 22%;
}
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
  margin-top: 1%;
  width: 50%;
}
p {
  margin-top: 4%;
  margin-left: 5%;
}
.alert {
  position: relative;
  left: 0%;
  width: 50%;
  margin-top: 2%;
  height: 5%;
}
h1 {
  position: absolute;
  top: 5%;
  left: 30%;
  font-size: 80px;
}
b:hover {
  color: #007BFF;
}

</style>
