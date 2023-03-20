import { createRouter, createWebHistory } from "vue-router";
import PostList from "../components/PostsList.vue"
import PostView from "../views/PostView.vue"
import ProfileView from "../views/ProfileView.vue"
import NotFoundView from "../views/NotFoundView.vue"
import PostNotFoundView from "../views/PostNotFoundView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Posts",
            component: PostList
        },
        {
            path: "/posts",
            redirect: "/"
        },
        {
            path: "/post/:id",
            name: "Post",
            component: PostView
        },
        {
            path: "/profile",
            name: "Profile",
            component: ProfileView
        },
        {
            path: "/:catchAll(.*)*",
            name: "Not Found",
            component: NotFoundView
        }
    ]
})

export default router