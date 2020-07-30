<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>知风的后台管理</span>
            </div>
            <div><span style="margin-right: 5px">欢迎登录！{{username}}</span><el-button type="info" @click="logout">退出</el-button></div>
        </el-header>
        <!-- 页面主体区域 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside  width="200px">
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened  router :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id" >
                        <!-- 一级菜单的模板区域 -->
                        <template slot="title" >
                            <div style="display: flex">
                                <!-- 图标 -->
                                <i :class="item.iconName"></i>
                                <!-- 文本 -->
                                <span>{{item.menuName}}</span>
                            </div>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="''+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                            <template slot="title">
                                <!-- 文本 -->
                                <span>{{subItem.menuName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容主体 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name:'Admin',
        data() {
            return {
                // 左侧菜单数据
                menulist: this.$store.state.adminMenuList.adminMenuList,
                // 被激活的链接地址
                activePath: '',
                username:window.localStorage.getItem('username')
            }
        },
        created() {
            this.activePath = window.sessionStorage.getItem('activePath')


        },
        mounted(){
            this.checkToken()
        },
        methods: {
            logout() {
                localStorage.removeItem('token')
                this.$router.push('/login')
            },

            // 保存链接的激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            },

            //检查token值
             async checkToken(){
                 const res =await this.$http.get('/admin')
                 if(res.data.status===403){
                     this.$message.error(`${res.data.message}`)
                     localStorage.removeItem('token')
                     await this.$router.push('/login')
                 }
                 console.log(res.data.status)

            }
        },

    }
</script>

<style lang="less" scoped>
    .home-container {
        height: 100%;
    }
    .el-header {
        color: black;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        font-size: 20px;
        > div {
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #333744;
        .el-menu {
            border-right: none;
        }
    }

    .el-main {
        background-color: #eaedf1;
        padding: 20px;
        text-align: left;
    }

    .iconfont {
        margin-right: 10px;
    }
.el-submenu__title{
    display: flex;
    justify-content: space-around;
}
    .toggle-button {
        background-color: #4a5064;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
    }
</style>
