<template>
    <div v-if="user">
        <AdminModal v-if="modalActive" v-on:close-modal="closeModal" />
        <Sidebar/>
        <div class="ml-[400px] ">
            <h1 class="mt-16 font-bold text-2xl mb-2">Admin List</h1>
            <table class="table-auto">
                <thead class="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th class="py-3 px-6 font-semibold tracking-wide">Profile Pic</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Name</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Email</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Revoke</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">View</th>
                    </tr>
                </thead>
                <tbody class="text-center divide-y divide-gray-100">
                    <tr class="odd:bg-white even:bg-slate-50 cursor-pointer duration-300" v-for="admin in adminlists" :key="admin.id">
                        <td class="py-3 px-6"><img :src="admin.imageUrl" alt="profile pic" class="rounded-full h-12 w-12"></td>
                        <td class="py-3 px-6">{{admin.fullName}}</td>
                        <td class="py-3 px-6">{{admin.email}}</td>
                        <td class="py-3 px-6"><button @click.prevent="revokeAdmin(admin.id)" class="bg-red-500 px-3 py-2 text-sm text-white rounded-md ">Revoke Admin Status</button></td>
                        <td class="py-3 px-6">
                            <router-link :to="{path: `/viewuser/${admin.id}`}"><i class="bi bi-eye-fill bg-gray-200 px-4 py-3 text-gray-600 rounded-lg"></i></router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
    import {
        db
    } from '../firebase/firebaseInit.js';
    import {
        collection,
        onSnapshot,
        query,
        where,
        updateDoc,
        doc,
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    import AdminModal from '../components/AdminModal.vue';

    //exportdefault
    export default {
        name: "admin list",
        components: {
            Sidebar,
            AdminModal
        },
        //data
        data() {
            return {
                adminlists: [],
                modalActive: '',
                email: '',
            }
        },
        //created
        created() {
            this.getAdminList();
        },
        //methods
        methods: {
            async getAdminList() {
                const adminlist = collection(db, 'profiles');
                const q = query(adminlist, where('userType', "==", 'Admin'));
                onSnapshot(q, (snapshot) => {
                    this.adminlists = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.adminlists.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },
            async revokeAdmin(adminId) {
                const update = doc(db, "profiles", adminId);
                await updateDoc(update, {
                    userType: 'staff',
                });
            },
            closeModal() {
                this.modalActive = !this.modalActive;
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
    }
</script>