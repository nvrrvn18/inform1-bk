
const AppData = {
  modules: [
    {title:"Eksplorasi Awal",eyebrow:"Mulai dari masalah",kind:"robot"},
    {title:"Empat Fondasi",eyebrow:"Kenali Konsep",kind:"foundations"},
    {title:"Dekomposisi",eyebrow:"Pertemuan 1",kind:"decomposition"},
    {title:"Pengenalan Pola",eyebrow:"Pertemuan 2",kind:"pattern"},
    {title:"Abstraksi",eyebrow:"Pertemuan 3",kind:"abstraction"},
    {title:"Algoritma",eyebrow:"Pertemuan 4",kind:"algorithm"},
    {title:"Latihan Fondasi",eyebrow:"Aktivitas Interaktif",kind:"foundationActivities"},
    {title:"Cara Kerja 4 Fondasi",eyebrow:"Visualisasi Konsep",kind:"foundationFlow"},
    {title:"Evaluasi Akhir",eyebrow:"Uji Pemahaman",kind:"quiz"}
  ]
};

const App = {
  activeDone:false,
  init(){
    Navigation.bind();
    this.bindGlobal();
    this.renderHome();
    this.updateProgressUI();
    QuizModule.load();
  },
  bindGlobal(){
    document.getElementById("startBtn").addEventListener("click",()=>this.openModule(ProgressStore.state.currentModule));
    document.getElementById("backHomeBtn").addEventListener("click",()=>Navigation.show("home"));
    document.getElementById("prevModuleBtn").addEventListener("click",()=>{
      this.openModule(Math.max(0,ProgressStore.state.currentModule-1));
    });
    document.getElementById("nextModuleBtn").addEventListener("click",()=>{
      const cur=ProgressStore.state.currentModule;
      if(this.activeDone || ProgressStore.isCompleted(cur)){
        ProgressStore.completeModule(cur);
        this.updateProgressUI();
        if(cur < AppData.modules.length-1) this.openModule(cur+1);
        else this.showResults();
      }
    });
    document.getElementById("resetProgressBtn").addEventListener("click",()=>{
      if(confirm("Hapus seluruh progress belajar?")){
        ProgressStore.reset(); this.renderHome(); this.renderProgress(); this.updateProgressUI(); Navigation.show("home");
      }
    });
    document.getElementById("fullscreenBtn").addEventListener("click",async()=>{
      try{
        if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      }catch(e){console.warn(e);}
    });
  },
  renderHome(){
    const grid=document.getElementById("journeyGrid");
    grid.innerHTML=AppData.modules.map((m,i)=>{
      const unlocked=ProgressStore.isUnlocked(i);
      const done=ProgressStore.isCompleted(i);
      return `<button class="journey-card ${!unlocked?"locked":""} ${done?"done":""}" data-i="${i}" ${!unlocked?"disabled":""}>
        <strong>${done?"✓ ":""}${m.title}</strong>
        <p>${unlocked?(done?"Selesai":"Siap dipelajari"):"Terkunci"}</p>
      </button>`;
    }).join("");
    grid.querySelectorAll(".journey-card:not([disabled])").forEach(btn=>btn.addEventListener("click",()=>this.openModule(Number(btn.dataset.i))));
    document.getElementById("startBtn").textContent=ProgressStore.state.completed.length?"Lanjutkan Belajar":"Mulai Belajar";
  },
  openModule(index){
    if(!ProgressStore.isUnlocked(index)) return;
    ProgressStore.setCurrent(index);
    this.activeDone=ProgressStore.isCompleted(index);
    const m=AppData.modules[index];
    document.getElementById("moduleEyebrow").textContent=m.eyebrow;
    document.getElementById("moduleTitle").textContent=m.title;
    document.getElementById("prevModuleBtn").disabled=index===0;
    const next=document.getElementById("nextModuleBtn");
    next.disabled=!this.activeDone;
    next.textContent=index===AppData.modules.length-1?"Selesai":"Lanjut →";
    const container=document.getElementById("moduleContent");
    const done=()=>{
      this.activeDone=true;
      next.disabled=false;
    };
    if(m.kind==="foundations") FoundationsModule.render(container,done);
    else if(m.kind==="foundationActivities") FoundationActivitiesModule.render(container,done);
    else if(m.kind==="decomposition") DecompositionModule.render(container,done);
    else if(m.kind==="pattern") PatternModule.render(container,done);
    else if(m.kind==="abstraction") AbstractionModule.render(container,done);
    else if(m.kind==="algorithm") AlgorithmModule.render(container,done);
    else if(m.kind==="robot") RobotModule.render(container,done);
    else if(m.kind==="foundationFlow") FoundationFlowModule.render(container,done);
    else if(m.kind==="quiz") QuizModule.render(container,done);
    Navigation.show("learning");
  },
  renderProgress(){
    const list=document.getElementById("progressList");
    list.innerHTML=AppData.modules.map((m,i)=>`
      <div class="progress-item">
        <span>${m.title}</span>
        <strong>${ProgressStore.isCompleted(i)?"100% ✓":ProgressStore.isUnlocked(i)?"Belum selesai":"Terkunci"}</strong>
      </div>`).join("");
  },
  updateProgressUI(){
    const p=ProgressStore.percent();
    document.getElementById("topProgressBar").style.width=p+"%";
    document.getElementById("topProgressText").textContent=p+"%";
    this.renderHome();
  },
  showResults(){
    const state=ProgressStore.state;
    const labels={
      decomposition:"Dekomposisi",pattern:"Pengenalan Pola",abstraction:"Abstraksi",algorithm:"Algoritma",integrated:"Penerapan Terpadu"
    };
    const breakdown=Object.entries(state.quizBreakdown||{}).map(([k,v])=>{
      const pct=v.total?Math.round((v.correct/v.total)*100):0;
      return `<div class="breakdown-card"><strong>${labels[k]||k}</strong><p>${pct>=70?"✓ Dikuasai":"△ Perlu latihan"} (${pct}%)</p></div>`;
    }).join("") || `<div class="breakdown-card"><p>Belum ada hasil evaluasi.</p></div>`;
    document.getElementById("resultsContent").innerHTML=`
      <div class="score-card">
        <span class="eyebrow">Nilai</span>
        <div class="score-number">${state.score ?? "-"}</div>
        <p>${state.score==null?"Selesaikan evaluasi terlebih dahulu.":state.score>=80?"Sangat Baik":state.score>=70?"Baik, sedikit lagi!":"Pelajari kembali bagian yang belum dikuasai."}</p>
        <div class="breakdown-grid">${breakdown}</div>
        <div class="token-row" style="justify-content:center">
          <button id="retryQuiz" class="primary-btn">Ulangi Evaluasi</button>
          <button id="resultHome" class="ghost-btn">Kembali ke Beranda</button>
        </div>
      </div>`;
    document.getElementById("retryQuiz").addEventListener("click",()=>this.openModule(AppData.modules.length-1));
    document.getElementById("resultHome").addEventListener("click",()=>Navigation.show("home"));
    this.updateProgressUI();
    Navigation.show("resultsScreen");
  }
};

document.addEventListener("DOMContentLoaded",()=>App.init());
