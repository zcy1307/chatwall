var timer;

var socket = io.connect('https://wall.cgcgbcbc.com');

//接受普通用户的消息并展示
socket.on("new message", function(data) {
    var img1, img2, img3, name1, name2, name3, content1, content2, content3;
    img1 = document.getElementById('headimg1');
    img2 = document.getElementById('headimg2');
    img3 = document.getElementById('headimg3');
    name1 = document.getElementById('nickname1');
    name2 = document.getElementById('nickname2');
    name3 = document.getElementById('nickname3');
    content1 = document.getElementById('content1');
    content2 = document.getElementById('content2');
    content3 = document.getElementById('content3');


    //如果第一条为管理员消息则不覆盖
    if (name1.innerHTML != 'admin:') {
        img1.setAttribute("src", img2.src);
        name1.innerText = name2.innerText;
        content1.innerText = content2.innerText;
    }
    img2.setAttribute("src", img3.src);
    name2.innerText = name3.innerText;
    content2.innerText = content3.innerText;
    img3.setAttribute("src", data.headimgurl);
    name3.innerText = data.nickname + ':';
    content3.innerText = data.content;
});
//接受管理员的消息并展示
socket.on("admin", function(data) {
    var img1, img2, img3, name1, name2, name3, content1, content2, content3;
    img1 = document.getElementById('headimg1');
    img2 = document.getElementById('headimg2');
    img3 = document.getElementById('headimg3');
    name1 = document.getElementById('nickname1');
    name2 = document.getElementById('nickname2');
    name3 = document.getElementById('nickname3');
    content1 = document.getElementById('content1');
    content2 = document.getElementById('content2');
    content3 = document.getElementById('content3');

    img1.setAttribute("src", "images/admin.jpg");
    name1.innerText = data.nickname + ':';
    content1.innerText = data.content;
    name1.style.color = 'red';
    //设置管理员消息置顶10秒
    if (name1.innerHTML == 'admin:')
        clearTimeout(timer);
    timer = setTimeout(function() {
        $.get('https://wall.cgcgbcbc.com/api/messages?num=3', function(data) {
            img1.setAttribute("src", data[2].headimgurl);
            name1.innerText = data[2].nickname + ':';
            content1.innerText = data[2].content;
        });
        name1.style.color = 'white';
    }, 10000);
});
//刷新页面后加载历史消息
$(document).ready(function() {
    $.get('https://wall.cgcgbcbc.com/api/messages?num=3', function(data) {
        var img1, img2, img3, name1, name2, name3, content1, content2, content3;
        img1 = document.getElementById('headimg1');
        img2 = document.getElementById('headimg2');
        img3 = document.getElementById('headimg3');
        name1 = document.getElementById('nickname1');
        name2 = document.getElementById('nickname2');
        name3 = document.getElementById('nickname3');
        content1 = document.getElementById('content1');
        content2 = document.getElementById('content2');
        content3 = document.getElementById('content3');

        img1.setAttribute("src", data[2].headimgurl);
        img2.setAttribute("src", data[1].headimgurl);
        img3.setAttribute("src", data[0].headimgurl);
        name1.innerText = data[2].nickname + ':';
        name2.innerText = data[1].nickname + ':';
        name3.innerText = data[0].nickname + ':';
        content1.innerText = data[2].content;
        content2.innerText = data[1].content;
        content3.innerText = data[0].content;
    });
});
