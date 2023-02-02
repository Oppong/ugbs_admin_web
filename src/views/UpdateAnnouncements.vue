<template>
    <Loading v-if="loading" />
    <div v-if="user">
        <Sidebar/>
        <div class="ml-[400px] mr-[250px]">
            <div class="flex justify-between mt-16 ">
                <h1 class="font-bold text-2xl mb-4">Update Announcement</h1>
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
                    <button type="submit" @click.prevent="update" class="w-full flex justify-center py-2 px-4 font-medium rounded-md text-white bg-indigo-600">
                                        Update Announcement
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
    // import {
    //     QuillEditor
    // } from '@vueup/vue-quill'
    // import '@vueup/vue-quill/dist/vue-quill.snow.css';
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
        name: "updateAnnouncement",
        //created
        created() {
            let announcementId = this.$route.params.announceId;
            this.announcedId = announcementId;
            this.getAnnouncementById();
        },
        //components
        components: {
            Sidebar,
            Loading
        },
        //data
        data() {
            return {
                announcedId: null,
                loading: '',
                details: '',
                imageUrl: '',
                title: '',
                urlLink: '',
            }
        },
        methods: {
            //get a single annoucement
            async getAnnouncementById() {
                let singleDoc = await getDoc(doc(db, 'Announcements', this.announcedId));
                this.title = singleDoc.data().title;
                this.details = singleDoc.data().details;
                this.urlLink = singleDoc.data().urlLink;
                this.imageUrl = singleDoc.data().imageUrl;
            },
            async update() {
                this.loading = true;
                const update = doc(db, "Announcements", this.announcedId);
                await updateDoc(update, {
                    title: this.title,
                    details: this.details,
                    urlLink: this.urlLink,
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
