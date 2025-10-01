// Ambil elemen dari DOM
const gambar = document.getElementById("gambar");
const jawabanInput = document.getElementById("jawaban");
const pesan = document.getElementById("pesan");
const skorEl = document.getElementById("skor");
const kesempatanEl = document.getElementById("kesempatan");

// Inisialisasi variabel game
let skor = 0;
let kesempatan = 5;
let breedBenar = "";
let jenisSekarang = ""; // "dog" atau "cat"

// Daftar ras yang tersedia (hanya sampel)
const dogBreeds = {
    husky: "Husky",
    poodle: "Poodle",
    akita: "Akita"
};

const catBreeds = {
    beng: "Bengal",
    siam: "Siamese",
    pers: "Persian"
};

// Fungsi untuk mendapatkan kunci acak dari objek (ras)
function getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}

// Fungsi untuk mengambil gambar ras acak
async function ambilGambarRandom() {
    jawabanInput.value = ""; // Kosongkan input
    pesan.textContent = ""; // Kosongkan pesan
    
    // Tentukan jenis hewan secara acak (50% anjing, 50% kucing)
    jenisSekarang = Math.random() > 0.5 ? "dog" : "cat";
    
    if (jenisSekarang === "dog") {
        const breed = getRandomKey(dogBreeds);
        breedBenar = dogBreeds[breed];
        // API Dog C.E.O.
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await res.json();
        gambar.src = data.message;
    } else {
        const breed = getRandomKey(catBreeds);
        breedBenar = catBreeds[breed];
        // API TheCatApi
        const res = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`);
        const data = await res.json();
        gambar.src = data[0].url;
    }
    
    // Tampilkan jawaban di console (untuk Mentor/guru)
    console.log(`Jawaban yang benar: ${breedBenar}, ${jenisSekarang}`);
}

// Fungsi untuk memeriksa jawaban pengguna
function cekJawaban() {
    const jawaban = jawabanInput.value.trim().toLowerCase();
    const benar = breedBenar.toLowerCase();

    if (jawaban === benar) {
        skor += 1;
        pesan.textContent = `✅ Benar! Itu ${breedBenar}.`;
        pesan.className = "text-success font-weight-bold";
        nextSoal();
    } else {
        kesempatan -= 1;
        pesan.textContent = `❌ Salah! Itu ${breedBenar}.`;
        pesan.className = "text-danger font-weight-bold";
        
        // Update tampilan skor dan kesempatan
        skorEl.textContent = skor;
        kesempatanEl.textContent = kesempatan;

        // Cek apakah game berakhir
        if (kesempatan === 0) {
            alert(`Game over! Skor akhir: ${skor}`);
            skor = 0; // Reset skor
            kesempatan = 5; // Reset kesempatan
        }
        
        skorEl.textContent = skor;
        kesempatanEl.textContent = kesempatan;
    }
}

// Fungsi untuk melanjutkan ke soal berikutnya
function nextSoal() {
    ambilGambarRandom();
}

// Mulai game saat halaman dimuat
ambilGambarRandom();