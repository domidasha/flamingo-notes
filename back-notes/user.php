// <?php
// include('functions.php');

// $response['success']='success';
// $response['message']='';
// $flamingo =  new FlamingoListService();

// if ($_SERVER['REQUEST_METHOD'] == 'POST') {

//     $inputJSON = file_get_contents('php://input');
//     $user= json_decode( $inputJSON, TRUE ); //convert JSON into array


//     if (isset($user['login']) and isset($user['password'])) {
//         $login = $user['login'];
//         $password = $user['password'];

//         $id = $flamingo->checkUser($login, $password);

//         if ($id>0) {
//             $response['id'] = $id;
//         } else {
//             $response['success']='false';
//             $response['message']='wrong password or login';
//         }

//         echo json_encode($response);
//     }
// }