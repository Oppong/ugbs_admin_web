<template>
    <div>
        <div v-if="user">
        <Loading v-if="loading"/>
        <Sidebar/>
        <div class="ml-[400px] mr-[250px]">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Update News Blog Post</h1> 
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg"><router-link :to="{name: 'viewBlog'}">View News Blog</router-link></button>
            </div>
            <form class="space-y-8" action="" method="post">
                <div>
                    <input type="file" name="image" id="image" accept="image/*">
                </div>
                <div>
                    <label for="title" class="mb-2 font-semibold">Title of Blog Post</label>
                    <input id="title" v-model="title" name="title" type="text" autocomplete="title" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   " placeholder="Title ">
                </div>
                <div>
                    <label for="description" class="mb-2 font-semibold block">Details of Blog Post</label>
                    <textarea :value="description" @input="description =$event.target.value" name="description" id="description" cols="120" rows="10" class="border-2"></textarea>
                </div>
                <div>
                    <button type="submit" @click.prevent="update" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                    Update Blog Post
                                    </button>
                </div>
                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                <p class="py-4 bg-teal-300 text-teal-800 rounded-lg text-center" v-show="showSuccess">{{sucess}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showSuccess=false">X</span></p>
            </form>
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
        updateDoc,
        getDoc
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    import Loading from '../components/Loading.vue';
    //export default
export default {
      created() {
            let newsBlogId = this.$route.params.blogId;
            this.blogId = newsBlogId;
            this.getBlogById();
        },
        //components
        components: {
            Sidebar,
            Loading
        },
        //data
        data() {
            return {
                blogId: null,
                loading: '',
                description: '',
                imageUrl: '',
                title: '',
            }
        },
        methods: {
            //get a single annoucement
            async getBlogById() {
                let singleDoc = await getDoc(doc(db, 'newsBlog', this.blogId));
                this.title = singleDoc.data().title;
                this.description= singleDoc.data().description;
                this.imageUrl = singleDoc.data().imageUrl;
            },
            async update() {
                this.loading = true;
                const update = doc(db, "newsBlog", this.blogId);
                await updateDoc(update, {
                    title: this.title,
                    description: this.description,
                    imageUrl: this.imageUrl,
                }).then(() => {
                    this.loading = false;
                });
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },

}
</script>