<?php 

function createPath($path) {
    if (is_dir($path)) return true;
    $prev_path = substr($path, 0, strrpos($path, '/', -2) + 1 );
    $return = createPath($prev_path);
    return ($return && is_writable($prev_path)) ? mkdir($path) : false;
}

function nextCode() {
	$file1 = "inscriptions.csv";
	$lines = file($file1); 
	$count = count($lines);	
	$formatted_value = sprintf("%08d", $count + 1);
	return $formatted_value;
}

function saveCVS($cvs) {
	$fp = fopen("inscriptions.csv","a");
	if($fp) {
		$fwrite = fwrite($fp,$cvs); 
		if ($fwrite === false) {
		    echo "No grabo"; die();
		}
		fclose($fp); 
	}else {
	    echo "Hubo un problema al abrir el archivo"; die();
	}
}

function sendMail($type, $email, $code, $first_name, $last_name, $organismo, $dni, $sector,$phone, $consultation, $filename) {
	//$emailWithAttach = "gdebenedetti@goblab.org";
	$emailWithAttach = "santiago.rodriguez@goblab.org";

	$uid = md5(uniqid(time()));
	$subject = "Convocatoria a Ponencias CISL2013";
	$message = "<h3>Gracias <b>" . $first_name . " " . $last_name . "</b> por enviar tu consulta. A la brevedad te contestaremos</h3>";

	$message .= "<p>Tu número de inscripción de " . $code . "</p>";

	
	$replyto = "santiago.rodriguez@goblab.org";

	$header = "From: Consulta del digesto jurídico <".$replyto.">\r\n";
	$header .= "Reply-To: ".$replyto."\r\n";
	$header .= "MIME-Version: 1.0\r\n";
	$header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
	$header .= "This is a multi-part message in MIME format.\r\n";
	$header .= "--".$uid."\r\n";
	$header .= "Content-type:text/html; charset=iso-8859-1\r\n";
	$header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
	$header .= $message."\r\n\r\n";



    return mail($emailWithAttach, $subject, "", $header);
}




$target_path = "uploads/";

createPath($target_path);

$target_path = $target_path . time() . "_" . basename( $_FILES['cv']['name']); 

$fileUpload = false;

if(move_uploaded_file($_FILES['cv']['tmp_name'], $target_path)) {
	$fileUpload = true;
}

$nombreYApellido = $_POST["first_name"];

$organizacion = $_POST["organismo"];

$cargo = $_POST["cargo"];

//$dni = $_POST["dni"];

$email = $_POST["email"];

$actividad = $_POST["sector"];

$telefono = $_POST["phone"];

$informacionSolicitada = $_POST["consultation"];

//$zipcode = $_POST["zipcode"];


//$country = '"' . (isset($_POST["country"]) ? $_POST["country"] : "") . '"';




//set POST variables
$url = 'http://sparl.hcdn.gob.ar/pedido';
$data = array(
			'nombreYApellido' => $nombreYApellido,
			'organizacion' => $organizacion,
			'actividad' => $actividad,
	        'email' => $email,
			'telefono' => $telefono,
			'informacionSolicitada' => $informacionSolicitada,
			'localidadYProvincia' => "",
			'tipoIngreso' => "Web de digesto",
			'prioridad' => "Media",
			'userSaraCreado' => "20306531817",
			'observacion' => "",
			'cargo' => $cargo,
			'tipoPedido' => "Digesto",
			'adjuntoEnvio' => "http://digesto.hcdn.gob.ar/consultas/" . $target_path,
		);

$data_string = json_encode($data); 



//open connection
$ch = curl_init();

//set the url, number of POST vars, POST data
curl_setopt($ch,CURLOPT_URL, $url);
/*curl_setopt($ch,CURLOPT_POST, count($fields));
curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
*/


curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string))
);

//execute post
$result = curl_exec($ch);

//close connection
curl_close($ch);

print($result);

?>