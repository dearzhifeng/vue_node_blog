<template>
    <div >
<!--        文章列表-->
        <el-card v-for="article in articlelist" :key="article.id" shadow="hover" :body-style="cardstyle">
               <div class="flex">
                   <div><img class="img" :src=article.cover></div>
                   <div class="context">
                       <router-link
                               :to="{name:'ArticleDetail',params:{articleId: article.id}}" :title="article.title">{{article.title}}
                       </router-link>
                       <div class="abstract">{{article.abstract}}</div>
                       <div class="botton"><div>作者：{{article.author}}</div><div>创建时间：{{article.createtime |dateFormat}}</div></div>

                   </div>
               </div>

        </el-card>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "ArticleList",
        data(){
            return{
                // 获取用户列表的参数对象
                queryInfo: {
                    queryname:'title',
                   query:'',
                    // 当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 5
                },
                articlelist: {},
                //总条数
                total: 0,
                //展示样式
                cardstyle:{
                    display: 'flex',

                }
            }
        },
        created(){
            this.getArticleList()
        },
        methods:{

            //获取文章列表数据
            async getArticleList() {
                const res = await this.$http.get('/blogarticlelist', {
                    params: this.queryInfo
                })
                this.total = res.data.total
                this.articlelist = res.data.articlelist
                for(let i=0 ; i<this.articlelist.length;i++){
                    this.articlelist[i].abstract = this.articlelist[i].html.replace(/<[^>]+>/g, '')
                }
                console.log(this.articlelist)

            },


            // 监听 pagesize 改变的事件
            handleSizeChange(newSize) {
                // console.log(newSize)
                this.queryInfo.pagesize = newSize
                this.getArticleList()
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
               // console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getArticleList()
            },

        },
        watch:{
            $route(){
                this.queryInfo.queryname = Object.keys(this.$route.query)[0]
                this.queryInfo.query = Object.values(this.$route.query)[0]
                console.log(this.query)
                this.getArticleList()
            }
        }
    }
</script>

<style lang="less" scoped>
    .flex{
        display: flex;
        width: 100%;
    }
.el-card{

    margin-top: 5px;
    width: 100%;
    a {
        flex: 1;
        white-space: nowrap;
        color: #666666;
        text-decoration: none;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: padding-left 0.5s;

        &:hover {
            padding-left: 5px;
            color: #409eff;
            font-weight: bold;
        }
    }

    .img{
        width: 100px; height: 100px;
        margin-right: 10px;
    }
    .context{
        flex-grow: 1;
        width: 50%;
        .title{

            margin-bottom: 5px;
        }
        .abstract{
            text-indent:2em;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            text-align: left;
            color: #666;
        }
        .botton{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 5px;
        }
    }
}
</style>
