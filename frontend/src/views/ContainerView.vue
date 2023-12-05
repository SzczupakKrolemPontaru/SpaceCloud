<template>
    <p>Udalo sie zalogowac</p>
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
        axios.get('http://localhost:8090/api/blobListFiles/${userName}')
            .then((response) => {
                this.blobFiles = response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    created() {
        this.userName = this.$route.params.userName;
    }
}
</script>
