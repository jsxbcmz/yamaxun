<?php
require "conn.php";

    $name=$_GET['username'];
    $pass=$_GET['password'];
    $email=$_GET['email'];
    $phone=$_GET['phone'];
    
    $sql = "insert userlist values(null,'$name','$phone','$email','$pass')";

    $result = $conn->query($sql);


    header('location:http://10.31.157.44/1907/project/src/login.html');

