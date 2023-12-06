<template>
    <div>
        <table class = "table">
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
    }
}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 50%;
}
table tr td, table tr th{
    background-color: rgba(210,130,240, 0.3) !important;
}
</style>
```