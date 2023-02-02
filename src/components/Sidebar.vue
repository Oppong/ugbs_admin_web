<template>
    <div class="sidebar fixed top-0 bottom-0 w-[350px] overflow-y-auto bg-gray-900 p-4">
        <div class="p-2.5 flex items-center mt-1">
            <h1 class="font-bold text-gray-200 text-[15px] ml-3 text-2xl">Admin Panel</h1>
        </div>
        <hr class="my-2 text-gray-200">
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-house-fill text-white"></i>
            <router-link :to="{name: 'home'}">
                <span class="text-[15px] ml-4 text-gray-200">Dashboard</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-people-fill text-white"></i>
            <router-link :to="{name: 'adminlist'}">
                <span class="text-[15px] ml-4 text-gray-200">Admin List</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-people text-white"></i>
            <router-link :to="{name: 'stafflist'}">
                <span class="text-[15px] ml-4 text-gray-200">Staff List</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-person-lines-fill text-white"></i>
            <router-link :to="{name: 'studentlist'}">
                <span class="text-[15px] ml-4 text-gray-200">Student List</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-file-earmark-fill text-white"></i>
            <router-link :to="{name: 'addAnnouncement'}">
                <span class="text-[15px] ml-4 text-gray-200">Add Announcement</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-arrow-right-square-fill text-white"></i>
            <router-link :to="{name: 'addInforResources'}">
                <span class="text-[15px] ml-4 text-gray-200">Add Information Resources</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-body-text text-white"></i>
            <router-link :to="{name: 'addBlog'}">
                <span class="text-[15px] ml-4 text-gray-200">Add News To Blog</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4 mb-8">
            <i class="bi bi-calendar2-minus text-white"></i>
            <router-link :to="{name: 'addForumCategory'}">
                <span class="text-[15px] ml-4 text-gray-200">Add Forum Category</span>
            </router-link>
        </div>
        <h1 class="text-[15px] ml-4 text-gray-200">Students Feedback</h1>
        <hr>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-inbox-fill text-white"></i>
            <router-link :to="{name: 'unreadmessages'}">
                <span class="text-[15px] ml-4 text-gray-200">Unread Messages</span>
            </router-link>
        </div>
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-inboxes-fill text-white"></i>
            <router-link :to="{name: 'readmessages'}">
                <span class="text-[15px] ml-4 text-gray-200">Read Meesages</span>
            </router-link>
        </div>
        <hr class="mt-4">
        <div v-if="user" class="p-2 mt-3 flex items-center px-4">
            <i class="bi bi-box-arrow-right text-white"></i>
            <span class="text-[15px] ml-4 text-gray-200" @click.prevent="signOutUser">Logout</span>
        </div>
    </div>
</template>


<script>
    import {
        getAuth,
        signOut,
    } from "firebase/auth";
    export default {
        name: 'sidebar',
        methods: {
            async signOutUser() {
                const auth = getAuth();
                await signOut(auth).then(() => {
                    this.$router.push({
                        name: 'SignIn'
                    });
                    return;
                });
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
    }
</script>

<style>

</style>