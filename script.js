// script.js

// Fungsi untuk memilih opsi pelapor (Iya/Tidak)
let namaPelapor = '-'; // Default value
let jenisKekerasan = 'Seksual'; // Default value

if (window.location.pathname.includes('laporkan.html')) {
    // Fungsi untuk memilih apakah menyebutkan nama pelapor atau tidak
    document.querySelectorAll('.opsi-item[data-value="iya"], .opsi-item[data-value="tidak"]').forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            document.getElementById('button-iya').src = "../assets/button/tidakdipilih.svg";
            document.getElementById('button-tidak').src = "../assets/button/tidakdipilih.svg";
            if (value === 'iya') {
                document.getElementById('button-iya').src = "../assets/button/dipilih.svg";
                namaPelapor = 'Javier Ihsan'; // Jika dipilih "Iya", simpan nama
            } else {
                document.getElementById('button-tidak').src = "../assets/button/dipilih.svg";
                namaPelapor = '-'; // Jika dipilih "Tidak", simpan "-"
            }
        });
    });

    // Fungsi untuk memilih jenis kekerasan
    document.querySelectorAll('.opsi-item[data-value="seksual"], .opsi-item[data-value="fisik"], .opsi-item[data-value="verbal"]').forEach(item => {
        item.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            document.getElementById('button-seksual').src = "../assets/button/tidakdipilih.svg";
            document.getElementById('button-fisik').src = "../assets/button/tidakdipilih.svg";
            document.getElementById('button-verbal').src = "../assets/button/tidakdipilih.svg";
            if (value === 'seksual') {
                document.getElementById('button-seksual').src = "../assets/button/dipilih.svg";
                jenisKekerasan = 'Seksual'; // Simpan jenis kekerasan sebagai "Seksual"
            } else if (value === 'fisik') {
                document.getElementById('button-fisik').src = "../assets/button/dipilih.svg";
                jenisKekerasan = 'Fisik'; // Simpan jenis kekerasan sebagai "Fisik"
            } else if (value === 'verbal') {
                document.getElementById('button-verbal').src = "../assets/button/dipilih.svg";
                jenisKekerasan = 'Verbal'; // Simpan jenis kekerasan sebagai "Verbal"
            }
        });
    });

    // Fungsi untuk membuka file input saat tombol upload diklik
    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
        uploadButton.addEventListener('click', function() {
            document.getElementById('file-upload').click();
        });
    }

    // Menangani perubahan pada input file
    const fileUpload = document.getElementById('file-upload');
    if (fileUpload) {
        fileUpload.addEventListener('change', function(event) {
            const fileName = event.target.files[0] ? event.target.files[0].name : 'Tidak ada file yang dipilih';
            console.log('File dipilih:', fileName);
        });
    }

    // Fungsi untuk menyimpan laporan
    const submitButton = document.getElementById('submit-laporan');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            console.log('Submit button clicked');
            const isiLaporan = document.querySelector('.isi-laporan').value;
            const fileUpload = document.getElementById('file-upload').files[0];

            if (!isiLaporan.trim()) {
                alert('Isi laporan tidak boleh kosong.');
                return;
            }

            // Generate ID Laporan berdasarkan jenis kekerasan
            const prefix = jenisKekerasan === 'Seksual' ? 'KS' :
                           jenisKekerasan === 'Fisik' ? 'FS' : 'VB';
            const laporanId = `${prefix}${Date.now().toString().slice(-5)}`;

            const laporan = {
                id: laporanId,
                namaPelapor,
                jenisKekerasan,
                isiLaporan,
                bukti: fileUpload ? fileUpload.name : 'Tidak ada bukti',
                tanggal: new Date().toLocaleString('id-ID')
            };

            console.log('Laporan yang akan disimpan:', laporan);

            // Simpan ke local storage
            const laporanTersimpan = JSON.parse(localStorage.getItem('laporanPengaduan')) || [];
            laporanTersimpan.push(laporan);
            localStorage.setItem('laporanPengaduan', JSON.stringify(laporanTersimpan));

            console.log('Data tersimpan ke local storage:', laporanTersimpan);

            alert('Laporan Anda telah berhasil disimpan.');
            location.reload();
        });
    }
}

// Fungsi untuk menampilkan data laporan di halaman Riwayat
if (window.location.pathname.includes('riwayat.html')) {
    function tampilkanRiwayatLaporan() {
        const riwayatBody = document.querySelector('.laporan-list');
        const laporanTersimpan = JSON.parse(localStorage.getItem('laporanPengaduan')) || [];
        console.log('Laporan yang ditemukan:', laporanTersimpan);

        if (laporanTersimpan.length === 0) {
            riwayatBody.innerHTML = '<div class="laporan-container">Belum ada laporan.</div>';
            return;
        }

        riwayatBody.innerHTML = ''; // Pastikan kosong sebelum menambahkan

        laporanTersimpan.forEach(laporan => {
            console.log('Menampilkan laporan:', laporan);
            const container = document.createElement('div');
            container.className = 'laporan-container';
            container.innerHTML = `
                <div class="laporan-icon-bg"></div>
                <div class="laporan-line"></div>
                <img src="../assets/id.svg" alt="ID Icon" class="laporan-id-icon">
                <span class="laporan-id-text">ID: ${laporan.id}</span>
                <img src="../assets/UserCircle.svg" alt="User Icon" class="laporan-user-icon">
                <span class="laporan-user-text">${laporan.namaPelapor}</span>
                <span class="laporan-jenis-text">Jenis: ${laporan.jenisKekerasan}</span>
                <span class="laporan-dokumen-link">Lihat Dokumen</span>
                <button class="laporan-detail-button"><span>Lihat Detail</span></button>
            `;

            // Tambahkan event listener untuk tombol "Lihat Detail"
            container.querySelector('.laporan-detail-button').addEventListener('click', function() {
                // Simpan data laporan yang dipilih ke localStorage untuk halaman detail
                localStorage.setItem('selectedLaporan', JSON.stringify(laporan));
                // Arahkan pengguna ke halaman detail
                location.href = 'detail-laporan.html';
            });

            riwayatBody.appendChild(container);
        });
    }

    tampilkanRiwayatLaporan();
}

