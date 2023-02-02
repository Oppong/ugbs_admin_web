
<template>
    <div>
        <Sidebar/>
        <div class="ml-[400px]">
            <div class="space-y-6">
            <h1 class="mt-16 text-center font-bold text-2xl mb-12">User Details</h1>
            <img class="h-48 w-48 rounded-full  mx-auto object-cover" :src="imageUrl" alt="">
            <p class="text-center "><span class="font-semibold text-xl">Name:</span> {{fullName}}</p>
            <p class="text-center "><span class="font-semibold text-xl">Email:</span>  {{email}}</p>
            <p class="text-center "><span class="font-semibold text-xl">Student Id:</span>  {{studentId}}</p>
            <p class="text-center "><span class="font-semibold text-xl">Programe of Study:</span> {{programe}}</p>
            <p class="text-center "><span class="font-semibold text-xl">User Type:</span>  {{userType}}</p>
            <!-- <p class="text-center "><span class="font-semibold text-xl">Date Joined:</span>{{createdAt.getMonth()}}</p> -->
            </div>
        </div>
    </div>
</template>


<script>
import {
        db
    } from '../firebase/firebaseInit.js';
    import {
        doc,
        getDoc
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    export default {
        name: "viewuser",
        components: {
            Sidebar
        },

created() {
    let userId = this.$route.params.userId; //get the userId from the route
    this.userId = userId;
    this.getUserInfo();
},
        data() {
            return {
                selectedUser: {},
                userId:null,
                fullName: '',
                email:'',
                studentId:'',
                imageUrl: '',
                programe: '',
                userType: '',
                createdAt: '',


            }
        },

        methods: {
            async getUserInfo(){
             let userData = await getDoc(doc(db, 'profiles', this.userId));
              this.fullName = userData.data().fullName;
              this.email = userData.data().email;
              this.imageUrl = userData.data().imageUrl;
              this.studentId = userData.data().studentId;
              this.programe = userData.data().programme;
              this.userType = userData.data().userType;
              this.createdAt = userData.data().createdAt;
            },
        },
    }
</script>