<?php
include('MySqlDbConnector.php');

class FlamingoListService
{
    private $connector;

    public function __construct()
    {
        $this->connector = MysqlDbConnector::getInstance();
    }

    public function getAllNotesByUserId($id)
    {
        $allNotes = array();
        $con = $this->connector->getConnection();

        $sql = 'SELECT * from notes where user_id = '.$id;
        $stmt = $con->query($sql);

        while ($row = $stmt->fetch()) {
            $allNotes[] = $row;
        }
        return $allNotes;
    }


    public function updateNote($noteId, $title, $text)
    {

        $con = $this->connector->getConnection();

        $stmt = $con->prepare("UPDATE notes
                              SET title = ?, text = ?
                              WHERE notes.id = ?
                              ");
        $stmt->execute(array($title, $text, $noteId));
    }


    public function createNote($title, $text, $user_id)
    {

        $con = $this->connector->getConnection();
        $stmt = $con->prepare("INSERT INTO notes
                              (title, text, user_id)
                              VALUES (?, ?, ?)");
        $stmt->execute(array($title, $text, $user_id));
    }

    public function deleteNoteById($id) {
        $con = $this->connector->getConnection();
        $stmt = $con-> prepare('delete from notes where id = ?');
        $stmt->execute(array($id));

    }

    public function getNoteById($id)
    {
        $Note = array();
        $con = $this->connector->getConnection();

        $sql = 'SELECT * from notes where id = '.$id;
        $stmt = $con->query($sql);

        while ($row = $stmt->fetch()) {
            $Note[] = $row;
        }
        return $Note;

    }


    public function checkUser($login, $password) {

        $con = $this->connector->getConnection();

        $stmt = $con->prepare("SELECT id
                              FROM users
                              WHERE users.login = ?
                              and users.password=?");
        $stmt->execute(array($login, $password));
        $row = $stmt->fetch();

        if (!empty($row)) {
            return $row['id'];
        } else {
            return false;
        }
    }

    public function checkUserLogin($login) {

        $con = $this->connector->getConnection();

        $stmt = $con->prepare("SELECT login
                              FROM users
                              WHERE login = ?");

        $stmt->execute(array($login));

        $row = $stmt->fetch();

        if (!empty($row)) {
            return true;
        } else {
            return false;
        }
    }


    public function createUser($login, $password)
    {
        $con = $this->connector->getConnection();
        $stmt = $con->prepare("INSERT INTO users
                              (login, password)
                              VALUES (?, ?)");
        $stmt->execute(array($login, $password));
    }


  }


/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 16.06.16
 * Time: 17:01
 */