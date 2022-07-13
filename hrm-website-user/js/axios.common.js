axios.interceptors.request.use(config => {
    //从cookie中获取指定的值
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            let c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1)
            {
                c_start=c_start + c_name.length+1
                let c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return "";
    }

    let token = getCookie("access_token");
    if (token){
        //如果token存在 设置进请求头
        config.headers['Authorization'] = "Bearer "+token;
    }else {
        //token超时
        //直接移除user 且跳转回登录界面
        sessionStorage.removeItem('user');
    }
    return config
}, error => {
    Promise.reject(error)
})