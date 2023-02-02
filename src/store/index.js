import { createStore } from 'vuex'


import {
    doc,
    getDoc
  } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  import {db} from '../firebase/firebaseInit.js';



  export default createStore({

    state: {
    user: null,
    profileEmail:null,
    profileFullName: null,
    profileUserId: null,
    profileImageUrl: null,
    profileUserType: null,
    },

    mutations: {

           // this will show and hide things to indicate if a user is signed in or not
updateUser(state, payload){
    state.user = payload
  },

        setProfileInfo(state, doc){
            state.profileUserId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFullName = doc.data().fullName;
            state.profileImageUrl = doc.data().imageUrl;
            state.profileUserType = doc.data().userType;
        }

    },

    actions: {
        async getCurrentUser({commit}){
            const auth = getAuth();
               const database = getDoc(doc(db, 'profiles', auth.currentUser.uid));
               const dbResult = await database;
               commit('setProfileInfo', dbResult);
            
          }

    }
  })