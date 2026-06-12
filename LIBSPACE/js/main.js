$(document).ready(function() {
    var occupiedSeats = ["J-3", "J-7", "A-2", "B-4", "D-1"];

    function buatElemenKursi(kode, label) {
        var seat = $("<div>").addClass("seat").text(label).attr("data-seat", kode);
        if (occupiedSeats.indexOf(kode) > -1) seat.addClass("occupied");
        if (localStorage.getItem("temp_seat") === kode) seat.addClass("selected");
        return seat;
    }

    function renderMejaGrid() {
        var container = $("#grid-meja");
        if (container.length === 0) return;
        container.empty();

        var windowArea = $("<div>").addClass("mb-5 border-bottom pb-4");
        windowArea.append($("<h6>").addClass("text-muted fw-bold mb-3 text-center").text("AREA JENDELA (R. BACA INDIVIDU)"));
        var windowRow = $("<div>").addClass("d-flex justify-content-center gap-3 flex-wrap bg-light p-3 rounded border");
        
        for(var i = 1; i <= 10; i++) {
            var code = "J-" + i;
            windowRow.append(buatElemenKursi(code, code));
        }
        windowArea.append(windowRow);
        container.append(windowArea);

        var centerArea = $("<div>");
        centerArea.append($("<h6>").addClass("text-muted fw-bold mb-3 text-center").text("AREA TENGAH (R. BACA UMUM)"));
        var centerGrid = $("<div>").addClass("row justify-content-center g-4");

        var tables = ["A", "B", "C", "D", "E", "F"];
        tables.forEach(function(table) {
            var col = $("<div>").addClass("col-md-4 col-sm-6");
            var tableBox = $("<div>").addClass("p-3 bg-light border rounded d-flex flex-column align-items-center gap-2");
            
            var topRow = $("<div>").addClass("d-flex gap-2");
            topRow.append(buatElemenKursi(table + "-1", table + "1"));
            topRow.append(buatElemenKursi(table + "-2", table + "2"));
            
            var tableCenter = $("<div>").addClass("w-100 bg-secondary rounded").css({"height": "25px", "opacity": "0.15"});

            var bottomRow = $("<div>").addClass("d-flex gap-2");
            bottomRow.append(buatElemenKursi(table + "-3", table + "3"));
            bottomRow.append(buatElemenKursi(table + "-4", table + "4"));

            tableBox.append(topRow).append(tableCenter).append(bottomRow);
            col.append(tableBox);
            centerGrid.append(col);
        });

        centerArea.append(centerGrid);
        container.append(centerArea);
    }

    function buatDaftarRuangan() {
        var container = $("#daftar-ruangan");
        if (container.length === 0) return;
        container.empty();

        var listRuangan = [
            { id: "R-01", nama: "Ruang Diskusi A", kapasitas: "4 Orang", fasilitas: "Papan Tulis, Stop Kontak", status: "Tersedia" },
            { id: "R-02", nama: "Ruang Diskusi B", kapasitas: "6 Orang", fasilitas: "Papan Tulis, Stop Kontak, AC", status: "Terisi" },
            { id: "R-03", nama: "Ruang Multimedia", kapasitas: "10 Orang", fasilitas: "Proyektor, Smart TV, AC", status: "Tersedia" },
            { id: "R-04", nama: "Ruang Diskusi C", kapasitas: "6 Orang", fasilitas: "Papan Tulis, Stop Kontak, AC", status: "Tersedia" }
        ];

        listRuangan.forEach(function(ruang) {
            var col = $("<div>").addClass("col-md-6");
            var card = $("<div>").addClass("room-card p-3 shadow-sm bg-white d-flex flex-column justify-content-between h-100").attr("data-id", ruang.id).attr("data-nama", ruang.nama);

            var info = $("<div>").addClass("mb-3");
            info.append($("<h6>").addClass("fw-bold mb-2 text-dark").text(ruang.nama));
            info.append($("<p>").addClass("text-muted small mb-1").html("<b>Kapasitas:</b> " + ruang.kapasitas));
            info.append($("<p>").addClass("text-muted small mb-0").html("<b>Fasilitas:</b> " + ruang.fasilitas));

            var badgeWrapper = $("<div>").addClass("d-flex justify-content-end mt-auto");
            var badge = $("<span>").addClass("badge py-2 px-3 w-100 text-center");
            
            if (ruang.status === "Tersedia") {
                badge.addClass("bg-success-subtle text-success border border-success").text("Tersedia");
            } else {
                badge.addClass("bg-danger-subtle text-danger border border-danger").text("Sedang Digunakan");
                card.addClass("disabled");
            }

            badgeWrapper.append(badge);
            card.append(info);
            card.append(badgeWrapper);
            col.append(card);
            container.append(col);
        });
    }

    function simulasiRealTime() {
        var pool = ["J-1", "J-4", "J-8", "A-1", "B-2", "C-3", "D-4", "E-1", "F-2"];
        var kodeAcak = pool[Math.floor(Math.random() * pool.length)];

        if (kodeAcak === localStorage.getItem("temp_seat")) return;

        var index = occupiedSeats.indexOf(kodeAcak);
        if (index > -1) {
            occupiedSeats.splice(index, 1);
        } else {
            occupiedSeats.push(kodeAcak);
        }
        renderMejaGrid();
    }

    if ($("#grid-meja").length > 0) {
        renderMejaGrid();
        setInterval(simulasiRealTime, 4000);
    }

    if ($("#daftar-ruangan").length > 0) {
        buatDaftarRuangan();
    }

    function cekReservasiAwal() {
        if (!localStorage.getItem("temp_reservasi")) {
            alert("Silahkan lakukan pengisian form reservasi terlebih dahulu!");
            window.location.href = "reservasi.html";
            return false;
        }
        return true;
    }

    $("#ke-meja").on("click", function(e) {
        if (cekReservasiAwal()) {
            window.location.href = "meja.html";
        } else {
            e.preventDefault();
        }
    });

    $("#ke-ruangan").on("click", function(e) {
        if (cekReservasiAwal()) {
            window.location.href = "ruang.html";
        } else {
            e.preventDefault();
        }
    });

    $("#nim").on("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    $("#form-reservasi").on("submit", function(e) {
        e.preventDefault();

        var nimInput = $("#nim").val();
        if (/[^0-9]/.test(nimInput)) {
            alert("NIM harus berupa angka!");
            return false;
        }
        
        var dataAwal = {
            nama: $("#nama").val(),
            nim: $("#nim").val(),
            tanggal: $("#tanggal").val(),
            jamMulai: $("#jam_mulai").val(),
            jamSelesai: $("#jam_selesai").val(),
            layanan: $("#jenis_layanan").val()
        };

        localStorage.setItem("temp_reservasi", JSON.stringify(dataAwal));

        if (dataAwal.layanan === "meja") {
            window.location.href = "meja.html";
        } else if (dataAwal.layanan === "ruangan") {
            window.location.href = "ruang.html";
        }
    });

    $(document).on("click", ".seat:not(.occupied)", function() {
        $(".seat").removeClass("selected");
        $(this).addClass("selected");
        var kodeMeja = $(this).attr("data-seat");
        localStorage.setItem("temp_seat", kodeMeja);
        $("#meja_terpilih").val(kodeMeja);
    });

    $(document).on("click", ".room-card:not(.disabled)", function() {
        $(".room-card").removeClass("selected");
        $(this).addClass("selected");
        var namaRuangan = $(this).attr("data-nama");
        $("#ruangan_terpilih").val(namaRuangan);
    });

    $("#btn-konfirmasi-meja").on("click", function() {
        var kursi = $("#meja_terpilih").val();
        if (!kursi) {
            alert("Silahkan pilih nomor kursi terlebih dahulu!");
            return;
        }

        var rawData = localStorage.getItem("temp_reservasi");
        if (!rawData) {
            alert("Data sesi reservasi tidak ditemukan. Harap isi form kembali.");
            window.location.href = "reservasi.html";
            return;
        }

        var dataAwal = JSON.parse(rawData);
        dataAwal.detail = kursi;
        dataAwal.keperluan = "-";
        dataAwal.status = "Pending";

        localStorage.setItem("fix_booking", JSON.stringify(dataAwal));
        alert("Pilihan meja berhasil disimpan! Mengarahkan ke halaman status...");
        window.location.href = "status.html";
    });

    $("#btn-konfirmasi-ruangan").on("click", function() {
        var ruang = $("#ruangan_terpilih").val();
        var keper = $("#keperluan").val();
        if (!ruang) {
            alert("Silahkan pilih ruangan terlebih dahulu!");
            return;
        }

        var rawData = localStorage.getItem("temp_reservasi");
        if (!rawData) {
            alert("Data sesi reservasi tidak ditemukan. Harap isi form kembali.");
            window.location.href = "reservasi.html";
            return;
        }

        var dataAwal = JSON.parse(rawData);
        dataAwal.detail = ruang;
        dataAwal.keperluan = keper || "-";
        dataAwal.status = "Pending";

        localStorage.setItem("fix_booking", JSON.stringify(dataAwal));
        alert("Pilihan ruang diskusi berhasil disimpan! Mengarahkan ke halaman status...");
        window.location.href = "status.html";
    });

    function sinkronisasiHalamanStatus() {
        var rawData = localStorage.getItem("fix_booking");
        if (!rawData) return;

        var data = JSON.parse(rawData);
        $("#status-kosong").addClass("d-none");
        $("#status-aktif").removeClass("d-none");

        $("#sapaan").text("Halo, " + data.nama);
        $("#st-nama").html("<b>Nama:</b> " + data.nama);
        $("#st-nim").html("<b>NIM:</b> " + data.nim);
        $("#st-tanggal").html("<b>Tanggal:</b> " + data.tanggal + " | <b>Sesi Jam:</b> " + data.jamMulai + " - " + data.jamSelesai);
        
        if (data.layanan === "meja") {
            $("#st-layanan").html("<b>Jenis Layanan:</b> Meja Kerja Mandiri (Quiet Zone)");
            $("#st-detail").html("<b>Nomor Kursi:</b> " + data.detail);
        } else {
            $("#st-layanan").html("<b>Jenis Layanan:</b> Ruang Diskusi Kelompok");
            $("#st-detail").html("<b>Nama Ruangan:</b> " + data.detail + " <br><b>Keperluan:</b> " + data.keperluan);
        }

        $(".step").css("opacity", "0.4");
        $(".step").removeClass("active completed");

        if (data.status === "Pending") {
            $("#st-pending").css("opacity", "1").addClass("active");
            $("#info-status").html("Silahkan konfirmasi di bawah ini jika Anda sudah berada di lokasi.");
        } else if (data.status === "Diproses") {
            $("#st-pending").css("opacity", "1").addClass("completed");
            $("#st-proses").css("opacity", "1").addClass("active");
            $("#info-status").html("Fasilitas sedang Anda gunakan saat ini. Selamat belajar!");
        } else if (data.status === "Selesai") {
            $("#st-pending, #st-proses, #st-siap").css("opacity", "1").addClass("completed");
            $("#info-status").html("<span class='text-success'>Sesi penggunaan fasilitas telah selesai. Terima kasih!</span>");
        }
    }

    $("#btn-status-pending").on("click", function() {
        var rawData = localStorage.getItem("fix_booking");
        if (rawData) {
            var data = JSON.parse(rawData);
            data.status = "Pending";
            localStorage.setItem("fix_booking", JSON.stringify(data));
            sinkronisasiHalamanStatus();
        }
    });

    $("#btn-status-proses").on("click", function() {
        var rawData = localStorage.getItem("fix_booking");
        if (rawData) {
            var data = JSON.parse(rawData);
            data.status = "Diproses";
            localStorage.setItem("fix_booking", JSON.stringify(data));
            sinkronisasiHalamanStatus();
        }
    });

    $("#btn-status-selesai").on("click", function() {
        var rawData = localStorage.getItem("fix_booking");
        if (rawData) {
            var data = JSON.parse(rawData);
            data.status = "Selesai";
            localStorage.setItem("fix_booking", JSON.stringify(data));
            sinkronisasiHalamanStatus();
        }
    });

    if ($("#status-aktif").length > 0) {
        sinkronisasiHalamanStatus();
    }
});