<?php  
require "conn.php";  
    $name=$_GET['username'];
    $pass=$_GET['password'];
    
    $sql = "update userlist set password='$pass' where username='$name'";

    $result = $conn->query($sql);