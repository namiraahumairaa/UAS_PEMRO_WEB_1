<?php
header('Content-Type: application/json');
$nama = isset($_POST['nama_produk']) ? $_POST['nama_produk'] : '';
$harga = isset($_POST['harga_produk']) ? $_POST['harga_produk'] : 0;
$respon = array(
    "status" => "sukses",
    "pesan" => $nama . " sukses masuk keranjang."
);
echo json_encode($respon);
?>