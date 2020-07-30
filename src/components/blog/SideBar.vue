<template>

    <aside class="sidebar">
        <!--热门文章-->
        <section class="module-css">
            <div class="module-title"><span class="iconfont icon-remen"  ></span>热门文章</div>
            <ul class="module-item-wrap hot">
                <li class="hot-item module-item" v-for="(item, index) in articlelist" :key="index"><span>{{index +
          1}}</span>
                    <router-link
                            :to="{name:'ArticleDetail',params:{articleId: item.id}}" :title="item.title">{{item.title}}
                    </router-link>
                </li>
            </ul>
        </section>
        <!--分类-->
        <section class="module-css">
            <div class="module-title"><span class="iconfont icon-leimu" name="category"></span>分类</div>
            <ul class="module-item-wrap category">
                <li class="category-item module-item" v-for="(item, index) in categoryList" :key="index">
                    <router-link :to="{path:'/ArticleList',query: {category:item.categoryname}}">{{item.categoryname}}
                    </router-link>
                    </li>
            </ul>
        </section>
        <!--标签-->
        <section class="module-css">
            <div class="module-title">
                <span class="iconfont icon-biaoqian" name="tag" style="width: 21px;margin-top: 2px;"></span>
                标签
            </div>
            <div class="module-item-wrap tag">
                <router-link :to="{path:'/ArticleList',query: {labels:item.labelname}}" v-for="(item, index) in labelList" :key="index"># {{item.labelname}}
                </router-link>
            </div>
        </section>
    </aside>


</template>

<script>

    export default {
        name: "SidBar",
        components: {},
        data(){
            return{
                articlelist: [],
                categoryList:[],
                labelList:[]
            }
        },
        created(){
            this.getNewArticles()
             this.getCategories()
             this.getLabels()
        },
       methods:{
           async getNewArticles(){
               const  res = await this.$http.get('NewArticles')
              // console.log(res)
               this.articlelist = res.data.articlelist
              // console.log(this.articlelist)
           },
           async getCategories(){
               const  res = await this.$http.get('categorynamelist')

               this.categoryList = res.data
           },
           async getLabels(){
               const  res = await this.$http.get('labelnamelist')
               this.labelList = res.data
              // console.log(res)
           }
       }
    }
</script>

<style lang="less" scoped>
    .sidebar {
        li {
            list-style: none;
        }

        .module-css {
            background-color: #fff;

            .module-title {
                display: flex;
                align-items: center;
                border-bottom: 1px solid #eee;
                padding: 15px;
                font-size: 14px;
                line-height: 14px;
                font-weight: bold;

                span {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                    margin-top: 6px;
                }
            }

            .module-item {
                padding: 0 15px;
            }

            .hot {
                padding: 0px;

                .hot-item {
                    display: flex;
                    line-height: 38px;
                    align-items: center;

                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        background-color: #7F828B;
                        color: #fff;
                        margin-right: 8px;
                    }

                    a {
                        flex: 1;
                        font-size: 14px;
                        white-space: nowrap;
                        color: #666666;
                        text-decoration: none;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: padding-left 0.5s;

                        &:hover {
                            padding-left: 5px;
                            color: #409eff;
                            font-weight: bold;
                        }
                    }

                }
            }

            .category {
                padding: 0px;
                .category-item {
                    display: flex;
                    line-height: 38px;
                    justify-content: center;
                    font-size: 14px;
                    cursor: pointer;
                    a{
                        width: 100%;
                        color: #666666;
                        text-decoration: none;
                        transition: padding-left 0.5s;
                        &:hover {
                            padding-left: 5px;
                            color: #409eff;
                            font-weight: bold;
                        }
                    }


                    span {
                        margin-left: auto;
                    }
                }
            }

            .tag {
                display: flex;
                flex-wrap: wrap;
                padding: 8px 15px 0;

                a {
                    border: 1px solid #ccc;
                    margin: 0 8px 8px 0;
                    padding: 5px 6px;
                    font-size: 13px;
                    border-radius: 4px;
                    color: #666666;
                    text-decoration: none;

                    &:hover {
                        background-color: #eee;
                    }
                }
            }
        }

        .module-css + .module-css {
            margin-top: 15px;
            paddng:0px;
        }
    }
</style>
