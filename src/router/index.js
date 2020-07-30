import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Blog',
    component: () => import(/* webpackChunkName: "admin" */ '../View/Blog.vue'),
    redirect:'ArticleList',
    children:[
      {
        path:'ArticleList',
        name:`ArticleList`,
        component: () => import(/* webpackChunkName: "blog" */ '../components/blog/ArticleList')
      },
      {
        path:'ArticleDetail/:articleId',
        name:`ArticleDetail`,
        component: () => import(/* webpackChunkName: "blog" */ '../components/blog/ArticleDetail')
      },
    ],

   },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../View/Login.vue')
  },
    {
      path: '/Admin',
      name: 'Admin',
      component: () => import(/* webpackChunkName: "admin" */ '../View/Admin.vue'),
      redirect:'admin/EditArticle',
      children: [
          {
            path:'CreateArticle',
            name:`CreateArticle`,
            component: () => import(/* webpackChunkName: "admin" */ '../components/admin/Article/CreateArticle')
          },
        {
          path:'EditArticle',
          name:'EditArticle',
          component: () => import(/* webpackChunkName: "admin" */ '../components/admin/Article/EditArticle')
        },
        {
          path:'EditCategory',
          name:'EditCategory',
          component: () => import(/* webpackChunkName: "admin" */ '../components/admin/Category/EditCategory')
        },
        {
          path:'EditLabel',
          name:'EditLabel',
          component: () => import(/* webpackChunkName: "admin" */ '../components/admin/Label/EditLabel')
        },
        {
          path:'EditUser',
          name:'EditUser',
          component: () => import(/* webpackChunkName: "admin" */ '../components/admin/User/EditUser')
        }
      ]
    }

]

const router = new VueRouter({
  routes
})



//挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path.indexOf('admin')>-1 ){
//     if(!window.localStorage.token){
//       //如果没有token
//       next({ name: 'Login' })
//     }
// next()
//
//   }
//
//   next()
// })

export default router
