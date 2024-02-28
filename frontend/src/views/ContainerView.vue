<template>
  <div>
    <h1>Personal Cloud Storage of {{ this.$store.getters.getUserName }}</h1>
    <table class="table table-bordered table-hover table_transparent">
      <tbody>
        <tr v-for="(file, index) in blobFiles" :key="index">
          <td>
            <b>{{ file.name }}</b>
          </td>
          <td>{{ formatDate(file.versionId) }}</td>
          <td>
            <button
              @click="downloadFile(file.name)"
              type="button"
              class="btn btn-success"
            >
              Download
            </button>
          </td>
          <td>
            <button
              @click="deleteFile(file.name)"
              type="button"
              class="btn btn-danger"
            >
              Delete
            </button>
          </td>
          <td>
            <select v-model="file.selectedVersion">
              <option disabled value="">Select version</option>
              <option
                v-for="version in file.versions"
                :key="version.versionId"
                :value="version.versionId"
              >
                {{ formatDate(version.versionId) }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      id="dropzone"
      @dragover.prevent
      @dragenter.prevent
      @drop="handleFileUpload"
    >
      Przenies pliki tutaj
    </div>
    <button id="logoutBTN" @click="logout" class="btn btn-outline-success">
      Logout
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import saveAs from 'file-saver';
import moment from 'moment';
import Notiflix from 'notiflix';

export default {
  data() {
    return {
      blobFiles: [],
      moment: moment,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/blob/${this.$store.getters.getUserName}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUserToken}`,
        },
      })
      .then((response) => {
        this.blobFiles = response.data;
        this.blobFiles = this.blobFiles.map((file) => ({
          ...file,
          selectedVersion: file.versionId,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    deleteFile(fileName) {
      axios
        .delete(
          `http://localhost:3000/blob/${this.$store.getters.getUserName}/${fileName}`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUserToken}`,
            },
          }
        )
        .then(() => {
          this.refreshToken();
          this.refreshTableData();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    refreshTableData() {
      axios
        .get(`http://localhost:3000/blob/${this.$store.getters.getUserName}`, {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getUserToken}`,
          },
        })
        .then((response) => {
          this.blobFiles = response.data;
          this.blobFiles = this.blobFiles.map((file) => ({
            ...file,
            selectedVersion: file.versionId,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleFileUpload(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let formData = new FormData();
        formData.append('file', file);
        axios
          .post(
            `http://localhost:3000/blob/${this.$store.getters.getUserName}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUserToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            this.refreshToken();
            this.refreshTableData();
            return response.data;
          })
          .catch((error) => {
            console.error(error);
            if (error.response.status === 403) {
              Notiflix.Report.failure(
                'Error',
                'Your session is expired, please login again',
                '<-- Login page',
                () => {
                  this.$router.push({ name: 'login' });
                }
              );
            }
          });
      }
    },
    downloadFile(fileName) {
      axios
        .get(
          `http://localhost:3000/blob/${
            this.$store.getters.getUserName
          }/${fileName}/${
            this.blobFiles.find((file) => file.name === fileName)
              .selectedVersion
          }`,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getUserToken}`,
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
          }
        )
        .then((response) => {
          saveAs(new Blob([response.data]), fileName);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async refreshToken() {
      let refreshTokenData = {
        userName: this.$store.getters.getUserName,
        token: this.$store.getters.getUserToken,
      };
      axios
        .post(`http://localhost:3000/users/token`, refreshTokenData)
        .then((response) => {
          this.$store.dispatch('setToken', response.data.token);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      let logoutData = {
        userName: this.$store.getters.getUserName,
        token: this.$store.getters.getUserToken,
      };
      this.$store.dispatch('clearToken');
      this.$store.dispatch('clearUserName');
      axios.delete('http://localhost:3000/users/logout', logoutData);
      this.$router.push({ name: 'login' });
    },
    formatDate(dateString) {
      const date = moment(dateString);
      return date.format('YYYY-MM-DD HH:mm:ss');
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
th {
  text-align: left;
}
table {
  border: 2px #000000;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  border-collapse: collapse;
  width: 80%;
}
.table_transparent {
  --bs-table-bg: transparent !important;
}
#dropzone {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border: 2px dashed #000000;
  padding: 4%;
  text-align: center;
  font: bold arial;
  color: #050505;
}
#logoutBTN {
  position: fixed;
  bottom: 0;
  right: 0;
  display: block;
  margin-top: 5%;
  width: 10%;
  font-weight: bold;
}
</style>
```
