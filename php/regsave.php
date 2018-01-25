<?php
    header("content-type","text/html;charset=utf-8");
    //一、接收前端数据
    $username = $_POST['username'];
    $userpass = $_POST['userpass'];

    //二、处理

    //1、链接数据库（搭桥）
    $conn = mysql_connect("localhost","root","root");

    //2、选择数据库（目的地）
    mysql_select_db("flowerDB",$conn);

    //3、数据库操作
    //3.1查找用户名是否存在
    $sqlStr="select * from vip where username='".$username."'";
    $result = mysql_query($sqlStr,$conn);
    $rows = mysql_num_rows($result);
    if($rows==0){
        //3.2 把该用户名插入数据库中
        //3、执行SQL（struct query language）语句
        $sqlStr="insert into vip(username,userpass)  values('".$username."','".$userpass."')";
        mysql_query($sqlStr,$conn);

        //4、关闭数据库
        mysql_close($conn);
        //三、响应
        echo "注册成功！"
    }else{
        //三、响应
        echo "注册失败，该用户名已经存在！"
    }
?>