<?php
header('Content-Type: application/json');
$nama = isset($_POST['nama_produk']) ? $_POST['nama_produk'] : '';
$qty = isset($_POST['jumlah_baru']) ? $_POST['jumlah_baru'] : 1;
$respon = array(
    "status" => "sukses",
    "nama" => $nama,
    "kuantitas" => $qty
);
echo json_encode($respon);
?>