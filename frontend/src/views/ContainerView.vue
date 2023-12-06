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
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            blobFiles: [],
            uName: ''
        }
    },
    mounted() {
        const userName = this.$route.params.uName;
        axios.get(`http://localhost:8090/api/blob/listFiles/${userName}`)
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
            const userName = this.$route.params.uName;
            axios.delete(`http://localhost:8090/api/blob/deleteFile/${userName}/${fileName}`)
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