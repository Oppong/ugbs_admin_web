
<template>
    <div>
        <Sidebar/>
        <div class="ml-[400px] ">
         <h1 class="mt-16 font-bold text-2xl mb-2">Unread Messages ({{unread.length}})</h1>
           <div class=" grid grid-cols-3 gap-5 gap-y-6">
                <div class="" v-for="unread in unread" :key="unread.id">
                    <h1 class="mt-2 font-bold tracking-wide">{{unread.subject}}</h1>
                    <p class="text-gray-500 mt-2 leading-wide">{{unread.message}}</p>
                    <p class="text-slate-400 mt-4 leading-wide">{{unread.sender}}</p>
                    <p class="text-slate-400 leading-wide">{{unread.senderEmail}}</p>
                    <p class="text-slate-700 mt-4 leading-wide">{{unread.createdAt.toDate()}}</p>
                    <div class="flex justify-between mt-4">
                        <!-- <button type="submit" @click.prevent="" class="py-2 px-4 bg-indigo-700 rounded-lg text-white inline-block">Edit</button> -->
                        <button type="submit" @click.prevent="markAsRead(unread.id)" class="py-2 px-4 bg-emerald-800  rounded-lg text-white inline-block">Mark as Read</button>
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
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    //export default
    export default {
        name: "unread messages",

//data
        data() {
            return {
                unread: [],
            }
        },
        //created
        created() {
            this.getUnreadMessages();
        },
        //methods
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

            async markAsRead(unreadId) {
                const update = doc(db, "adminFeedback", unreadId);
                await updateDoc(update, {
                    status: 'read',
                });
            },
        },
        components: {
            Sidebar
        }
    }
</script>