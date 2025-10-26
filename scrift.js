// --- Mini router antar-view (SAKTI / Tentang saya / RIWAYAT) ---
const viewButtons = document.querySelectorAll(".switch button");
const views = {
  sakti: document.getElementById("view-sakti"),
  Tentangsaya: document.getElementById("view-Tentang saya"),
  riwayat: document.getElementById("view-riwayat"), // <- baru
};
const brandText = document.getElementById("brandText");

function setView(name) {
  viewButtons.forEach((b) => {
    const active = b.dataset.view === name;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active);
  });
  Object.keys(views).forEach((k) =>
    views[k].classList.toggle("active", k === name)
  );

  // brand ikut berubah
  const brandMap = {
    sakti: "SAKTI",
    Tentangsaya: "Tentang saya",
    riwayat: "RIWAYAT",
  };
  if (brandText) brandText.textContent = brandMap[name] || "SAKTI";

  location.hash = name; // deep-link
}
viewButtons.forEach((b) =>
  b.addEventListener("click", () => setView(b.dataset.view))
);

// --- Data konten SAKTI ---
const dataSakti = {
  solid: {
    title: "Solid — Solidaritas",
    desc: "rasa kebersamaan, kesetiakawanan, dan saling percaya antaranggota dalam suatu kelompok atau komunitas yang membuat mereka saling membantu, peduli, dan bertanggung jawab satu sama lain",
    list: [
      "Merangkul tanpa membedakan",
      "Saling membantu dalam kebaikan",
      "Berkerja sama dalam kebaikan",
    ],
  },
  aktif: {
    title: "Aktif",
    desc: "Berusaha lebih dan maksimal dari yang lain nya,dalam segala hal tanpa meremehkan hal lain.",
    list: [
      "Berani mengemukankan pendapat",
      "Lebih berkontribusi dalam kelompok",
      "Percaya diri ",
    ],
  },
  kreatif: {
    title: "Kreatif",
    desc: "Membuat ide yang sebelum nya tidak ada dan mengembangkan ide yang sudah ada dengan menggunakan imajinasi sendiri.",
    list: [
      "Menciptakan ide baru dan solusi baru",
      "Menciptakan hal yang dapat mempermudah urusan",
      "berfikir tanpa batas",
    ],
  },
  transformatif: {
    title: "Transformatif",
    desc: "Perubahan nyata dari yang awalnya wacana menjadi hal yang dapat di realisasikan.",
    list: [
      "Merubah diri menjadi lebih baik",
      "Membuat evaluasi sebelum dan sesudah melakukan sesuatu",
      "Selalu berkembang secara bertahap",
    ],
  },
  islamic: {
    title: "Islamic",
    desc: "Nilai etika Islam: jujur, amanah, adil, bermanfaat.",
    list: [
      "bersikap jujur dan amanah ",
      "Dapat memperlakukan orang dengan adil tanpa membedakan",
      "Selalu membantu orang lain dengan menjadi orang yang bermanfaat",
    ],
  },
};
// --- Data RIWAYAT (edit di sini untuk menambah/mengurangi item) ---
const dataRiwayat = {
  sekolah: [
    { title: "MI Assaidiyyah", meta: "2013-2019 • Cipanas" },
    { title: "SMP Bina utama", meta: "2019–2021 • Cipanas" },
    { title: "SMPN 2 Cipanas ", meta: "2021–2022 • Cipanas" },
    { title: "MAN 2 Cianjur", meta: "2022–2025 • Cianjur" },
  ],
  prestasi: [
    {
      title: "Juara 1 Porkab VII Senior putra,U-54",
      meta: "2024 • Tingkat Kabupaten",
    },
    {
      title: "Juara 3 Uin Championship Junior putra,U-48",
      meta: "2023 • Tingkat Nasional",
    },
    {
      title: "Peserta Kejuaraan CNN Prestasi Putra,U-54",
      meta: "2024 • Tingkat Nasional",
    },
  ],
  pengalaman: [
    {
      title: "Kokolot Putra Angkatan 36 - Pramuka MAN 2 Cianjur",
      meta: "2022-2025",
    },
    {
      title: "Lit-ev Putra Angkatan 36 - Pramuka MAN 2 cianjur ",
      meta: "2023-2025",
    },
  ],
};

// tombol & elemen target
const menuRiwayat = document.querySelectorAll(".riwayat-menu button");
const labelR = document.getElementById("label-riwayat");
const titleR = document.getElementById("title-riwayat");
const listR = document.getElementById("list-riwayat");

function setRiwayat(key) {
  menuRiwayat.forEach((b) =>
    b.classList.toggle("active", b.dataset.riwayat === key)
  );
  const data = dataRiwayat[key] || [];
  labelR.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  titleR.textContent =
    key === "sekolah"
      ? "Riwayat Sekolah"
      : key === "prestasi"
      ? "Prestasi"
      : "Pengalaman";

  // render entries
  listR.innerHTML = data
    .map(
      (item) => `
    <div class="entry">
      <div class="title">${item.title}</div>
      <div class="meta">${item.meta || ""}</div>
      ${
        item.bullets
          ? `<ul>${item.bullets.map((x) => `<li>${x}</li>`).join("")}</ul>`
          : ""
      }
    </div>
  `
    )
    .join("");

  location.hash = `riwayat-${key}`;
}

// event tombol riwayat
menuRiwayat.forEach((b) =>
  b.addEventListener("click", () => setRiwayat(b.dataset.riwayat))
);

// --- Interaksi tombol menu SAKTI ---
const menuSakti = document.querySelectorAll(".sakti-menu button");
const label = document.getElementById("label-sakti");
const title = document.getElementById("title-sakti");
const desc = document.getElementById("desc-sakti");
const list = document.getElementById("list-sakti");

function setSakti(key) {
  menuSakti.forEach((b) =>
    b.classList.toggle("active", b.dataset.sakti === key)
  );
  const d = dataSakti[key];
  label.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  title.textContent = d.title;
  desc.textContent = d.desc;
  list.innerHTML = d.list.map((x) => `<li>${x}</li>`).join("");
  location.hash = `sakti-${key}`; // dukung deep-link bagian
}

menuSakti.forEach((b) =>
  b.addEventListener("click", () => setSakti(b.dataset.sakti))
);

// --- Inisialisasi berdasarkan hash URL ---
window.addEventListener("load", () => {
  const hash = (location.hash || "#sakti").replace("#", "");
  if (hash === "Tentang saya") setView("Tentang saya");
  else if (hash.startsWith("sakti-")) {
    setView("sakti");
    const k = hash.split("-")[1];
    if (dataSakti[k]) setSakti(k);
  } else setView("sakti");
});

// --- Fallback jika foto tidak ada ---
const img = document.getElementById("foto");
img?.addEventListener("error", () => {
  const parent = img.parentElement;
  img.remove();
  parent.style.background = "linear-gradient(135deg,#1f254a,#0d1b2a)";
  parent.innerHTML =
    '<div class="muted" style="font-size:12px;text-align:center;padding:8px">Letakkan file <b>foto.jpg</b> di folder yang sama</div>';
});
window.addEventListener("load", () => {
  const hash = (location.hash || "#sakti").replace("#", "");
  if (hash === "Tentang saya") return setView("Tentang saya");
  if (hash === "riwayat") {
    setView("riwayat");
    return setRiwayat("sekolah");
  }
  if (hash.startsWith("riwayat-")) {
    const k = hash.split("-")[1];
    setView("riwayat");
    return setRiwayat(dataRiwayat[k] ? k : "sekolah");
  }
  if (hash.startsWith("sakti-")) {
    const k = hash.split("-")[1];
    setView("sakti");
    return dataSakti[k] ? setSakti(k) : null;
  }
  setView("sakti");
});
