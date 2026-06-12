<?php
header('Content-Type: application/json');

$id = isset($_POST['id_pesanan']) ? $_POST['id_pesanan'] : '';
$nama = isset($_POST['nama_pelanggan']) ? $_POST['nama_pelanggan'] : '';
$meja = isset($_POST['nomor_meja']) ? $_POST['nomor_meja'] : '';
$catatan = isset($_POST['catatan']) ? $_POST['catatan'] : '';
$items = isset($_POST['items']) ? $_POST['items'] : '[]';

if (!empty($nama) && !empty($meja)) {
    $notaBaru = array(
        "idPesanan" => $id,
        "namaPelanggan" => $nama,
        "meja" => $meja,
        "catatanPesanan" => $catatan ? $catatan : "-",
        "itemDibelanja" => json_decode($items, true),
        "status" => "Pending"
    );

    file_put_contents('pesanan.json', json_encode($notaBaru));

    $respon = array(
        "status" => "sukses",
        "pesan" => "Terima kasih " . $nama . ", Pesanan Anda berhasil! Silahkan cek Pesanan di Status Pesanan dan menunggu di meja " . $meja
    );
} else {
    $respon = array(
        "status" => "gagal",
        "pesan" => "Data nama atau meja tidak boleh kosong!"
    );
}

echo json_encode($respon);
?>