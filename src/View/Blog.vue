<template>
   <div>
       <el-backtop>
           <div
               style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #666;
      }"
       >
           UP
       </div>
       </el-backtop>
       <el-container >
           <el-header >
               <router-link to="/"><img src="../assets/logo.png" title="zhifeng" ></router-link>
               <el-input placeholder="请输入内容" prefix-icon="el-icon-search" clearable v-model="input" @clear="getArticleList"></el-input>
               <el-button  icon="el-icon-search" @click="getArticleList"></el-button>
           </el-header>
           <el-container class="main">
               <el-main >
                   <router-view>
                   </router-view>
               </el-main>
               <el-aside class="hidden-md-and-down" >
                   <MenuList class="hidden-md-and-down" />
               </el-aside>
           </el-container>
           <el-footer >Copyright© 2020-{{currentYear}} designed by zhieng<router-link to="/login">后台登录</router-link></el-footer>
       </el-container>
   </div>

</template>

<script>
    import 'element-ui/lib/theme-chalk/display.css';
    import MenuList from "@/components/blog/SideBar";

    export default {
        name: 'Blog',
        components:{
            MenuList
        },
        data(){
            return {
                input:'',
                show:true,
                date:new Date(),
                currentYear: new Date().getFullYear(),
                //热门文章
                articlelist:{}
            }
        },
        created(){

        },
        methods:{
            async getArticleList(){
                await this.$router.push({path: '/ArticleList', query: {title: this.input}})
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .el-container{
        height: 100%;
    }
    .el-header{
        display: flex;
        position: fixed;
        box-shadow: 0 0 2px #eee;
        width: 100%;
        align-items: center;
        background-color: #ffffff;
        img{
            width: 50px;
            height: 50px;
        }
        .el-input{
            margin-left: 10px;
            width: 300px;
        }
    }
    .main{
        margin-top: 60px;
    }
    .el-main{
        margin: 15px 0px;
    }
    .el-aside{
        margin-top: 20px;
    }
    .el-footer{
        text-align: center;
        line-height: 60px;
        color: #939393;
        justify-items: flex-end;
        font-size: 10px;
        a{
            text-decoration: none;
            color: blue;
        }
    }


</style>
