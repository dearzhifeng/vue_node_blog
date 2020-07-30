<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[2].menuName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[2].children[0].menuName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!--        卡片视图区域-->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getLabelList">
                        <el-button slot="append" icon="el-icon-search" @click="getLabelList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加标签</el-button>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <el-table :data="labelList" border stripe>
                <el-table-column type="index" label="#" prop="id"></el-table-column>
                <el-table-column label="标签" prop="labelname"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-button type="primary" icon="el-icon-edit"
                                   @click="showEditDialog(scope.row.labelname,scope.row.id)"></el-button>
                        <!-- 删除按钮 -->
                        <el-button type="danger" icon="el-icon-delete"
                                   @click="removeLabelById(scope.row.id)"></el-button>
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


        <!-- 添加标签的对话框 -->
        <el-dialog title="添加标签" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
            <!-- 内容主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="标签名称" prop="labelname" label-width="80px">
                    <el-input v-model="addForm.labelname"></el-input>
                </el-form-item>
            </el-form>
            <!-- 底部区域 -->
            <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addLabel">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 修改标签的对话框 -->
        <el-dialog title="修改标签" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
            <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
                <el-form-item label="标签名" prop="labelname">
                    <el-input v-model="editForm.labelname"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLabelInfo">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EditLabel",
        data() {
            return {
                labelList: [],
                // 获取标签列表的参数对象
                queryInfo: {
                    query: '',
                    // 当前的页数
                    pagenum: 1,
                    // 当前每页显示多少条数据
                    pagesize: 5
                },
                //总条数
                total: 0,

                // 控制添加标签对话框的显示与隐藏
                addDialogVisible: false,
                //添加标签内容主体
                addForm: {
                    labelname: ''
                },
                addFormRules: {
                    labelname: [{required: true, message: '请输入标签名', trigger: 'blur'}]
                },

                // 控制修改标签对话框的显示与隐藏
                editDialogVisible: false,
                // 要修改的标签信息对象
                editForm: {
                    labelname: '',
                    id: 0
                },
                editFormRules: {
                    labelname: [{required: true, message: '请输入标签名', trigger: 'blur'}]
                },

            }
        },
        methods: {
            async getLabelList() {
                const res = await this.$http.get('/labellist', {
                    params: this.queryInfo
                })
                console.log(res.data.labellist)
                this.labelList = res.data.labellist
                console.log(this.labelList)
                console.log(res.data.total)
                this.total = res.data.total
            },

            // 监听 pagesize 改变的事件
            handleSizeChange(newSize) {
                // console.log(newSize)
                this.queryInfo.pagesize = newSize
                this.getLabelList()
            },
            // 监听 页码值 改变的事件
            handleCurrentChange(newPage) {
                console.log(newPage)
                this.queryInfo.pagenum = newPage
                this.getLabelList()
            },

            //添加标签事件
            addLabel() {
                this.$refs.addFormRef.validate(async valid => {
                    if (!valid) return this.$message.error('请填写正确的信息！')
                    // 可以发起添加标签的网络请求
                    const res = await this.$http.post('addlabel', this.addForm)
                    console.log(res)
                    if (res.status !== 200) {
                        this.$message.error('添加标签失败！')
                    } else this.$message.success('添加标签成功！')
                    // // 隐藏添加标签的对话框
                    this.addDialogVisible = false
                    // 重新获取标签列表数据
                    await this.getLabelList()
                })
            },
            // 监听添加标签对话框的关闭事件
            addDialogClosed() {
                this.$refs.addFormRef.resetFields()
            },

            // 展示编辑标签的对话框
            showEditDialog(labelname, id) {

                console.log(labelname, id)
                this.editForm.labelname = labelname
                this.editForm.id = id
                this.editDialogVisible = true
            },
            // 监听修改标签对话框的关闭事件
            editDialogClosed() {
                this.$refs.editFormRef.resetFields()
            },
            editLabelInfo() {
                this.$refs.editFormRef.validate(async valid => {
                    if (!valid) return this.$message.error('请填写正确的信息！')
                    // 发起修改标签信息的数据请求
                    const res = await this.$http.put('editlabel', this.editForm)
                     console.log(res)
                    if (res.status !== 200) {
                        return this.$message.error('更新标签信息失败！')
                    }
                    // 提示修改成功
                    else this.$message.success('更新标签信息成功！')
                    console.log('更新标签信息成功！')
                    // 关闭对话框
                    this.editDialogVisible = false
                    // 刷新数据列表
                    await this.getLabelList()

                })
            },
            // 根据Id删除对应的标签信息
            async removeLabelById(id) {
                // 弹框询问标签是否删除数据
                const confirmResult = await this.$confirm(
                    '此操作将永久删除该标签, 是否继续?',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).catch(err => err)

                // 如果标签确认删除，则返回值为字符串 confirm
                // 如果标签取消了删除，则返回值为字符串 cancel
                // console.log(confirmResult)
                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }

                const res = await this.$http.delete('label/' + id)

                if (res.status !== 200) {
                    return this.$message.error('删除标签失败！')
                }
                this.$message.success('删除标签成功！')
                await this.getLabelList()
            },

        },
        created() {
            this.getLabelList()
        }

    }
</script>

<style scoped>

</style>
