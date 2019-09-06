<?php  
	
    include("conn.php");
if(isset($_GET['arr'])){
    $arr=$_GET['arr'];
    
    $sql = "select * from booklist where sid in ($arr)";

    $result = $conn->query($sql);

    $res = array();

    while($row=$result->fetch_assoc()){
        array_push($res,$row);
    }

    echo json_encode($res);
}
   

if(isset($_GET['sid'])){
    $sid=$_GET['sid'];
    
    $sql = "select * from booklist where sid='$sid'";

    $result = $conn->query($sql);


    echo json_encode($result->fetch_assoc());
}
    

?>