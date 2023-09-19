<?php
// // Methode avec file_get_contents
// $rest_api_url = "https://pokebuildapi.fr/api/v1/pokemon";
// $json_data = file_get_contents($rest_api_url);
// echo $json_data;

// Methode avec curl
// on recupere le contenu envoyés par la methode POST(le contenu du boy) invoqué avec fetch
$data = file_get_contents("php://input");
$url = "https://pokebuildapi.fr/api/v1/pokemon/".$data;
// on utilise la librairie curl disponible nativement en PHP
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
    "X-custom-header: header-value",
    "Content-type: application/json"
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_HEADER, false);
$response = curl_exec($curl);
curl_close($curl);

echo $response;
