// ahhhhhhhhpusingpak.js

// 1. Definisikan Produk (Data Model)
const daftarProduk = [
    // Harga dalam Rupiah
    { versi: 1, nama: "RAINWATER Versi 1", harga: 150000 },
    { versi: 2, nama: "RAINWATER Versi 2", harga: 180000 },
    { versi: 3, nama: "RAINWATER Versi 3", harga: 200000 },
    { versi: 4, nama: "RAINWATER Versi 4", harga: 250000 }
];

// 2. Dapatkan elemen Form. Karena tombol berada di dalam <form>, kita tangkap event submit form.
const formPemesanan = document.querySelector('form'); // Mengambil tag <form> pertama

// 3. Tambahkan Event Listener untuk saat form disubmit
formPemesanan.addEventListener('submit', function(event) {
    // Mencegah form melakukan submit default (reload halaman)
    event.preventDefault(); 

    // 4. Ambil Nilai dari Input berdasarkan ID yang ada di HTML Anda
    // ID yang digunakan: namaDepan, namaBelakang, email, versiYangmana, berapaBanyak
    const namaDepan = document.getElementById('namaDepan').value.trim();
    const namaBelakang = document.getElementById('namaBelakang').value.trim();
    const email = document.getElementById('email').value.trim();
    
    // Perhatikan: Mengambil nilai dari 'versiYangmana' dan 'berapaBanyak'
    const pilihanVersi = parseInt(document.getElementById('versiYangmana').value.trim()); 
    const jumlahBanyak = parseInt(document.getElementById('berapaBanyak').value.trim()); 

    // 5. Validasi Dasar
    if (!namaDepan || !namaBelakang || !email || isNaN(pilihanVersi) || isNaN(jumlahBanyak) || pilihanVersi < 1 || pilihanVersi > 4 || jumlahBanyak < 1) {
        alert("Mohon lengkapi semua kolom dengan data yang valid (Versi 1-4, Jumlah minimal 1).");
        return; // Menghentikan eksekusi jika validasi gagal
    }

    // 6. Cari data produk yang dipilih
    const produkDipilih = daftarProduk.find(produk => produk.versi === pilihanVersi);

    if (!produkDipilih) {
        alert("Versi produk tidak ditemukan. Silakan pilih versi 1, 2, 3, atau 4.");
        return;
    }
    
    // 7. Hitung Total Biaya
    const totalHarga = produkDipilih.harga * jumlahBanyak;
    
    // Format harga ke mata uang Rupiah untuk tampilan yang lebih mudah dibaca
    const hargaFormat = totalHarga.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0 // Menghilangkan ,00 di belakang
    });

    // 8. Tampilkan Konfirmasi (Hanya Total) di alert
    const konfirmasiPesan = `
Pesanan Anda Berhasil Dibuat!

Nama Pelanggan: ${namaDepan} ${namaBelakang}
Produk: ${produkDipilih.nama} (${jumlahBanyak} unit)

=========================================
      TOTAL YANG HARUS DIBAYAR:
             ${hargaFormat}
=========================================

Kami akan mengirimkan rincian lengkap ke email Anda (${email}). Terima kasih!
    `;

    alert(konfirmasiPesan);

    // 9. Reset Formulir setelah pemesanan
    formPemesanan.reset();
});