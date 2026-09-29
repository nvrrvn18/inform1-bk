
const FoundationFlowModule = {
  render(container, done){
    const stages = [
      {
        title:"Dekomposisi",
        icon:"🧩",
        prompt:"Pecah masalah besar menjadi bagian kecil.",
        explain:"Kita tidak langsung menyelesaikan semuanya sekaligus. Kita membagi masalah menjadi bagian yang lebih mudah ditangani.",
        visual:`
          <div class="demo-visual">
            <span class="demo-chip">Festival Kelas</span>
            <span>→</span>
            <span class="demo-chip">Tempat</span>
            <span class="demo-chip">Jadwal</span>
            <span class="demo-chip">Perlengkapan</span>
            <span class="demo-chip">Pembagian Tugas</span>
          </div>`
      },
      {
        title:"Pengenalan Pola",
        icon:"🔍",
        prompt:"Cari kesamaan atau hal yang berulang.",
        explain:"Setelah masalah dipecah, kita dapat melihat bagian yang memiliki kebutuhan atau cara penyelesaian yang sama.",
        visual:`
          <div class="demo-visual">
            <span class="demo-chip highlight">Stan A: meja + kursi</span>
            <span class="demo-chip highlight">Stan B: meja + kursi</span>
            <span class="demo-chip highlight">Stan C: meja + kursi</span>
          </div>
          <p>Kesamaan yang ditemukan: beberapa stan membutuhkan perlengkapan yang sama.</p>`
      },
      {
        title:"Abstraksi",
        icon:"🎯",
        prompt:"Ambil informasi penting, sisihkan detail yang tidak diperlukan.",
        explain:"Kita menyederhanakan masalah dengan fokus pada informasi yang benar-benar membantu mencapai tujuan.",
        visual:`
          <div class="demo-visual">
            <span class="demo-chip highlight">Lokasi stan</span>
            <span class="demo-chip highlight">Ukuran ruang</span>
            <span class="demo-chip fade-away">Warna sepatu panitia</span>
            <span class="demo-chip fade-away">Merek tas siswa</span>
          </div>
          <p>Untuk membuat denah, lokasi dan ukuran ruang penting. Detail lain dapat diabaikan.</p>`
      },
      {
        title:"Algoritma",
        icon:"🧭",
        prompt:"Susun langkah yang jelas dan teratur.",
        explain:"Setelah informasi penting tersedia, kita menyusun tindakan dalam urutan yang dapat dijalankan.",
        visual:`
          <div class="demo-visual">
            <span class="demo-chip step">1. Tentukan tempat</span>
            <span>→</span>
            <span class="demo-chip step">2. Susun denah</span>
            <span>→</span>
            <span class="demo-chip step">3. Siapkan perlengkapan</span>
            <span>→</span>
            <span class="demo-chip step">4. Jalankan kegiatan</span>
          </div>`
      }
    ];

    let current = 0;
    let viewed = new Set([0]);

    container.innerHTML = `
      <div class="activity-card">
        <div class="sticky-objective">🎯 Tujuan: Lihat bagaimana empat fondasi dapat membantu menyelesaikan satu masalah.</div>
        <h3>Cara Kerja 4 Fondasi Berpikir Komputasional</h3>
        <p>Tekan setiap fondasi atau gunakan tombol Berikutnya. Animasi menunjukkan perubahan masalah tahap demi tahap.</p>

        <div class="foundation-flow" id="foundationFlow">
          ${stages.map((s,i)=>`
            <button class="foundation-flow-card ${i===0?"active":""}" data-i="${i}">
              <span class="flow-number">${i+1}</span>
              <span class="flow-icon">${s.icon}</span>
              <strong>${s.title}</strong>
              <p>${s.prompt}</p>
              ${i<stages.length-1?'<span class="flow-arrow">→</span>':""}
            </button>`).join("")}
        </div>

        <div class="flow-demo" id="flowDemo"></div>

        <div class="flow-mini-progress">
          ${stages.map((_,i)=>`<span class="flow-dot ${i===0?"active":""}" data-dot="${i}"></span>`).join("")}
        </div>

        <div class="flow-controls">
          <button id="flowPrev" class="ghost-btn" disabled>← Sebelumnya</button>
          <button id="flowNext" class="primary-btn">Berikutnya →</button>
        </div>

        <div id="flowFeedback" class="feedback">Mulai dari dekomposisi, lalu lihat bagaimana masalah menjadi semakin terstruktur.</div>
      </div>
    `;

    const demo = container.querySelector("#flowDemo");
    const feedback = container.querySelector("#flowFeedback");
    const prev = container.querySelector("#flowPrev");
    const next = container.querySelector("#flowNext");

    function renderStage(){
      const s = stages[current];
      viewed.add(current);

      container.querySelectorAll(".foundation-flow-card").forEach((c,i)=>{
        c.classList.toggle("active",i===current);
      });
      container.querySelectorAll(".flow-dot").forEach((d,i)=>{
        d.classList.toggle("active",i===current);
      });

      demo.innerHTML = `
        <div class="demo-stage active">
          <span class="eyebrow">Tahap ${current+1} dari ${stages.length}</span>
          <h3>${s.icon} ${s.title}</h3>
          <p>${s.explain}</p>
          ${s.visual}
        </div>
      `;

      prev.disabled = current===0;
      next.textContent = current===stages.length-1 ? "Ulangi Animasi ↻" : "Berikutnya →";

      if(viewed.size===stages.length){
        feedback.className="feedback success";
        feedback.innerHTML="✓ Kamu sudah melihat keempat fondasi. Dalam masalah nyata, fondasi ini <strong>tidak harus selalu digunakan dalam urutan yang kaku</strong>. Kita memilih dan mengulang strategi sesuai kebutuhan.";
        done();
      }else{
        feedback.className="feedback";
        feedback.textContent=`${viewed.size} dari ${stages.length} fondasi sudah diamati.`;
      }
    }

    container.querySelectorAll(".foundation-flow-card").forEach(card=>{
      card.addEventListener("click",()=>{
        current=Number(card.dataset.i);
        renderStage();
      });
    });

    prev.addEventListener("click",()=>{
      if(current>0){current--;renderStage();}
    });
    next.addEventListener("click",()=>{
      if(current<stages.length-1) current++;
      else current=0;
      renderStage();
    });

    renderStage();
  }
};
