<template>
<div>
    <div class="title">
        <h1>{{this.article.title}}</h1>
    </div>
    <div class="detail">
        <div><div><span>作者：</span>{{this.article.author}}</div>
            <div><span>创建时间：</span>{{this.article.createtime.substr(0,10)}}</div>
        </div>
        <div>
            <div><span>所属分类：</span><el-tag>{{this.article.category}}</el-tag></div>
            <div><span>文章标签：</span>
                <el-tag type="success" v-for="label in this.article.labels" :key="label">{{label}}</el-tag>
            </div>
        </div>
    </div>

   <div v-html="this.article.html" class="html" ></div>
</div>

</template>

<script>
    export default {
        name: "ArticleDetail",
        data(){
            return {
                article:{
                    //标题
                    title:'',
                    //分类
                    category:'',
                    //标签
                    labels:'',
                    //作者
                    author:'',
                    //文章封面
                    cover:'',
                    //文章（md）
                    content:'',
                    //文章（html）
                    html:'',
                    //日期
                    createtime:'',
                },
            }
        },
        created(){
            this.getarticle()
        },
        methods:{
            //获取文章数据
            async getarticle(){
                const res = await this.$http.get('/article/'+this.$route.params.articleId)
                console.log(res)
                console.log(this.$route.params.articleId)
                this.article = res.data.article[0]

                this.article.labels = this.article.labels.split(',')

                console.log(res.data.article[0].labels)
                console.log( this.article.labels)
            }
        }
    }
</script>

<style lang="less" scoped>
.html{
    text-align: left;
    text-indent: 2em;
    width: 100%;
}
    .detail{
        display: flex;
        justify-content: space-between;
        background-color: #F7F7FC;
    }
  .html /deep/ img{
        width: 100% ;
    }
</style>
