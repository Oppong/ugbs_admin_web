import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from '../views/SignIn.vue'
import Adminlist from '../views/Adminlist.vue'
import Stafflist from '../views/Stafflist.vue'
import Studentslist from '../views/Studentslist.vue'
import ViewUser from '../views/ViewUser.vue'
import AddAnnouncement from '../views/AddAnnouncement.vue'
import ViewAnnouncement from '../views/ViewAnnouncement.vue'
import AddInformation from '../views/AddInformation.vue'
import ViewInforRes from '../views/ViewInforRes.vue'
import AddNewsToBlog from '../views/AddNewsToBlog.vue'
import ViewNewsBlog from '../views/ViewNewsBlog.vue'
import AddForumCategory from '../views/AddForumCategory.vue'
import UnreadMessages from '../views/UnreadMessages.vue'
import ReadMessages from '../views/ReadMessages.vue'
import UpdateAnnouncements from '../views/UpdateAnnouncements.vue'
import UpdateNewsBlog from '../views/UpdateNewsBlog.vue'


const router = createRouter({
history: createWebHistory(import.meta.env.BASE_URL),

routes: [
    {
        path: '/',
        name: 'SignIn',
        component: SignIn,
        meta: {
            title:'SignIn'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
            title:'Home'
        }
    },
    {
        path: '/adminlist',
        name: 'adminlist',
        component: Adminlist,
        meta: {
            title:'adminlist'
        }
    },
    {
        path: '/stafflist',
        name: 'stafflist',
        component: Stafflist,
        meta: {
            title:'stafflist'
        }
    },

    {
        path: '/studentlist',
        name: 'studentlist',
        component: Studentslist,
        meta: {
            title:'studentslist'
        }
    },

    {
        path: '/viewuser/:userId',
        name: 'viewuser',
        component: ViewUser,
        meta: {
            title:'ViewUser'
        }
    },

    
    {
        path: '/addAnnouncement',
        name: 'addAnnouncement',
        component: AddAnnouncement,
        meta: {
            title:'addAnnouncement'
        }
    },

    {
        path: '/viewAnnouncement',
        name: 'viewAnnouncement',
        component: ViewAnnouncement,
        meta: {
            title:'ViewAnnouncement'
        }
    },
    {
        path: '/addInforResources',
        name: 'addInforResources',
        component: AddInformation,
        meta: {
            title:'addInforResources'
        }
    },
    {
        path: '/viewInforRes',
        name: 'viewInforRes',
        component: ViewInforRes,
        meta: {
            title:'ViewInforRes'
        }
    },
    {
        path: '/addBlog',
        name: 'addBlog',
        component: AddNewsToBlog,
        meta: {
            title:'AddNewsToBlog'
        }
    },
    {
        path: '/viewBlog',
        name: 'viewBlog',
        component: ViewNewsBlog,
        meta: {
            title:'ViewNewsBlog'
        }
    },
    {
        path: '/addForumCategory',
        name: 'addForumCategory',
        component: AddForumCategory,
        meta: {
            title:'AddForumCategory'
        }
    },

    {
        path: '/unreadmessages',
        name: 'unreadmessages',
        component: UnreadMessages,
        meta: {
            title:'UnreadMessages'
        }
    },
    {
        path: '/readmessages',
        name: 'readmessages',
        component: ReadMessages,
        meta: {
            title:'ReadMessages'
        }
    },
    {
        path: '/updateAnnouncement/:announceId',
        name: 'updateAnn',
        component: UpdateAnnouncements,
        meta: {
            title:'UpdateAnnouncements'
        }
    },
    {
        path: '/updateBlog/:blogId',
        name: 'updateBlog',
        component: UpdateNewsBlog,
        meta: {
            title:'UpdateNewsBlog'
        }
    },
]
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | UGBS Dawuro`;
  next();
});

export default router