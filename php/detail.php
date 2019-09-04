<?php  
	
	include "conn.php";
	// $id=$_GET['sid'];
	// $result=mysql_query("select * from goodslist where sid=$id ");
	// $wronglist=mysql_fetch_array($result,MYSQL_ASSOC);
    // echo json_encode($wronglist);
    
    
    $sid=$_GET['sid'];
    
    $sql = "select * from goodslist where sid='$sid'";

    $result = $conn->query($sql);


    echo json_encode($result->fetch_assoc());

?>