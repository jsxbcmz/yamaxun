<?php  
	
	include "conn.php";

	// $result=mysql_query("select * from goodslist");
	
	// $wronglist=array();
	// for ($i=0; $i < mysql_num_rows($result); $i++) { 
	// 	$wronglist[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	// }

    // echo json_encode($wronglist);

    
    
    $sql = "select * from goodslist ";

    $result = $conn->query($sql);

    $res = array();

    while($row=$result->fetch_assoc()){
        array_push($res,$row);
    }

    echo json_encode($res);
    


?>