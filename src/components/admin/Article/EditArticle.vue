<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb  separator-class="el-icon-arrow-right" style="margin: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[0].menuName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[0].children[1].menuName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card>
<!--             搜索与添加区域-->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getArticleList">
                        <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="goToCreate">新建文章</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="articlelist" border stripe>
                <el-table-column label="ID" prop="id"></el-table-column>
                <el-table-column label="标题" prop="title"></el-table-column>
                <el-table-column label="作者" prop="author"></el-table-column>
                <el-table-column label="创建时间" prop="createtime" width="100px">
                    <template slot-scope="scope">
                        {{scope.row.createtime | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="分类" prop="category"></el-table-column>
                <el-table-column label="标签" prop="labels">
                    <template slot-scope="scope">
                        <el-tag type="success" v-for="label in scope.row.labels.split(',')" :key="label">{{label}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否发布">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="articleStateChanged(scope.row)" :active-value="'true'" :inactive-value="'false'">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditArticleById(scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeArticleById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "EditArticle",
        data(){
            return{
                // 获取用户列表的参数对象
                queryInfo: {
                    query: '',
                    // 当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 5
                },
                articlelist: {},
                //总条数
                total: 0,
            }
        },
        created(){
            this.getArticleList()
        },
    methods:{

            //获取文章列表数据
        async getArticleList() {
            const res = await this.$http.get('/articlelist', {
                params: this.queryInfo
            })
            console.log(res.data.articlelist)
            this.total = res.data.total
            this.articlelist = res.data.articlelist

        },

        // 监听 switch 开关状态的改变
        async articleStateChanged(articleinfo) {
            console.log(articleinfo)
            const { data: res } = await this.$http.put(
                `article/${articleinfo.id}/state/${articleinfo.state}`
            )
            console.log(res)
            if (res.status !== 200) {
                articleinfo.state = !articleinfo.state
                return this.$message.error('更新文章状态失败！')
            }
            this.$message.success('更新文章状态成功！')
        },
        //修改文章
        EditArticleById(id){
          this.$router.push({name: 'CreateArticle', params: {articleId:id}})
        },

        // 根据Id删除对应的用户信息
        async removeArticleById(id) {
            // 弹框询问用户是否删除数据
            const confirmResult = await this.$confirm(
                '此操作将永久删除该用户, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).catch(err => err)

            // 如果用户确认删除，则返回值为字符串 confirm
            // 如果用户取消了删除，则返回值为字符串 cancel
            // console.log(confirmResult)
            if (confirmResult !== 'confirm') {
                return this.$message.info('已取消删除')
            }

            const res = await this.$http.delete('article/' + id)

            if (res.data.status !== 200) {
                return this.$message.error('删除用户失败！')
            }
            this.$message.success('删除用户成功！')
            await this.getArticleList()
        },

        // 监听 pagesize 改变的事件
        handleSizeChange(newSize) {
            // console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getArticleList()
        },
        // 监听 页码值 改变的事件
        handleCurrentChange(newPage) {
            console.log(newPage)
            this.queryInfo.pagenum = newPage
            this.getArticleList()
        },

        //新建文章
        goToCreate(){
            this.$router.push({name: 'CreateArticle'})
        }
    }
    }
</script>

<style scoped>

</style>
