<?php
header('Content-Type: application/json');
$nama = isset($_POST['nama_produk']) ? $_POST['nama_produk'] : '';
$respon = array(
    "status" => "sukses",
    "menu_terhapus" => $nama
);
echo json_encode($respon);
?>