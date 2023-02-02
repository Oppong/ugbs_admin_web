<template>
<Loading v-if="loading"/>
    <div>
        <Sidebar/>
        <div class="ml-[400px]">
            <h1 class="mt-16 font-bold text-2xl mb-8">All Blog Post</h1>
            <div class=" grid grid-cols-4 gap-5 gap-y-10">
                <div class="" v-for="news in newsBlogs" :key="news.id">
                    <img class="w-64 h-48 object-cover" :src="news.imageUrl" alt="image">
                    <h1 class="mt-2 font-bold tracking-wide">{{news.title}}</h1>
                    <p class="text-gray-400 mt-2 leading-wide text-ellipsis overflow-hidden h-[100px]">{{news.description}}</p>
                    <p class="text-slate-700 mt-4 leading-wide">{{news.createdAt.toDate()}}</p>
                    <div class="flex justify-between mt-4">
                        <button type="submit" @click.prevent="" class="py-2 px-4 bg-indigo-700 rounded-lg text-white inline-block"><router-link :to="{path: `/updateBlog/${news.id}`}" >Edit</router-link></button>
                        <button type="submit" @click.prevent="deleteBlog(news.id)" class="py-2 px-4 bg-red-600  rounded-lg text-white inline-block">Delete</button>
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
        name: "viewBlogPost",
        //data
        data() {
            return {
                newsBlogs: [],
                deleteMessage: '',
                error: '',
                loading: '',
            };
        },
        //created
        created() {
            this.getNewsBlog();
        },
        //methods
        methods: {
            async getNewsBlog() {
                const newsBlog = collection(db, 'newsBlog');
                onSnapshot(newsBlog, (snapshot) => {
                    this.newsBlogs = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.newsBlogs.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

             async deleteBlog(announceId) {
                this.loading = true;
                const docDelete = doc(db, "newsBlog", announceId);
                await deleteDoc(docDelete).then(()=>{
                    this.loading = false;
                    this.deleteMessage = 'Blog Post Deleted Successfully';
                });
            },
        },
        components: {
    Sidebar,
    Loading
}
    }
</script>