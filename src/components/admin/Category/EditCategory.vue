<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[1].menuName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[1].children[0].menuName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图区域-->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getCategoryList">
                        <el-button slot="append" icon="el-icon-search" @click="getCategoryList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="categoryList" border stripe>
                <el-table-column type="index" category="#" prop="id"></el-table-column>
                <el-table-column label="分类" prop="categoryname"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit"
                                   @click="showEditDialog(scope.row.categoryname,scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete"
                                   @click="removeCategoryById(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页区域 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10, 15]"
                           :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </el-card>


        <!-- 添加分类的对话框 -->
        <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" category-width="70px">
                <el-form-item category="分类名称" prop="categoryname">
                    <el-input v-model="addForm.categoryname"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 修改分类的对话框 -->
        <el-dialog title="修改分类" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" category-width="70px">
                <el-form-item category="分类名" prop="categoryname">
                    <el-input v-model="editForm.categoryname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCategoryInfo">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EditCategory",
        data() {
            return {
                categoryList: [],
                // 获取分类列表的参数对象
                queryInfo: {
                    query: '',
                    // 当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 5
                },
                //总条数
                total: 0,

                // 控制添加分类对话框的显示与隐藏
                addDialogVisible: false,
                //添加分类内容主体
                addForm: {
                    categoryname: ''
                },
                addFormRules: {
                    categoryname: [{required: true, message: '请输入分类名', trigger: 'blur'}]
                },

                // 控制修改分类对话框的显示与隐藏
                editDialogVisible: false,
                // 要修改的分类信息对象
                editForm: {
                    categoryname: '',
                    id: 0
                },
                editFormRules: {
                    categoryname: [{required: true, message: '请输入分类名', trigger: 'blur'}]
                },

            }
        },
        methods: {
            async getCategoryList() {
                const res = await this.$http.get('/categorylist', {
                    params: this.queryInfo
                })
                console.log(res.data.categorylist)
                this.categoryList = res.data.categorylist
                console.log(this.categoryList)
                console.log(res.data.total)
                this.total = res.data.total
            },

            // 监听 pagesize 改变的事件
            handleSizeChange(newSize) {
                // console.log(newSize)
                this.queryInfo.pagesize = newSize
                this.getCategoryList()
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getCategoryList()
            },

            //添加分类事件
            addCategory() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return this.$message.error('请填写正确的信息！')
                    // 可以发起添加分类的网络请求
                    const res = await this.$http.post('addcategory', this.addForm)
                    console.log(res)
                    if (res.status !== 200) {
                        this.$message.error('添加分类失败！')
                    } else this.$message.success('添加分类成功！')
                    // // 隐藏添加分类的对话框
                    this.addDialogVisible = false
                    // 重新获取分类列表数据
                    await this.getCategoryList()
                })
            },
            // 监听添加分类对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },

            // 展示编辑分类的对话框
            showEditDialog(categoryname, id) {

                console.log(categoryname, id)
                this.editForm.categoryname = categoryname
                this.editForm.id = id
                this.editDialogVisible = true
            },
            // 监听修改分类对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            editCategoryInfo() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return this.$message.error('请填写正确的信息！')
                    // 发起修改分类信息的数据请求
                    const res = await this.$http.put('editcategory', this.editForm)
                    console.log(res)
                    if (res.status !== 200) {
                        return this.$message.error('更新分类信息失败！')
                    }
                    // 提示修改成功
                    else this.$message.success('更新分类信息成功！')
                    console.log('更新分类信息成功！')
                    // 关闭对话框
                    this.editDialogVisible = false
                    // 刷新数据列表
                    await this.getCategoryList()

                })
            },
            // 根据Id删除对应的分类信息
            async removeCategoryById(id) {
                // 弹框询问分类是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该分类, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)

                // 如果分类确认删除，则返回值为字符串 confirm
                // 如果分类取消了删除，则返回值为字符串 cancel
                // console.log(confirmResult)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }

                const res = await this.$http.delete('category/' + id)

                if (res.status !== 200) {
                    return this.$message.error('删除分类失败！')
                }
                this.$message.success('删除分类成功！')
                await this.getCategoryList()
            },

        },
        created() {
            this.getCategoryList()
        }

    }
</script>

<style scoped>

</style>
