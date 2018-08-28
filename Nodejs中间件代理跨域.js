// 利用node + express + http-proxy-middleware搭建一个proxy服务器。


// 前端代码示例：

    var xhr = new XMLHttpRequest();
    // 前端开关：
    // 浏览器是否读写cookiexhr.withCredentials = true;
    // 访问http-proxy-middleware代理服务器
    xhr.open('get', 'http://www.domain1.com:3000/login?user=admin', true);
    xhr.send();

//  nodejs代码
    var express = require('express');
    var proxy = require('http-proxy-middleware');
    var app = express();
    app.use('/', proxy({    
        // 代理跨域目标接口
        target: 'http://www.domain2.com:8080',    
        changeOrigin: true,    
        // 修改响应头信息，实现跨域并允许带cookie
        onProxyRes: function(proxyRes, req, res) {
            res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
            res.header('Access-Control-Allow-Credentials', 'true');
        },   
        // 修改响应信息中的cookie域名
        cookieDomainRewrite: 'www.domain1.com'  
        // 可以为false，表示不修改
    }));
    app.listen(3000);
    console.log('Proxy server is listen at port 3000...');


