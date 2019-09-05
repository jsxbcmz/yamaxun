<?php
require "conn.php";

if(isset($_GET['checkname'])){
    // $username=$_GET['checkname'];
    // $result=mysql_query("select * from userlist where username='$username'");
    // $wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
    // echo json_encode($wronglist);
    

    $username=$_GET['checkname'];
    
    $sql = "select * from userlist where username='$username'";

    $result = $conn->query($sql);

    if($result->fetch_assoc()){
        echo false;
    }else{
        echo true;
    }
    // while($row=$result->fetch_assoc()){
    //     array_push($res,$row);
    // }

    // echo json_encode($res);


}
