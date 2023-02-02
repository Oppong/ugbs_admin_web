<template>
    <div>
    <Loading v-if="loading"/>
        <Sidebar/>
        <div class="ml-[400px]">
            <h1 class="mt-16 font-bold text-2xl mb-8">All Announcements</h1>
            <div class=" grid grid-cols-4 gap-5 gap-y-6">
                <div class="" v-for="announce in announcements" :key="announce.id">
                    <img class="w-64 h-48 object-cover" :src="announce.imageUrl" alt="image">
                    <h1 class="mt-2 font-bold tracking-wide">{{announce.title}}</h1>
                    <p class="text-gray-400 mt-2 leading-wide text-ellipsis overflow-hidden h-[100px]">{{announce.details}}</p>
                    <p class="text-blue-400 mt-2 leading-wide">{{announce.urlLink}}</p>
                    <p class="text-slate-700 mt-4 leading-wide">{{announce.createdAt.toDate()}}</p>
                    <div class="flex justify-between mt-4">
                        <button type="submit" class="py-2 px-4 bg-indigo-700 rounded-lg text-white inline-block"><router-link :to="{path: `/updateAnnouncement/${announce.id}`}" >Edit</router-link></button>
                        <button type="submit" @click.prevent="deleteAnnounce(announce.id)" class="py-2 px-4 bg-red-600  rounded-lg text-white inline-block">Delete</button>
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
    import Sidebar from '../components/Sidebar.vue'
import Loading from '../components/Loading.vue';
    export default {
        name: "viewAnnouncement",
        //data
        data() {
            return {
                announcements: [],
                deleteMessage: '',
                error: '',
                loading: '',
            };
        },
        //created
        created() {
            this.getAnnouncements();
        },
        //methods
        methods: {
            async getAnnouncements() {
                const announce = collection(db, 'Announcements');
                onSnapshot(announce, (snapshot) => {
                    this.announcements = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.announcements.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

             async deleteAnnounce(announceId) {
                this.loading = true;
                const docDelete = doc(db, "Announcements", announceId);
                await deleteDoc(docDelete).then(()=>{
                    this.loading = false;
                    this.deleteMessage = 'Announcement Deleted Successfully';
                });
            },
        },
        components: {
    Sidebar,
    Loading
}
    }
</script>