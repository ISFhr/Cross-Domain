

//a.html：(http://www.domain1.com/a.html)

var proxy = function(url, callback) {    
    var state = 0;    
    var iframe = document.createElement('iframe');    

    // 加载跨域页面
    iframe.src = url;    

    // onload事件会触发2次，
    // 第1次加载跨域页，    
    // 并留存数据于window.name
    iframe.onload = function() {        
        if (state === 1) {               
            // 第2次onload(同域proxy页)成功后，
            // 读取同域window.name中数据
            callback(iframe.contentWindow.name);
            destoryFrame();
        } else if (state === 0) {            
            // 第1次onload(跨域页)成功后，
            //切换到同域代理页面
            iframe.contentWindow.location = 'http://www.domain1.com/proxy.html';
            state = 1;
        }
    };  
    
    
    document.body.appendChild(iframe);    
        // 获取数据以后销毁这个iframe，
        //  释放内存；
        // 这也保证了安全（不被其他域frame js访问）
    function destoryFrame() {
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();        
        document.body.removeChild(iframe);
    }
};
    // 请求跨域b页面数据
    proxy ('http://www.domain2.com/b.html', function(data) {
        alert(data);
    });