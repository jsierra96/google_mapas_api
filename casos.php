<?php
include_once 'conexion.php';

    $con = new Conexion();
    $oJson = '';

    if($con->conectar()) {
        $datos = $con->recuperar();
        $oJson = '{
            "success": true,
            "respuesta" : [';
        
        while($dato = $datos->fetch_assoc()){
            $oJson = $oJson . '{
                "id": "'.$dato["id_estado"].'",
                "estado": "'.$dato["estado"].'",
                "confirmados": "'.$dato["confirmado"].'",
                "sospechosos": "'.$dato["sospechoso"].'",
                "falsos": "'.$dato["falso"].'"
            },';
        }
        $oJson =    substr( $oJson , 0 , -1);
        $oJson = $oJson .'] }';
        $con->desconectar();
    } else {
        $oJson = '{
            "success": false,
            "respuesta": "No se pudo conectar con la base de datos"
        }';
    }

    header('Content-type: application/json');
    echo $oJson;
?>