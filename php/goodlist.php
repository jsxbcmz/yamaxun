<?php  
	
	include "conn.php";

   
    $sql = "select * from goodslist ";

    $result = $conn->query($sql);

    $res = array();

    while($row=$result->fetch_assoc()){
        array_push($res,$row);
    }

    echo json_encode($res);
    


?>