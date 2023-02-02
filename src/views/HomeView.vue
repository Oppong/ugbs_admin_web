<template>
    <div>
        <Sidebar v-if="user" />
        <div v-if="user" class="ml-[400px] mt-24">
            <h1 class="text-3xl font-semibold text-center tracking-wide">Dashboard</h1>
            <div class=" grid grid-cols-4">
                <div class="bg-indigo-800 shadow-md h-32 w-64 mb-4 rounded-lg px-2 py-2 ">
                    <h4 class="text-white text-center mt-6">Registered Staff</h4>
                    <p class="text-white text-center font-black text-3xl">{{stafflists.length}}</p>
                </div>
                 <div class="bg-teal-800 shadow-md h-32 w-64 mb-4 rounded-lg px-2 py-2 ">
                    <h4 class="text-white text-center mt-6">Registered Students</h4>
                    <p class="text-white text-center font-black text-3xl">{{studentlists.length}}</p>
                </div>
                 <div class="bg-slate-800 shadow-md h-32 w-64 mb-4 rounded-lg px-2 py-2 ">
                    <h4 class="text-white text-center mt-6">Unread Messages</h4>
                    <p class="text-white text-center font-black text-3xl">{{unread.length}}</p>
                </div>
            </div>
        </div>
        <div v-else class="mt-6">
            <img src="../assets/404.png" alt="404" class="mx-auto">
        </div>
    </div>
</template>

<script>
    import Sidebar from '../components/Sidebar.vue';
    import {
        db
    } from '../firebase/firebaseInit.js';
    import {
        collection,
        onSnapshot,
        query,
        where,
    } from "firebase/firestore";
    //export default
    export default {
        name: 'home',
        components: {
            Sidebar
        },
        //computed
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        //created
        created() {
            this.getStaffList();
            this.studentList();
            this.getUnreadMessages();
        },
        //data
        data() {
            return {
                stafflists: [],
                 studentlists: [],
                 unread: [],
            }
        },
        methods: {

             async getUnreadMessages() {
                const unreadMessages = collection(db, 'adminFeedback');
                const q = query(unreadMessages, where('status', "==", 'unread'));
                onSnapshot(q, (snapshot) => {
                    this.unread = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.unread.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

            async getStaffList() {
                const stafflist = collection(db, 'profiles');
                const q = query(stafflist, where('userType', "==", 'staff'));
                onSnapshot(q, (snapshot) => {
                    this.stafflists = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.stafflists.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

            async studentList() {
                const studentlist = collection(db, 'profiles');
                const q = query(studentlist, where('userType', "==", 'student'));
                onSnapshot(q, (snapshot) => {
                    this.studentlists = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.studentlists.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },
        },
    }
</script>