
const QuizModule = {
  questions: [],
  current: 0,
  correct: 0,
  answers: [],
  async load(){
    try{
      const res = await fetch("data/questions.json");
      if(!res.ok) throw new Error("Gagal memuat JSON");
      this.questions = await res.json();
    }catch(err){
      console.warn(err);
      this.questions = [
        {id:"fallback1",type:"mc",competency:"decomposition",question:"Memecah masalah besar menjadi bagian kecil disebut...",options:["Dekomposisi","Abstraksi","Pola","Algoritma"],answer:0},
        {id:"fallback2",type:"mc",competency:"algorithm",question:"Urutan langkah yang jelas untuk menyelesaikan masalah disebut...",options:["Pola","Algoritma","Data","Dekomposisi"],answer:1}
      ];
    }
  },
  render(container, done){
    this.current=0; this.correct=0; this.answers=[];
    const selected=[...this.questions].sort(()=>Math.random()-.5).slice(0,Math.min(10,this.questions.length));
    this.session=selected;
    const show=()=>{
      const q=this.session[this.current];
      if(!q){
        const score=Math.round((this.correct/this.session.length)*100);
        const breakdown={};
        this.answers.forEach(a=>{
          if(!breakdown[a.competency]) breakdown[a.competency]={correct:0,total:0};
          breakdown[a.competency].total++;
          if(a.correct) breakdown[a.competency].correct++;
        });
        ProgressStore.setQuiz(score,breakdown);
        container.innerHTML=`
          <div class="score-card">
            <span class="eyebrow">Evaluasi Selesai</span>
            <div class="score-number">${score}</div>
            <p>Nilai akhir dari ${this.session.length} soal.</p>
            <button id="viewResultsBtn" class="primary-btn">Lihat Hasil Belajar</button>
          </div>`;
        container.querySelector("#viewResultsBtn").addEventListener("click",()=>{
          done();
          App.showResults();
        });
        return;
      }
      container.innerHTML=`
        <div class="quiz-card">
          <div class="quiz-meta">
            <strong>Soal ${this.current+1} dari ${this.session.length}</strong>
            <span>${Math.round((this.current/this.session.length)*100)}%</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:${(this.current/this.session.length)*100}%"></div></div>
          <h3 style="margin-top:20px">${q.question}</h3>
          <div class="option-grid" id="quizOptions">
            ${q.options.map((o,i)=>`<button class="select-card" data-i="${i}">${o}</button>`).join("")}
          </div>
          <div class="feedback" id="quizFeedback">Pilih satu jawaban.</div>
        </div>`;
      container.querySelectorAll("#quizOptions .select-card").forEach(btn=>btn.addEventListener("click",()=>{
        const i=Number(btn.dataset.i), ok=i===q.answer;
        container.querySelectorAll("#quizOptions .select-card").forEach(x=>x.disabled=true);
        btn.classList.add(ok?"correct":"incorrect");
        if(ok){this.correct++;}
        this.answers.push({competency:q.competency,correct:ok});
        const fb=container.querySelector("#quizFeedback");
        fb.className=ok?"feedback success":"feedback warn";
        fb.textContent=ok?"✓ Benar!":(q.feedback || "Belum tepat. Perhatikan kembali konsep yang digunakan.");
        setTimeout(()=>{this.current++;show();},850);
      }));
    };
    show();
  }
};
