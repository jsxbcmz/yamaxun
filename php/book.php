<?php  
	
    include("conn.php");

    $arr=$_GET['arr'];
    
    $sql = "select * from booklist where sid in ($arr)";

    $result = $conn->query($sql);

    $res = array();

    while($row=$result->fetch_assoc()){
        array_push($res,$row);
    }

    echo json_encode($res);


?>