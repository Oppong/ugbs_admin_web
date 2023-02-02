<template>
    <div>
        <Sidebar/>
        <div class="ml-[400px] ">
            <h1 class="mt-16 text-center font-bold text-2xl mb-2">Student List</h1>
            <div class="bg-purple-800 shadow-md h-24 w-48 mb-4 rounded-lg px-2 py-2">
                <h4 class="text-white text-center">Registered Students</h4>
                <p class="text-white text-center font-black text-3xl">{{studentlists.length}}</p>
            </div>
            <table class="table-auto mt-2">
                <thead class="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th class="py-3 px-6 font-semibold tracking-wide">Id</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Profile Pic</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Name</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Email</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Make Staff</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">View</th>
                    </tr>
                </thead>
                <tbody class="text-center divide-y divide-gray-100">
                    <tr class="odd:bg-white even:bg-slate-50 cursor-pointer duration-300" v-for="(student, index) in studentlists" :key="student.id">
                        <td class="py-3 px-6">{{index + 1}}</td>
                        <td class="py-3 px-6"><img :src="student.imageUrl" alt="profile pic" class="rounded-full h-12 w-12"></td>
                        <td class="py-3 px-6">{{student.fullName}}</td>
                        <td class="py-3 px-6">{{student.email}}</td>
                        <td class="py-3 px-6"><button @click.prevent="makeStaff(student.id)" class="bg-teal-700 px-3 py-2 text-sm text-white rounded-md ">Make Staff</button></td>
                        <td class="py-3 px-6">
                            <router-link :to="{path: `/viewuser/${student.id}`}"><i class="bi bi-eye-fill bg-gray-200 px-4 py-3 text-gray-600 rounded-lg"></i></router-link>
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
    //export default
    export default {
        name: 'studentslist',
        components: {
            Sidebar
        },
        //data
        data() {
            return {
                studentlists: [],
            }
        },
        //created
        created() {
            this.studentList();
        },
        //methods
        methods: {
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
            async makeStaff(studentId) {
                const update = doc(db, "profiles", studentId);
                await updateDoc(update, {
                    userType: 'staff',
                });
            },
        },
    }
</script>