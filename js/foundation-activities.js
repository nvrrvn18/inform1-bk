
const FoundationActivitiesModule = {
  render(container, done){
    const state = {stage:0, completed:new Set()};
    const totalStages = 5;

    const foundations = [
      {key:"decomposition",label:"Dekomposisi",code:"A"},
      {key:"pattern",label:"Pengenalan Pola",code:"B"},
      {key:"abstraction",label:"Abstraksi",code:"C"},
      {key:"algorithm",label:"Algoritma",code:"D"}
    ];

    const matching = [
      ["Memecah tugas membuat majalah kelas menjadi bagian menulis, menggambar, mengedit, dan mencetak.","decomposition"],
      ["Menyadari bahwa setiap hari Senin jalan menuju sekolah lebih ramai daripada hari lainnya.","pattern"],
      ["Saat mencari alamat sekolah, kita cukup memperhatikan nama jalan dan lokasi penting, bukan warna setiap rumah yang dilewati.","abstraction"],
      ["Menuliskan langkah membuat mi instan dari menyiapkan air hingga makanan siap disajikan.","algorithm"],
      ["Membagi kegiatan membersihkan kelas menjadi menyapu, mengepel, menghapus papan tulis, dan membuang sampah.","decomposition"],
      ["Menemukan bahwa soal matematika tertentu dapat diselesaikan menggunakan cara yang sama.","pattern"],
      ["Memilih informasi tentang jadwal keberangkatan dan tujuan ketika akan naik bus serta mengabaikan informasi yang tidak diperlukan.","abstraction"],
      ["Menentukan urutan langkah untuk menghidupkan komputer dengan benar.","algorithm"]
    ];

    const mc = [
      ["Berpikir komputasional adalah cara berpikir yang digunakan untuk ...",
        ["menghafalkan semua informasi","menyelesaikan masalah secara logis dan sistematis","menggunakan komputer sepanjang waktu","mempelajari bahasa pemrograman saja"],1],
      ["Berpikir komputasional dapat digunakan oleh ...",
        ["programmer saja","guru informatika saja","semua orang","orang yang memiliki komputer"],2],
      ["Memecah suatu masalah besar menjadi bagian yang lebih kecil disebut ...",
        ["algoritma","abstraksi","dekomposisi","pengenalan pola"],2],
      ["Kemampuan menemukan kesamaan dari beberapa masalah disebut ...",
        ["dekomposisi","pengenalan pola","abstraksi","algoritma"],1],
      ["Memilih informasi yang penting dan mengabaikan informasi yang tidak diperlukan disebut ...",
        ["abstraksi","algoritma","pengenalan pola","dekomposisi"],0],
      ["Langkah-langkah yang tersusun secara logis dan berurutan disebut ...",
        ["pola","informasi","algoritma","dekomposisi"],2],
      ["Doni ingin membersihkan kamarnya. Ia membagi pekerjaan menjadi merapikan tempat tidur, menyapu lantai, membersihkan meja, dan membuang sampah. Kegiatan Doni merupakan contoh ...",
        ["abstraksi","algoritma","dekomposisi","pengenalan pola"],2],
      ["Saat pergi ke sekolah, Sinta menyadari jalan utama selalu macet pada pukul 07.00 sehingga ia memilih jalan lain. Sinta menggunakan ...",
        ["pengenalan pola","dekomposisi","abstraksi","algoritma"],0],
      ["Ketika mencari informasi tentang cuaca untuk menentukan apakah perlu membawa payung, informasi yang paling penting adalah ...",
        ["warna payung","ramalan hujan","nama pembawa acara televisi","merek telepon genggam"],1],
      ["Urutan: 1. Memasukkan buku ke dalam tas, 2. Memeriksa jadwal pelajaran, 3. Menyiapkan buku yang diperlukan, 4. Menutup tas. Urutan yang benar adalah ...",
        ["1–2–3–4","2–3–1–4","3–2–4–1","4–3–2–1"],1]
    ];

    const events = [
      ["Alya membagi tugas membuat video menjadi menulis naskah, merekam, mengedit, dan mengunggah.","decomposition"],
      ["Fajar mengetahui bahwa setiap kali langit sangat gelap biasanya akan turun hujan.","pattern"],
      ["Saat membeli buku, Nisa memperhatikan judul, harga, dan isi buku tetapi tidak mempermasalahkan warna rak toko.","abstraction"],
      ["Reza menuliskan langkah mencuci tangan mulai dari membasahi tangan sampai mengeringkannya.","algorithm"],
      ["Kelompok VII A membagi kegiatan menghias kelas menjadi beberapa pekerjaan kecil.","decomposition"],
      ["Riko melihat bahwa beberapa soal memiliki bentuk dan cara penyelesaian yang sama.","pattern"],
      ["Untuk menentukan rute perjalanan, Beni hanya memperhatikan jalan, jarak, dan tujuan.","abstraction"],
      ["Siswa mengikuti langkah masuk ke akun komputer sesuai urutan yang diberikan guru.","algorithm"]
    ];

    const bagSteps = [
      "Memasukkan buku dan alat tulis ke dalam tas",
      "Melihat jadwal pelajaran besok",
      "Menutup tas",
      "Mengambil buku yang diperlukan",
      "Memeriksa kembali isi tas",
      "Menyiapkan alat tulis"
    ];
    const bagTarget = [
      "Melihat jadwal pelajaran besok",
      "Mengambil buku yang diperlukan",
      "Menyiapkan alat tulis",
      "Memasukkan buku dan alat tulis ke dalam tas",
      "Memeriksa kembali isi tas",
      "Menutup tas"
    ];

    const tf = [
      ["Berpikir komputasional hanya dapat digunakan ketika menggunakan komputer.",false],
      ["Dekomposisi berarti memecah masalah menjadi beberapa bagian kecil.",true],
      ["Pengenalan pola digunakan untuk menemukan persamaan atau kecenderungan.",true],
      ["Abstraksi berarti menggunakan semua informasi yang tersedia.",false],
      ["Algoritma merupakan langkah-langkah yang disusun secara berurutan.",true],
      ["Berpikir komputasional dapat diterapkan dalam kegiatan sehari-hari.",true],
      ["Menyiapkan bekal sekolah dapat dilakukan menggunakan berpikir komputasional.",true],
      ["Langkah dalam algoritma boleh disusun secara acak.",false]
    ];

    const app = document.createElement("div");
    app.className = "activity-card";
    container.innerHTML = "";
    container.appendChild(app);

    function top(title, subtitle){
      return `
        <div class="sticky-objective">🎯 Latihan Fondasi ${state.stage+1} dari ${totalStages}: ${title}</div>
        <p>${subtitle}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${((state.stage)/totalStages)*100}%"></div></div>`;
    }

    function stageDone(){
      state.completed.add(state.stage);
      if(state.stage < totalStages-1){
        const btn = app.querySelector("#activityNext");
        if(btn) btn.disabled = false;
      } else {
        done();
      }
    }

    function nextButton(){
      return `<div class="substage-actions"><button id="activityNext" class="primary-btn" disabled>${state.stage===totalStages-1?"Selesai":"Aktivitas Berikutnya →"}</button></div>`;
    }

    function bindNext(){
      const btn=app.querySelector("#activityNext");
      if(!btn) return;
      btn.addEventListener("click",()=>{
        if(!state.completed.has(state.stage)) return;
        if(state.stage < totalStages-1){state.stage++; renderStage();}
      });
    }

    function foundationButtons(){
      return foundations.map(f=>`<button class="answer-chip" data-key="${f.key}"><span>${f.code}</span>${f.label}</button>`).join("");
    }

    function renderMatching(){
      let current=0, correct=0;
      app.innerHTML = top("Pasangkan Pernyataan","Pilih fondasi yang paling sesuai untuk setiap pernyataan. Tidak perlu mengetik.") + `
        <div class="question-counter" id="matchCounter"></div>
        <div class="statement-card" id="matchStatement"></div>
        <div class="answer-bank">${foundationButtons()}</div>
        <div id="matchFeedback" class="feedback">Pilih satu fondasi.</div>
        <div id="matchHistory" class="match-history"></div>
        ${nextButton()}`;
      const statement=app.querySelector("#matchStatement");
      const counter=app.querySelector("#matchCounter");
      const feedback=app.querySelector("#matchFeedback");
      const history=app.querySelector("#matchHistory");
      const buttons=[...app.querySelectorAll(".answer-chip")];

      const show=()=>{
        counter.textContent=`Pernyataan ${current+1} dari ${matching.length}`;
        statement.textContent=matching[current][0];
        buttons.forEach(b=>b.disabled=false);
      };
      buttons.forEach(btn=>btn.addEventListener("click",()=>{
        const [text,ans]=matching[current];
        const ok=btn.dataset.key===ans;
        if(ok){
          correct++;
          const label=foundations.find(f=>f.key===ans).label;
          history.insertAdjacentHTML("beforeend",`<div class="matched-row"><span>${current+1}. ${text}</span><strong>✓ ${label}</strong></div>`);
          feedback.className="feedback success";
          feedback.textContent="✓ Tepat.";
          buttons.forEach(b=>b.disabled=true);
          setTimeout(()=>{
            current++;
            if(current>=matching.length){
              feedback.textContent=`✓ Selesai. ${correct} dari ${matching.length} pasangan tepat.`;
              app.querySelector("#matchStatement").classList.add("hidden");
              app.querySelector(".answer-bank").classList.add("hidden");
              app.querySelector("#matchCounter").textContent="Semua pernyataan sudah dipasangkan.";
              stageDone();
            } else show();
          },420);
        }else{
          feedback.className="feedback warn";
          feedback.textContent="Belum tepat. Perhatikan ciri utama fondasi pada pernyataan.";
        }
      }));
      show(); bindNext();
    }

    function renderMC(){
      let current=0, correct=0;
      app.innerHTML = top("Pilihan Ganda","Berilah jawaban paling tepat dengan mengetuk kartu pilihan.") + `
        <div id="mcArea"></div>
        ${nextButton()}`;
      const area=app.querySelector("#mcArea");
      const show=()=>{
        const [q,opts,ans]=mc[current];
        area.innerHTML=`
          <div class="question-counter">Soal ${current+1} dari ${mc.length}</div>
          <h3>${q}</h3>
          <div class="option-grid">${opts.map((o,i)=>`<button class="select-card" data-i="${i}"><strong>${String.fromCharCode(65+i)}.</strong> ${o}</button>`).join("")}</div>
          <div class="feedback">Pilih satu jawaban.</div>`;
        const fb=area.querySelector(".feedback");
        area.querySelectorAll(".select-card").forEach(btn=>btn.addEventListener("click",()=>{
          const ok=Number(btn.dataset.i)===ans;
          if(ok){
            correct++; btn.classList.add("correct");
            fb.className="feedback success";fb.textContent="✓ Benar!";
            area.querySelectorAll(".select-card").forEach(x=>x.disabled=true);
            setTimeout(()=>{
              current++;
              if(current>=mc.length){
                area.innerHTML=`<div class="feedback success">✓ Latihan selesai. ${correct} dari ${mc.length} jawaban tepat.</div>`;
                stageDone();
              } else show();
            },480);
          }else{
            btn.classList.add("incorrect");
            fb.className="feedback warn";fb.textContent="Belum tepat. Coba gunakan definisi fondasi yang paling sesuai.";
          }
        }));
      };
      show(); bindNext();
    }

    function renderEvents(){
      let current=0, correct=0;
      app.innerHTML = top("Tentukan Fondasi dari Peristiwa","Baca peristiwa lalu pilih fondasi yang paling sesuai.") + `
        <div class="question-counter" id="eventCounter"></div>
        <div class="statement-card" id="eventStatement"></div>
        <div class="answer-bank">${foundationButtons()}</div>
        <div id="eventFeedback" class="feedback">Pilih fondasi.</div>
        ${nextButton()}`;
      const statement=app.querySelector("#eventStatement");
      const counter=app.querySelector("#eventCounter");
      const feedback=app.querySelector("#eventFeedback");
      const buttons=[...app.querySelectorAll(".answer-chip")];
      const show=()=>{
        counter.textContent=`Peristiwa ${current+1} dari ${events.length}`;
        statement.textContent=events[current][0];
        buttons.forEach(b=>b.disabled=false);
      };
      buttons.forEach(btn=>btn.addEventListener("click",()=>{
        const ok=btn.dataset.key===events[current][1];
        if(ok){
          correct++; feedback.className="feedback success";feedback.textContent="✓ Tepat!";
          buttons.forEach(b=>b.disabled=true);
          setTimeout(()=>{
            current++;
            if(current>=events.length){
              statement.classList.add("hidden");app.querySelector(".answer-bank").classList.add("hidden");
              counter.textContent="Semua peristiwa sudah dianalisis.";
              feedback.textContent=`✓ Selesai. ${correct} dari ${events.length} jawaban tepat.`;
              stageDone();
            }else show();
          },420);
        }else{
          feedback.className="feedback warn";feedback.textContent="Belum tepat. Fokus pada tindakan utama dalam peristiwa.";
        }
      }));
      show();bindNext();
    }

    function renderBag(){
      let steps=[...bagSteps];
      app.innerHTML = top("Susun Algoritma: Menyiapkan Tas Sekolah","Atur keenam kegiatan menjadi urutan yang logis. Gunakan ↑ dan ↓, sehingga tetap nyaman di HP.") + `
        <div class="sequence-list" id="bagList"></div>
        <button id="checkBag" class="primary-btn" style="margin-top:14px">Periksa Urutan</button>
        <div id="bagFeedback" class="feedback">Susun urutan dari langkah pertama sampai terakhir.</div>
        ${nextButton()}`;
      function draw(){
        const list=app.querySelector("#bagList");
        list.innerHTML=steps.map((s,i)=>`
          <div class="sequence-item">
            <div class="step-card"><strong>${i+1}</strong> ${s}</div>
            <div class="sequence-controls">
              <button data-i="${i}" data-d="-1" aria-label="Naikkan langkah">↑</button>
              <button data-i="${i}" data-d="1" aria-label="Turunkan langkah">↓</button>
            </div>
          </div>`).join("");
        list.querySelectorAll(".sequence-controls button").forEach(btn=>btn.addEventListener("click",()=>{
          const i=Number(btn.dataset.i), j=i+Number(btn.dataset.d);
          if(j<0||j>=steps.length) return;
          [steps[i],steps[j]]=[steps[j],steps[i]];
          draw();
        }));
      }
      app.querySelector("#checkBag").addEventListener("click",()=>{
        const ok=steps.every((x,i)=>x===bagTarget[i]);
        const fb=app.querySelector("#bagFeedback");
        if(ok){
          fb.className="feedback success";
          fb.textContent="✓ Tepat. Urutan tersebut membentuk algoritma menyiapkan tas sekolah yang logis.";
          stageDone();
        }else{
          fb.className="feedback warn";
          fb.textContent="Belum tepat. Mulailah dari melihat jadwal, lalu siapkan benda yang dibutuhkan sebelum semuanya dimasukkan ke tas.";
        }
      });
      draw();bindNext();
    }

    function renderTF(){
      const answers=new Map();
      app.innerHTML = top("Benar atau Salah","Tentukan apakah setiap pernyataan benar atau salah. Ketuk salah satu pilihan.") + `
        <div class="tf-list">
          ${tf.map(([q],i)=>`
            <div class="tf-row" data-i="${i}">
              <span><strong>${i+1}.</strong> ${q}</span>
              <div class="tf-actions">
                <button class="tf-btn" data-v="true">✓ Benar</button>
                <button class="tf-btn" data-v="false">✕ Salah</button>
              </div>
            </div>`).join("")}
        </div>
        <button id="checkTF" class="primary-btn" style="margin-top:16px">Periksa Semua</button>
        <div id="tfFeedback" class="feedback">Jawab semua pernyataan.</div>
        ${nextButton()}`;
      app.querySelectorAll(".tf-row").forEach(row=>{
        row.querySelectorAll(".tf-btn").forEach(btn=>btn.addEventListener("click",()=>{
          row.querySelectorAll(".tf-btn").forEach(x=>x.classList.remove("selected"));
          btn.classList.add("selected");
          answers.set(Number(row.dataset.i),btn.dataset.v==="true");
        }));
      });
      app.querySelector("#checkTF").addEventListener("click",()=>{
        const fb=app.querySelector("#tfFeedback");
        if(answers.size<tf.length){
          fb.className="feedback warn";fb.textContent=`Masih ada ${tf.length-answers.size} pernyataan yang belum dijawab.`;
          return;
        }
        let correct=0;
        app.querySelectorAll(".tf-row").forEach(row=>{
          const i=Number(row.dataset.i), ok=answers.get(i)===tf[i][1];
          if(ok) correct++;
          row.classList.toggle("correct-row",ok);
          row.classList.toggle("incorrect-row",!ok);
        });
        if(correct===tf.length){
          fb.className="feedback success";fb.textContent=`✓ Semua tepat. ${correct} dari ${tf.length} benar.`;
        }else{
          fb.className="feedback warn";fb.textContent=`${correct} dari ${tf.length} tepat. Baris yang perlu ditinjau diberi tanda.`;
        }
        stageDone();
      });
      bindNext();
    }

    function renderStage(){
      window.scrollTo({top:0,behavior:"smooth"});
      if(state.stage===0) renderMatching();
      if(state.stage===1) renderMC();
      if(state.stage===2) renderEvents();
      if(state.stage===3) renderBag();
      if(state.stage===4) renderTF();
    }
    renderStage();
  }
};
