<template>
    <div>
        <h1>Personal Cloud Storage of {{ userName }}</h1>
        <table class = "table table-bordered table-hover table_transparent">
            <tbody>
                <tr v-for="(file, index) in blobFiles" :key="index">
                    <td>{{ file }}</td>
                    <td><button @click="downloadFile(file)" type="button" class="btn btn-success"> Download </button></td>
                    <td><button @click="deleteFile(file)" type="button" class="btn btn-danger"> Delete </button></td>
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
        <button id="logoutBTN" @click="logout" class="btn btn-outline-success">Logout</button>
    </div>
</template>

<script>
import axios from "axios";
import saveAs from 'file-saver';
export default {
    data() {
        return {
            blobFiles: [],
            userName: ''
        }
    },
    mounted() {
        this.userName = this.$route.params.uName;
        axios.get(`http://localhost:8090/api/blob/listFiles/${this.userName}`)
            .then((response) => {
                this.blobFiles = response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        deleteFile(fileName) {
            axios.delete(`http://localhost:8090/api/blob/deleteFile/${this.userName}/${fileName}`)
                .then((response) => {
                    console.log(response);
                    this.refreshTableData();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        refreshTableData() {
        axios.get(`http://localhost:8090/api/blob/listFiles/${this.userName}`)
            .then(response => {
                this.blobFiles = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        },
        handleFileUpload(event) {
            event.preventDefault();
            const files = event.dataTransfer.files;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let formData = new FormData();
                formData.append("file", file);
                axios.post(`http://localhost:8090/api/blob/sendFile/${this.userName}`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then((response) => {
                    this.refreshTableData();
                    return response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
            }
        },
        downloadFile(fileName) {
            axios.get(`http://localhost:8090/api/blob/downloadFile/${this.userName}/${fileName}`, {
                responseType: "blob",
            }).then((response) => {
                saveAs(new Blob([response.data]), fileName);
            })
            .catch((error) => {
                console.error(error);
            });
        }, 
        logout() {
            localStorage.removeItem('loggedInUser');
            this.$router.push({ name: "login" });
        }
    }  

}
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
    width: 50%;
}
.table_transparent { --bs-table-bg: transparent !important; }
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