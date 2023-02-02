<template>
    <div v-if="user">
        <Loading v-if="loading" />
        <Sidebar/>
        <div class="ml-[400px] mt-16">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Add Information Resource</h1>
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg"><router-link :to="{name: 'viewInforRes'}">View All InforResources</router-link></button>
            </div>
            <p class="bg-red-300 bg-opacity-30 px-3 py-3 mb-4 mt-2 rounded-lg font-bold">Please upload only pdf files</p>
            <form action="" method="post" class="space-y-8">
                <div>
                    <input type="file" name="filePdf" id="filePdf">
                </div>
                <div>
                    <label for="title" class="mb-2 font-semibold">Title </label>
                    <input id="title" v-model="title" name="title" type="text" autocomplete="title" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900   " placeholder="Title ">
                </div>
                <div>
                    <button type="submit" @click.prevent="addInfor" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                            Add Information Resources
                                            </button>
                </div>
                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="error=false">X</span></p>
                <p class="py-4 bg-teal-300 text-slate-800 rounded-lg text-center font-bold" v-show="showSuccess">{{sucess}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showSuccess=false">X</span></p>
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
    import Sidebar from '../components/Sidebar.vue';
    import Loading from '../components/Loading.vue';
    //export default
    export default {
        name: "addInformation",
        components: {
            Sidebar,
            Loading
        },
        //data
        data() {
            return {
                title: '',
                fileUrl: '',
                loading: '',
                success: '',
                showSuccess: '',
                error: '',
                errorMessage: '',
            }
        },
        methods: {
            async addInfor() {
                if (this.title !== '') {
                    this.loading = true;
                    //upload image
                    const docFile = document.getElementById('filePdf').files[0];
                    const storage = getStorage();
                    const storageRef = ref(storage, `infoResources/${docFile.name}`);
                    const uploadTask = await uploadBytes(storageRef, docFile);
                    await getDownloadURL(uploadTask.ref).then((downloadUrl) => {
                        this.fileUrl = downloadUrl
                    });
                    //upload document plus image
                    let inforResId = doc(collection(db, "informationResources"));
                    await setDoc(inforResId, {
                        title: this.title,
                        createdAt: new Date(),
                        inforResId: inforResId,
                        fileUrl: this.fileUrl,
                    }).then(() => {
                        this.sendToFCM();
                        this.sucess = 'Information Resources added Successfully',
                            this.loading = false;
                    });
                }
                // this.error = true;
                // this.errorMessage = 'Please fill out all fields';
                // return;
            },
            sendToFCM() {
                const data = {
                    'to': '/topics/info',
                    'mutable_content': true,
                    'content_available': true,
                    'priority': 'high',
                    'data': {
                        'content': {
                            'id': Date(),
                            'channelKey': 'info',
                            'title': this.title,
                            'body': 'Download this document from your information resources page',
                            'showWhen': true,
                            'autoCancel': true,
                        }
                    },
                    'notification': {
                        'title': this.title,
                        'body': 'Download this document from your information resources page',
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