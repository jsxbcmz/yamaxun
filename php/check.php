<?php
require "conn.php";

if(isset($_GET['checkname'])){

    $username=$_GET['checkname'];
    
    $sql = "select * from userlist where username='$username'";

    $result = $conn->query($sql);

    if($result->fetch_assoc()){
        echo false;
    }else{
        echo true;
    }

}
