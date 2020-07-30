<template>
    <div>
        <!--        面包屑导航-->
        <el-breadcrumb  separator-class="el-icon-arrow-right" style="margin: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[0].menuName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$store.state.adminMenuList.adminMenuList[0].children[0].menuName}}</el-breadcrumb-item>
        </el-breadcrumb>

<!--        卡片视图区域-->
        <el-card>
            <!-- 内容主体区域 -->
            <el-form :model="articleForm" :rules="articleFormRules" ref="articleFormRef">
                <el-form-item label="标题" label-width="50px"  prop="title">
                    <el-input style="width: 500px" v-model="articleForm.title"></el-input>
                </el-form-item>
               <div class="flex">
                   <el-form-item label="分类" label-width="50px" prop="category">
                       <el-select v-model="articleForm.category">
                           <el-option
                                   v-for="item in categorylist"
                                   :key="item.categoryname"
                                   :label="item.categoryname"
                                   :value="item.categoryname">
                           </el-option>
                       </el-select>
                   </el-form-item>
                   <el-form-item label="标签" label-width="50px" prop="label">
                       <el-select v-model="articleForm.labels" multiple>
                           <el-option
                                   v-for="item in labellist"
                                   :key="item.labelname"
                                   :label="item.labelname"
                                   :value="item.labelname">
                           </el-option>
                       </el-select>
                   </el-form-item>
               </div>
                <el-form-item label="作者" label-width="50px" >
                    <el-input style="width: 500px" disabled v-model="articleForm.author"></el-input>
                </el-form-item>
                <el-form-item label="创作时间" label-width="75px">
                    <el-date-picker
                            v-model="articleForm.createtime"
                            type="datetime"
                            readonly>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文章封面" prop="cover">
                    <el-upload class="avatar-uploader" :show-file-list="false" action="" :auto-upload="false" :on-change="handleAvatarChange">
                        <img v-if="this.articleForm.cover" :src="this.articleForm.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>

                <mavon-editor class="mavoneditor" v-model="articleForm.content" ref="md" @imgAdd="handleEditorImgAdd" @imgDel="handleEditorImgDel" @save="handleEditorSave"></mavon-editor>
            </el-form>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-card>

    </div>
</template>

<script>

    export default {
        name: "CreateArticle",
        data(){
            return{
                //提交的表单数据
                articleForm:{
                    //标题
                    title:'',
                    //分类
                    category:'',
                    //标签
                    labels:[],
                    //作者
                    author:window.localStorage.getItem('username'),
                    //文章封面
                    cover:'',
                    //文章（md）
                    content:'',
                    //文章（html）
                    html:'',
                    //日期
                    createtime:new Date(),
                },
                //表单验证规则
                articleFormRules:{
                    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                    category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
                    labels: [{ required: true, message: '请选择标签', trigger: 'blur' }],
                    cover: [{ required: true, message: '请选择封面', trigger: 'blur' }]
                },
                categorylist:[],
                labellist:[],

                // coverFile:{},
                // imageUrl: '',




            }
        },
        created(){
            this.getAllCategoryList(),
                this.getAllLabelList(),
                this.checkEdit()

        },
        methods:{
            //获取分类数据
            async getAllCategoryList(){
                const res = await this.$http.get('/categorynamelist')
                this.categorylist=res.data
            },
            //获取标签数据
            async getAllLabelList(){
                const res = await this.$http.get('/labelnamelist')
                this.labellist=res.data
            },
            //图片转换
            getBase64(file) {
                return new Promise(function(resolve, reject) {
                    let reader = new FileReader();
                    let imgResult = "";
                    reader.readAsDataURL(file);
                    reader.onload = function() {
                        imgResult = reader.result;
                    };
                    reader.onerror = function(error) {
                        reject(error);
                    };
                    reader.onloadend = function() {
                        resolve(imgResult);
                    };
                });
            },
            //处理文章封面
            handleAvatarChange( file) {

                this.getBase64(file.raw).then(res => {
                    console.log(res)
                    this.articleForm.cover =res

                });
//                 console.log(file)
// console.log(file.raw)
//                 const reader = new FileReader()
//                 this.imageUrl = reader.readAsDataURL(file.raw)

                //this.imageUrl = URL.createObjectURL(file.raw);
                // this.articleForm.cover = this.imageUrl
                // this.coverFile = file.raw
                // console.log(this.coverFile)
                //console.log(this.imageUrl)
            },
            // beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
            //     const isLt2M = file.size / 1024 / 1024 < 2;
            //
            //     if (!isJPG) {
            //         this.$message.error('上传文章封面只能是 JPG 格式!');
            //     }
            //     if (!isLt2M) {
            //         this.$message.error('上传文章封面大小不能超过 2MB!');
            //     }
            //     return isJPG && isLt2M;
            // },
            // async uploadCover(){
            //     console.log(this.coverFile)
            //     const formData = new FormData();
            //     const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
            //     formData.append('file', this.coverFile);
            //     const res = await this.$http.post('/uploadCover',formData,headerConfig)
            //     this.articleForm.cover = res
            // },

            //处理markdown
            handleEditorImgAdd(pos,file){
                //var base64Data = file.miniurl.replace(/^data:image\/\w+;base64,/, "")
                //console.log(base64Data)
                // console.log(pos)
                // console.log(file)
               // console.log(file.miniurl)
                this.$refs.md.$img2Url(pos,file.miniurl)
                //this.$refs.md.$imgUpdateByUrl(pos,file.miniurl)
                //pos = file.miniurl
               // console.log(pos)
            },
            handleEditorImgDel(){
               // console.log(file)
            },
            handleEditorSave(value ,render){
                this.articleForm.content = value
                this.articleForm.html = render
                console.log(render)
                console.log(this.articleForm)
            },


            //提交事件
            submit(){
                this.$refs.articleFormRef.validate(
                    async valid =>{
                        if (!valid) return this.$message.error('还有信息未填写！')
                        //检查是否为修改操作
                        if(this.$route.params.articleId){
                            // 可以发起修改用户的网络请求
                            const res = await this.$http.put('editarticle', this.articleForm)
                            console.log(res)
                            console.log(res.data)
                            console.log(res.data.status)
                            if(res.data.status===200) this.$message.success('提交成功！')

                        }else{
                            // 可以发起添加用户的网络请求
                            const res = await this.$http.post('addarticle', this.articleForm)
                            console.log(res)
                            console.log(res.data)
                            console.log(res.data.status)
                            if(res.data.status===200) this.$message.success('提交成功！')
                        }
                        await this.$router.push('EditArticle')

                    }
                )
            },


            //检查是否为修改文章操作
            async checkEdit(){
                if(this.$route.params.articleId){
                    const res = await this.$http.get('/article/'+this.$route.params.articleId)
                    this.articleForm = res.data.article[0]
                    this.articleForm.labels = this.articleForm.labels.split(',')
                }


            }


        }

    }
</script>

<style lang="less" scoped>

.flex{
    display: flex;
    justify-content: left;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
    .mavoneditor{
min-height: 700px;
        max-height: 1000px;
    }
</style>
