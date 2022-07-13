<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:45%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
      <el-button type="primary" style="width:45%;" @click.native.prevent="register">公司入驻</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'yhptest',
          checkPass: '1'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      register(){
          //跳转到公司入驻界面
          this.$router.push({ path: '/register' });
      },
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };

            //验证成功之后发送请求 经由鉴权中心
            let url="/auth/oauth/token";
            let param ="client_id=system&client_secret=123&grant_type=password&redirect_uri=http://www.baidu.com"+"&username="+loginParams.username+"&password="+loginParams.password;
            //直接登录请求
            this.$http.post(url+"?"+param).then(res=>{
              let{access_token,refresh_token,expires_in} = res.data;
              if (access_token){
                this.logining = false;
                var exp = new Date();
                exp.setTime(exp.getTime()+parseInt(expires_in)*1000);//设置过期时间 毫秒*1000改为秒
                //将token存在cookie中
                document.cookie="access_token="+escape(access_token)+";expires="+exp.toGMTString();
                //将用户存在本地 不然会报错
                sessionStorage.setItem('user', '{"username":"'+loginParams.username+'"}');
                //跳转
                this.$router.push({ path: '/echarts' });
              }else {
                //登录失败 弹框
                this.$message({ message: "用户名密码错误",type: 'error'});
              }
            }).catch(error => {
              //登录失败 弹框
              this.$message({ message: "用户名密码错误",type: 'error'});
            })
            //登录成功跳转/table的路由地址
           /* sessionStorage.setItem('user', '{"username":"admin","password":"123"}');
            //本来就是字符串在包装一个就完蛋了,巨大坑..
            sessionStorage.setItem('token', "xxxx");
            // this.$router.push({ path: '/table' });
            //修改登录成功后跳转到首页
            this.$router.push({ path: '/echarts' });
            this.logining = false;
            return;*/

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>