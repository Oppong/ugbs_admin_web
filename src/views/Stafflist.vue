<template>
    <div>
    <Sidebar/>
        <div class="ml-[400px]">
    
    <h1 class="mt-16 font-bold text-2xl mb-2 text-center">StaffList</h1>
    <div class="bg-indigo-800 shadow-md h-24 w-48 mb-4 rounded-lg px-2 py-2">
        <h4 class="text-white text-center">Registered Staff</h4>
        <p class="text-white text-center font-black text-3xl">{{stafflists.length}}</p>
    </div>
            <table class="table-auto ">
                <thead class="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th class="py-3 px-6 font-semibold tracking-wide">Id</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Profile Pic</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Name</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Email</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Make Admin</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">Revoke</th>
                        <th class="py-3 px-6 font-semibold tracking-wide">View</th>
                    </tr>
                </thead>
                <tbody class="text-center divide-y divide-gray-100">
                    <tr class="odd:bg-white even:bg-slate-50 cursor-pointer duration-300" v-for="(staff, index) in stafflists" :key="staff.id">
                        <td class="py-3 px-6">{{index + 1}}</td>
                        <td class="py-3 px-6"><img :src="staff.imageUrl" alt="profile pic" class="rounded-full h-12 w-12"></td>
                        <td class="py-3 px-6">{{staff.fullName}}</td>
                        <td class="py-3 px-6" >{{staff.email}}</td>
                        <td class="py-3 px-6" ><button @click.prevent="makeAdmin(staff.id)" class="bg-teal-700 px-3 py-2 text-sm text-white rounded-md ">Make Admin</button></td>
                        <td class="py-3 px-6" ><button @click.prevent="revokeStaff(staff.id)" class="bg-red-500 px-3 py-2 text-sm text-white rounded-md ">Revoke Staff Status</button></td>
                        <td class="py-3 px-6" ><router-link :to="{path: `/viewuser/${staff.id}`}" ><i class="bi bi-eye-fill bg-gray-200 px-4 py-3 text-gray-600 rounded-lg"></i></router-link></td>
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
    name: "staflist",
    components: { Sidebar },

//data
    data() {
        return {
            stafflists: [],
        }
    },


//created
    created() {
        this.getStaffList();
    },

//methods
    methods: {
         async getStaffList(){
                const stafflist = collection(db, 'profiles');
                const q = query(stafflist, where('userType', "==", 'staff'));
                onSnapshot(q, (snapshot)=>{
                    this.stafflists = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.stafflists.push({...doc.data(), id: doc.id})
                    });
                })
            },

            async revokeStaff(staffId){
                   const update = doc(db, "profiles", staffId);
                    await updateDoc(update, {
                        userType: 'student',
                    });

            },

            async makeAdmin(staffId){
                   const update = doc(db, "profiles", staffId);
                    await updateDoc(update, {
                        userType: 'Admin',
                    });

            },
    },
}
</script>