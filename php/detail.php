<?php  
	
	include "conn.php";
  
    $sid=$_GET['sid'];
    
    $sql = "select * from goodslist where sid='$sid'";

    $result = $conn->query($sql);


    echo json_encode($result->fetch_assoc());

?>