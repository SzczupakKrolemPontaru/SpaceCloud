<template>
  <div>
    <h1>Personal Cloud Storage of {{ userName }}</h1>
    <table class="table table-bordered table-hover table_transparent">
      <tbody>
        <tr v-for="(file, index) in blobFiles" :key="index">
          <td><b>{{ file.name }}</b></td>
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
              <option v-for="version in file.versions" :key="version.versionId" :value="version.versionId">
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
import axios from "axios";
import saveAs from "file-saver";
import moment from 'moment';
export default {
  data() {
    return {
      blobFiles: [],
      moment: moment,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/blobs/${this.$store.getters.getUserName}`, {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getUserToken}`,
        },
      })
      .then((response) => {
        this.blobFiles = response.data;
        console.log(this.blobFiles);
        console.log(this.blobFiles[0].versions);
      })
      .catch((error) => {
       console.log(error);
      });
  },
  created() {
    this.blobFiles = this.blobFiles.map(file => ({
      ...file,
      selectedVersion: file.versionId
    }));
  },
  methods: {
    deleteFile(fileName) {
      this.refreshToken().then(() => {
        axios
          .delete(
            `http://localhost:3000/blobs/${this.$store.getters.getUserName}/${fileName}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUserToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.refreshTableData();
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    refreshTableData() {
      this.refreshToken().then(() => {
        axios
          .get(
            `http://localhost:3000/blobs/${this.$store.getters.getUserName}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUserToken}`,
              },
            }
          )
          .then((response) => {
            this.blobFiles = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    handleFileUpload(event) {
      this.refreshToken().then(() => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let formData = new FormData();
          formData.append("file", file);
          axios
            .post(
              `http://localhost:3000/blobs/${this.$store.getters.getUserName}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${this.$store.getters.getUserToken}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((response) => {
              this.refreshTableData();
              return response.data;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    downloadFile(fileName) {
      this.refreshToken().then(() => {
        axios
          .get(
            `http://localhost:3000/blobs/${this.$store.getters.getUserName}/${fileName}`,
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getUserToken}`,
                "Content-Type": "multipart/form-data",
              },
              responseType: "blob",
            }
          )
          .then((response) => {
            saveAs(new Blob([response.data]), fileName);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    async refreshToken() {
      axios
        .get("http://localhost:3000/users/", {
          withCredentials: true,
        })
        .then((response) => {
          this.$store.dispatch("setToken", response.data.accessToken);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      this.$store.dispatch("clearToken");
      this.$store.dispatch("clearUserName");
      this.$router.push({ name: "login" });
      axios.delete("http://localhost:3000/users/logout");
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
