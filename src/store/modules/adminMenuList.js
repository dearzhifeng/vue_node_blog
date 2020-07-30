// state
const state = {
    adminMenuList:[
        {
            id:1,
            menuName:'文章管理',
            iconName:'iconfont icon-wenzhang',
            children:[{menuName:'文章编辑', path:'createarticle'}, {menuName:'文章列表', path:'editarticle'}]
        },
        {
            id:2,
            menuName:'分类管理',
            iconName:'iconfont icon-leimu',
            children:[ {menuName:'分类列表', path:'editcategory'}]
        },
        {
            id:3,
            menuName:'标签管理',
            iconName:'iconfont icon-biaoqian',
            children:[{menuName:'标签列表', path:'editlabel'}]
        },
        {
            id:4,
            menuName:'用户管理',
            iconName:'iconfont icon-yonghu',
            children:[{menuName:'用户列表', path:'edituser'}]
        },
    ]
}
// mutations
const mutations = {}
// getters
const getters = {}
// actions
const actions = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
