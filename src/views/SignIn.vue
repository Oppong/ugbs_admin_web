<template>
    <div class="flex justify-center place-items-center h-screen w-96 mx-auto">
        <Loading v-if="loading" />
        <div class="max-w-md w-full">
            <h1 class="font-bold text-xl text-center">Admin Login</h1>
            <p class="tex-base text-gray-600 mb-4 text-center">Please sign in to the Admin Panel</p>
            <form action="" method="post" class="mt-6 space-y-6">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required class=" rounded-lg appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address">
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required class="rounded-lg appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password">
                </div>
                <button type="submit" @click.prevent="login" class="py-3 bg-slate-700 w-full rounded-lg text-white" >Sign In</button>

                <p class="py-4 bg-red-300 text-red-700 rounded-lg text-center" v-show="showError">{{errorMessage}} <span class="px-2 py-2 bg-white rounded-lg" @click.prevent="showError=false">X</span></p>
                 <p class="py-6 bg-red-300 text-red-700 rounded-lg text-center" v-show="error">{{errorFields}}</p>
            </form>
        </div>
    </div>
</template>

<script>
    import Loading from '../components/Loading.vue';
    import {
        getAuth,
        signInWithEmailAndPassword
    } from "firebase/auth";
    export default {
        name: 'SignIn',
        components: {
            Loading
        },
        data() {
            return {
                loading: '',
                email: '',
                password: '',
                errorMessage: '',
                error: '',
                showError: '',
                errorFields: '',
            }
        },
        methods: {
            async login() {
                if (this.email !== '' && this.password !== '' ) {
                    this.loading = true;
                    //authenticate admin 
                    const auth = getAuth();
                    await signInWithEmailAndPassword(auth, this.email, this.password).then(() => {
                        this.$router.push({
                            name: 'home'
                        });
                        this.loading = false;
                    }).catch((error)=>{
                        this.loading = false;
                        this.showError = true;
                        this.errorMessage= error.message;
                    });
                    return;
                }
                this.error = true;
                this.errorFields = 'Please fill out all the fields or email entered must be a valid staff email';
                return;

            }
        },
    }
</script>'
<!-- && this.password.includes("@ug.edu.gh") -->