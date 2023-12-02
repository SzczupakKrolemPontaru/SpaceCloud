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
      <div>
        <label for="passwordConfirm" class="form-label">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          class="form-control"
          v-model="passwordConfirm"
        />
        <div class="alert alert-danger" role="alert" v-if="showError">
          Passwords do not match
        </div>
      </div>
      <button @click="submitFormRegister" type="submit" class="btn btn-outline-success">
        Submit
      </button>
      <p>Already have an account? <a @click="goToLoginPage">Login</a></p>
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
      if (this.password !== this.passwordConfirm) {
        this.showError = true;
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
      }
    },
  },
  watch: {
    passwordConfirm() {
      if (this.password !== this.passwordConfirm) {
        this.showError = true;
      }
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
  top: 5%;
}
input {
  width: 50%;
}
button {
  margin-top: 4%;
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
</style>
