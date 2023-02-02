<template>
    <div v-if="user">
        <Loading v-if="loading"/>
        <Sidebar/>
        <div class="ml-[400px] mr-[250px]">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Add Forum Category</h1> 
        
            </div>
            <form class="space-y-8" action="" method="post">
                <div>
                    <label for="categoryName" class="mb-2 font-semibold">Category Name</label>
                    <input id="categoryName" v-model="categoryName" name="categoryName" type="text" autocomplete="categoryName" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   " placeholder="Category Name">
                </div>
               
                <div>
                    <button type="submit" @click.prevent="addCategoryName" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                    Add Category Name
                                    </button>
                </div>
                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                <p class="py-4 bg-teal-300 text-teal-800 rounded-lg text-center" v-show="showSuccess">{{sucess}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showSuccess=false">X</span></p>
            </form>

            <div class="mt-10">
                <h1 class="font-bold text-2xl mb-4">Forum Listing</h1>
                <div class="" v-for="forum in forums" :key="forum.id" >
                    <h1 class="mt-2 font-semibold py-2 tracking-wide">{{forum.categoryName}}</h1>
                    <button type="submit" @click.prevent="deleteForum(forum.id)" class="py-2 px-4 bg-red-600 mb-2  rounded-lg text-white inline-block">Delete</button>
                    <hr>
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
        doc,
        setDoc,
        collection,
         deleteDoc,
        onSnapshot,
    } from "firebase/firestore";
import Sidebar from '../components/Sidebar.vue'
import Loading from '../components/Loading.vue';
export default {
    name: "addForumCategory",
    //data
    data() {
        return {
             
                loading: '',
                categoryName: '',
                success: '',
                showSuccess: '',
                error: '',
                errorMessage: '',
                forums: [],
        };
    },
    //created
    created() {
        this.getForumCategory();
    },
    methods: {
          async addCategoryName() {
                if (this.categoryName !== '') {
                    this.loading = true;
                
                    let categoryId = doc(collection(db, "forum"));
                    await setDoc(categoryId, {
                        categoryName: this.categoryName,
                        categoryId: categoryId,
                        createdAt: new Date(),
                        
                    }).then(() => {
                        this.showSuccess = true
                        this.sucess = 'Cateory Name added Successfully',
                            this.loading = false;
                    });
                }
                // this.error = true;
                this.errorMessage = 'Please fill out all fields';
                return;
            },

             async getForumCategory() {
                const forum = collection(db, 'forum');
                onSnapshot(forum, (snapshot) => {
                    this.forums = []; //reinitialise when there is update
                    snapshot.forEach((doc) => {
                        this.forums.push({ ...doc.data(),
                            id: doc.id
                        })
                    });
                })
            },

             async deleteForum(forumId) {
                this.loading = true;
                const docDelete = doc(db, "forum", forumId);
                await deleteDoc(docDelete).then(()=>{
                    this.loading = false;
                    this.deleteMessage = 'Forum Category Deleted Successfully';
                });
            },
    },
    components: { Sidebar, Loading },
    computed: {
            user() {
                return this.$store.state.user;
            }
        },
}
</script>