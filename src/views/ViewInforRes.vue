<template>
    <div>
        <Loading v-if="loading" />
        <Sidebar/>
        <div class="ml-[400px]">
            <h1 class="mt-16 font-bold text-2xl mb-8">All Information Resources</h1>
            <div class=" grid grid-cols-4 gap-6 gap-y-6">
                <div class="" v-for="info in infoRes" :key="info.id">
                  <embed :src="info.fileUrl" type="" class="h-96 w-92">

                    <h1 class="mt-2 font-bold tracking-wide">{{info.title}}</h1>
                    <p class="text-slate-700 mt-4 leading-wide">{{info.createdAt.toDate()}}</p>
                    <div class="flex justify-between mt-4">
                        <!-- <button type="submit" @click.prevent="" class="py-2 px-4 bg-indigo-700 rounded-lg text-white inline-block">Edit</button> -->
                        <button type="submit" @click.prevent="deleteInfo(info.id)" class="py-2 px-4 bg-red-600  rounded-lg text-white inline-block">Delete</button>
                    </div>
                    <p class="py-4 bg-emerald-300 text-emerald-700 rounded-lg text-center" v-show="error">{{deleteMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                </div>
            </div>
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
        doc,
        deleteDoc,
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    import Loading from '../components/Loading.vue';
    //export default
    export default {
        name: "vueinfores",
        components: {
            Sidebar,
            Loading
        },
        data() {
            return {
                infoRes: [],
                deleteMessage: "",
                error: "",
                loading: "",
            };
        },
        methods: {
            async getInforRes() {
                const info = collection(db, "informationResources");
                onSnapshot(info, (snapshot) => {
                    this.infoRes = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.infoRes.push({ ...doc.data(),
                            id: doc.id
                        });
                    });
                });
            },
            async deleteInfo(infoId) {
                this.loading = true;
                const docDelete = doc(db, "informationResources", infoId);
                await deleteDoc(docDelete).then(() => {
                    this.loading = false;
                    this.deleteMessage = "Infor Resources Deleted Successfully";
                });
            },
        },
        created() {
            this.getInforRes();
        },
    }
</script>