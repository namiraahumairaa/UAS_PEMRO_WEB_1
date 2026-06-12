<?php
header('Content-Type: application/json');

if (file_exists('pesanan.json')) {
    $dataTeks = file_get_contents('pesanan.json');
    $pesanan = json_decode($dataTeks, true);

    $respon = array(
        "status_respons" => "sukses",
        "nama_pelanggan" => $pesanan['namaPelanggan'],
        "status_pesanan" => $pesanan['status'],
        "meja" => $pesanan['meja'],
        "catatanPesanan" => $pesanan['catatanPesanan'],
        "itemDibelanja" => $pesanan['itemDibelanja'],
        "idPesanan" => $pesanan['idPesanan']
    );
} else {
    $respon = array(
        "status_respons" => "gagal",
        "nama_pelanggan" => "",
        "status_pesanan" => ""
    );
}

echo json_encode($respon);
?>