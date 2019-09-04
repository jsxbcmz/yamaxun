<?php
require "conn.php";

if(isset($_GET['user'])&&isset($_GET['pass'])){
    $user=$_GET['user'];
    $pass=$_GET['pass'];
    // $result=mysql_query("select * from userlist where username='$user 'and password='$pass' ");

    // $result->fetch_assoc()

    // if(mysql_fetch_array($result,MYSQL_ASSOC)){
    //     echo true;
    // }else{
    //     echo false;
    // }
    
    $sql = "select * from userlist where username='$user' and password='$pass' ";

    $result = $conn->query($sql);

    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }

	// echo json_encode($wronglist);

}