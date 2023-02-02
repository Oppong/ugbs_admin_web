
<template>
    <div>
    <Loading v-if="loading"/> 
        <Sidebar/>
        <div class="ml-[400px] ">
         <h1 class="mt-16 font-bold text-2xl mb-2">Read Messages ({{read.length}})</h1>
           <div class=" grid grid-cols-3 gap-5 gap-y-6">
                <div class="" v-for="read in read" :key="read.id">
                    <h1 class="mt-2 font-bold tracking-wide">{{read.subject}}</h1>
                    <p class="text-gray-500 mt-2 leading-wide">{{read.message}}</p>
                    <p class="text-slate-400 mt-4 leading-wide">{{read.sender}}</p>
                    <p class="text-slate-400 leading-wide">{{read.senderEmail}}</p>
                    <p class="text-slate-700 mt-4 leading-wide">{{read.createdAt.toDate()}}</p>
                    <div class="flex justify-between mt-4">
                        <button type="submit" @click.prevent="moveToUnRead(read.id)" class="py-2 px-4 bg-indigo-800  rounded-lg text-white inline-block">Move to Unread Messages</button>
                        <button type="submit" @click.prevent="deleteFeedback(read.id)" class="py-2 px-4 bg-red-700 rounded-lg text-white inline-block">Delete</button>
                    </div>

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
        query,
        where,
        updateDoc,
        doc,
        deleteDoc,
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
import Loading from '../components/Loading.vue';
    //export default
    export default {
        name: "read messages",

//data
        data() {
            return {
                read: [],
                loading: '',
            }
        },
        //created
        created() {
            this.getReadMessages();
        },
        //methods
        methods: {
             async getReadMessages() {
                const readMessages = collection(db, 'adminFeedback');
                const q = query(readMessages, where('status', "==", 'read'));
                onSnapshot(q, (snapshot) => {
                    this.read = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.read.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

            async moveToUnRead(readId) {
                const update = doc(db, "adminFeedback", readId);
                await updateDoc(update, {
                    status: 'unread',
                });
            },
             async deleteFeedback(readId) {
                this.loading = true;
                const docDelete = doc(db, "adminFeedback", readId);
                await deleteDoc(docDelete).then(()=>{
                    this.loading = false;
                    this.deleteMessage = 'Feedback Deleted Successfully';
                });
            },
        },
        components: {
    Sidebar,
    Loading
}
    }
</script>