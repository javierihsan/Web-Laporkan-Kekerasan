// Cek apakah sedang berada di halaman detail-laporan.html
if (window.location.pathname.includes('detail-laporan.html')) {
    // Fungsi untuk menampilkan detail laporan yang dipilih
    function tampilkanDetailLaporan() {
        const selectedLaporan = JSON.parse(localStorage.getItem('selectedLaporan'));

        if (!selectedLaporan) {
            alert('Data laporan tidak ditemukan.');
            location.href = 'riwayat.html';
            return;
        }

        // Dapatkan elemen-elemen HTML yang akan diisi
        const laporanIdElement = document.getElementById('laporan-id');
        const laporanNamaElement = document.getElementById('laporan-nama');
        const laporanJenisElement = document.getElementById('laporan-jenis');
        const laporanDokumenElement = document.getElementById('laporan-dokumen');
        const isiLaporanTextElement = document.querySelector('.isi-laporan-text');

        // Isi elemen-elemen tersebut dengan data dari laporan
        laporanIdElement.textContent = `ID: ${selectedLaporan.id}`;
        laporanNamaElement.textContent = selectedLaporan.namaPelapor;
        laporanJenisElement.textContent = `Jenis: ${selectedLaporan.jenisKekerasan}`;
        isiLaporanTextElement.textContent = selectedLaporan.isiLaporan;

        // Tampilkan tautan ke dokumen jika ada bukti
        if (selectedLaporan.bukti && selectedLaporan.bukti !== 'Tidak ada bukti') {
            laporanDokumenElement.textContent = 'Lihat Dokumen';
            laporanDokumenElement.style.display = 'block';
            laporanDokumenElement.addEventListener('click', function() {
                window.open(`../uploads/${selectedLaporan.bukti}`, '_blank');
            });
        } else {
            laporanDokumenElement.style.display = 'none';
        }
    }

    // Event listener untuk tombol "Kembali"
    document.querySelector('.kembali-button').addEventListener('click', function() {
        location.href = 'riwayat.html';
    });

    // Panggil fungsi untuk menampilkan detail laporan setelah halaman dimuat
    document.addEventListener('DOMContentLoaded', tampilkanDetailLaporan);
}
