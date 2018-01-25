<?php
    header("content-type","text/html;charset=utf-8");

    //1、链接数据库（搭桥）
    $conn = mysql_connect("localhost","root","root");

    //2、选择数据库（目的地）
    mysql_select_db("flowerDB",$conn);

    //3、执行SQL（struct query language）语句
    $username = '张九疯';
    $sqlStr="insert into vip  values('".$username."','123456','女',18)";
    mysql_query($sqlStr,$conn);

    //4、关闭数据库
    mysql_close($conn);
?>