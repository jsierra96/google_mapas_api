<?php
    class Conexion {
        private $con = null;

        public function conectar(){
            $host = 'localhost';
            $user = 'jsierra';
            $password = '1712021096Jon*';
            $db = 'mapa_covid';

            $is_connect = false;

            $this->con = new mysqli($host, $user, $password, $db);

            if(!$this->con->connect_errno){
                $is_connect = true;
            }
            return $is_connect;
        }

        public function recuperar() {
            $data = null;
            $result = null;
            $sQuery = "SELECT * FROM estados";
            $result = $this->con->query($sQuery);
            if($result->num_rows === 0) {
                $data = null;
            } else {
                $data = $result;
            }
            return $data;
        }

        public function desconectar() {
            $this->con->close();
        }
    }
?>