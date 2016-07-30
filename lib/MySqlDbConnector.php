<?php

class MySqlDbConnector {

    private $connection;
    private static $instance;

    private function __construct() {
        $this->connect();

    }

    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new MysqlDbConnector();
        }
        return self::$instance;
    }

    public function getConnection(){
        return $this->connection;
    }

    private function connect() {
        $dbHost = 'localhost';
        $dbName = 'flamingoNotes';
        $user = 'root';
        $pass = 'root';
        $charset = 'utf8';

        $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=$charset";
        $opt = array(
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        );

        $this->connection = new PDO($dsn, $user, $pass, $opt);

    }
}

?>