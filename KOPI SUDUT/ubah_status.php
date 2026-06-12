<?php
header('Content-Type: application/json');

$id = isset($_POST['id_pesanan']) ? $_POST['id_pesanan'] : '';
$status = isset($_POST['status_baru']) ? $_POST['status_baru'] : '';

if (file_exists('pesanan.json') && !empty($status)) {
    $dataTeks = file_get_contents('pesanan.json');
    $pesanan = json_decode($dataTeks, true);

    $pesanan['status'] = $status;

    file_put_contents('pesanan.json', json_encode($pesanan));

    $respon = array(
        "status" => "sukses",
        "id_terupdate" => $id,
        "status_terupdate" => $status
    );
} else {
    $respon = array(
        "status" => "gagal"
    );
}

echo json_encode($respon);
?>