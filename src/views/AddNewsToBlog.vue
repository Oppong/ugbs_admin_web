<template>
    <div v-if="user">
        <Loading v-if="loading" />
        <Sidebar/>
        <div class="ml-[400px] mr-[250px]">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Add News To Blog</h1>
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
                    <button type="submit" @click.prevent="addNewsBlog" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                        Add Blog Post
                                        </button>
                </div>
                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                <p class="py-4 bg-teal-300 text-teal-800 rounded-lg text-center" v-show="showSuccess">{{sucess}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showSuccess=false">X</span></p>
            </form>
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
    } from "firebase/firestore";
    import {
        getStorage,
        ref,
        getDownloadURL,
        uploadBytes
    } from "firebase/storage";
    import Sidebar from '../components/Sidebar.vue'
    import Loading from '../components/Loading.vue';
    export default {
        name: "addNewsToBlog",
        //data
        data() {
            return {
                loading: '',
                description: '',
                imageUrl: '',
                title: '',
                success: '',
                showSuccess: '',
                error: '',
                errorMessage: '',
            };
        },
        //created
        created() {},
        methods: {
            async addNewsBlog() {
                if (this.title !== '' && this.details !== '') {
                    this.loading = true;
                    //upload image
                    const imageFile = document.getElementById('image').files[0];
                    const storage = getStorage();
                    const storageRef = ref(storage, `newsBlog/${imageFile.name}`);
                    const uploadTask = await uploadBytes(storageRef, imageFile);
                    await getDownloadURL(uploadTask.ref).then((downloadUrl) => {
                        this.imageUrl = downloadUrl
                    });
                    //upload document plus image
                    let newsBlogId = doc(collection(db, "newsBlog"));
                    await setDoc(newsBlogId, {
                        title: this.title,
                        description: this.description,
                        createdAt: new Date(),
                        datePublished: new Date(),
                        createdBy: 'WebAdmin',
                        newsBlogId: newsBlogId,
                        imageUrl: this.imageUrl,
                    }).then(() => {
                        this.sendToFCM();
                        this.showSuccess = true
                        this.title = ''
                        this.sucess = 'Blog Post added Successfully',
                            this.loading = false;
                    });
                }
                // this.error = true;
                this.errorMessage = 'Please fill out all fields';
                return;
            },
            sendToFCM() {
                const data = {
                    'to': '/topics/newsBlog',
                    'mutable_content': true,
                    'content_available': true,
                    'priority': 'high',
                    'data': {
                        'content': {
                            'id': Date(),
                            'channelKey': 'newsblog',
                            'title': this.title,
                            'body': this.description,
                            'bigPicture': this.imageUrl,
                            'showWhen': true,
                            'autoCancel': true,
                            'notificationLayout': 'BigPicture'
                        }
                    },
                    'notification': {
                        'title': this.title,
                        'body': this.description,
                        "sound": "default",
                    }
                };
                let firebaseServerKey = 'AAAADAgS3ec:APA91bH9KzEJdcJHaZClGz9wEIoIYd12KH8L2W_BstpiZ2xk1MLoSgJoco-Pp2KWnQuwr6NUJydcclhJRs09LqZ0v66EsFLlG5kpzJdFtY-8mmEM4z9qdYKQVGYzBIl6qZE2wVc8Z3UU';
                fetch('https://fcm.googleapis.com/fcm/send', {
                    method: 'POST',
                    headers: {
                        'Authorization': `key=${firebaseServerKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                });
            }
        },
        components: {
            Sidebar,
            Loading
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
    }
</script>