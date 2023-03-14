import { createRouter, createWebHistory } from "vue-router";
import PostList from "../views/PostsList.vue"
import PostView from "../views/PostView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Posts",
            component: PostList
        },
        {
            path: "/post/:id",
            name: "Post",
            component: PostView
        }
    ]
})

export default router