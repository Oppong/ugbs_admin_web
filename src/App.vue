

<template>
    <router-view/>
</template>



<script>
    import {
        getAuth,
        onAuthStateChanged
    } from "firebase/auth";
    export default {
        created() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                this.$store.commit('updateUser', user);
                if (user) {
                    this.$store.dispatch('getCurrentUser');
                    console.log(this.$store.state.profileEmail);
                    const uid = user.uid;
                } else {
                    // User is signed out
                }
            });
        },
    }
</script>

<style>

</style>
