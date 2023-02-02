<template>
    <Loading v-if="loading" />
    <div v-if="user">
        <Sidebar/>
        <div class="ml-[400px] mr-[250px]">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Add Announcement</h1>
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg"><router-link :to="{name: 'viewAnnouncement'}">View All Announcements</router-link></button>
            </div>
            <form class="space-y-8" action="" method="post">
                <div>
                    <input type="file" name="image" id="image" accept="image/*">
                </div>
                <div>
                    <label for="title" class="mb-2 font-semibold">Title of Announcement</label>
                    <input id="title" v-model="title" name="title" type="text" autocomplete="title" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   " placeholder="Title ">
                </div>
                <div>
                    <label for="details" class="mb-2 font-semibold block">Details of Annoucement</label>
                    <textarea :value="details" @input="details =$event.target.value" name="details" id="details" cols="120" rows="10" class="border-2"></textarea>
                </div>
                <div>
                    <label for="urlLink" class="mb-2 font-semibold">Url Link</label>
                    <input id="urlLink" v-model="urlLink" name="urlLink" type="text" autocomplete="urlLink" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 " placeholder="Url Link">
                </div>
                <div>
                    <button type="submit" @click.prevent="addAnnouncement" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                            Add Announcement
                                            </button>
                </div>
                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                <p class="py-4 bg-teal-300 text-teal-800 rounded-lg text-center" v-show="showSuccess">{{sucess}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showSuccess=false">X</span></p>
            </form>
        </div>
    </div>
    <!-- <label for="details" class="font-semibold block">Details of Annoucement</label>
                                <QuillEditor theme="snow" toolbar="essential" v-model="details" :options="options" /> -->
</template>

<script>
    import {
        QuillEditor
    } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import {
        db
    } from '../firebase/firebaseInit.js';
    import {
        doc,
        setDoc,
        collection,
    } from "firebase/firestore";
    import Sidebar from '../components/Sidebar.vue';
    import {
        getStorage,
        ref,
        getDownloadURL,
        uploadBytes
    } from "firebase/storage";
    import Loading from '../components/Loading.vue';
    // import {
    //     json
    // } from 'stream/consumers';
    //export default
    export default {
        name: "addannouncement",
        //created
        created() {},
        //components
        components: {
            Sidebar,
            QuillEditor,
            Loading
        },
        //data
        data() {
            return {
                fileImage: '',
                loading: '',
                details: '',
                imageUrl: '',
                title: '',
                urlLink: '',
                success: '',
                showSuccess: '',
                error: '',
                errorMessage: '',
                options: {
                    placeholder: 'Announcement Message',
                    details: '',
                }
            }
        },
        methods: {
            async addAnnouncement() {
                if (this.title !== '' && this.details !== '' && this.urlLink !== '') {
                    this.loading = true;
                    //upload image
                    const imageFile = document.getElementById('image').files[0];
                    const storage = getStorage();
                    const storageRef = ref(storage, `announcements/${imageFile.name}`);
                    const uploadTask = await uploadBytes(storageRef, imageFile);
                    await getDownloadURL(uploadTask.ref).then((downloadUrl) => {
                        this.imageUrl = downloadUrl
                    });
                    //upload document plus image
                    let announceId = doc(collection(db, "Announcements"));
                    await setDoc(announceId, {
                        title: this.title,
                        details: this.details,
                        urlLink: this.urlLink,
                        createdAt: new Date(),
                        announceId: announceId,
                        imageUrl: this.imageUrl,
                    }).then(() => {
                        this.sendToFCM();
                        this.showSuccess = true
                        this.title = ''
                        this.details = ''
                        this.sucess = 'Announcement added Successfully',
                            this.loading = false;
                    });
                }
                this.error = true;
                this.errorMessage = 'Please fill out all fields';
                return;
            },
            sendToFCM() {
                const data = {
                    'to': '/topics/announcements',
                    'mutable_content': true,
                    'content_available': true,
                    'priority': 'high',
                    'data': {
                        'content': {
                            'id': Date(),
                            'channelKey': 'announcements',
                            'title': this.title,
                            'body': this.details,
                            // 'bigPicture': imageUrl ,
                            'showWhen': true,
                            'autoCancel': true,
                            // 'notificationLayout': 'BigPicture'
                        },
                    },
                    'notification': {
                        'title': this.title,
                        'body': this.details,
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
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
    }
</script>
