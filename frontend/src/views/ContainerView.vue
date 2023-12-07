<template>
    <div>
        <table class = "table table-bordered table-hover table_transparent">
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Download</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(file, index) in blobFiles" :key="index">
                    <td>{{ file }}</td>
                    <td><button type="button" class="btn btn-success"> Download </button></td>
                    <td><button @click="deleteFile(file)" type="button" class="btn btn-danger"> Delete </button></td>
                </tr>
            </tbody>
        </table>
        <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload"/>
        <button @click="triggerFileUpload">Dodaj plik</button>
    </div>
</template>

<script>
import axios from "axios";
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
                console.log(this.blobFiles);
            })
            .catch((error) => {
                console.error(error);
            });
    },
    methods: {
        deleteFile(fileName) {
            console.log(fileName);
            axios.delete(`http://localhost:8090/api/blob/deleteFile/${this.userName}/${fileName}`)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', file);
            axios.post(`http://localhost:8090/api/blob/sendFile/${this.userName}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
            }
    }

}
</script>

<style scoped>
th {
    text-align: left;
}
table {
    text-align: center;
    border-collapse: collapse;
    width: 50%;
}
.table_transparent { --bs-table-bg: transparent !important; }
</style>
```