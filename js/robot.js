
const RobotModule = {
  render(container, done){
    const rows=5, cols=5;
    const start={r:0,c:0}, goal={r:4,c:4};
    const blocks=new Set(["0,2","1,2","2,2","3,1"]);
    let pos={...start}, queue=[], running=false;

    container.innerHTML = `
      <div class="activity-card">
        <div class="sticky-objective">🎯 Tujuan: Bantu Robo mencapai sekolah tanpa menabrak rintangan.</div>
        <div id="robotGrid" class="robot-grid"></div>
        <div class="panel">
          <h3>Kartu Perintah</h3>
          <div class="command-bank">
            <button class="command-btn" data-cmd="U">↑</button>
            <button class="command-btn" data-cmd="D">↓</button>
            <button class="command-btn" data-cmd="L">←</button>
            <button class="command-btn" data-cmd="R">→</button>
          </div>
          <h3 style="margin-top:16px">Urutan Perintah</h3>
          <div id="commandQueue" class="command-queue"></div>
          <div class="token-row">
            <button id="runRobot" class="primary-btn">Jalankan</button>
            <button id="clearRobot" class="ghost-btn">Hapus Perintah</button>
          </div>
          <div class="feedback" id="robotFeedback">Susun beberapa perintah lalu jalankan.</div>
        </div>
      </div>`;

    function draw(){
      const grid=container.querySelector("#robotGrid");
      grid.innerHTML="";
      for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
          const cell=document.createElement("div");
          cell.className="cell";
          const key=`${r},${c}`;
          if(blocks.has(key)){cell.classList.add("block");cell.textContent="■";}
          if(r===goal.r&&c===goal.c){cell.classList.add("goal");cell.textContent="🏫";}
          if(r===pos.r&&c===pos.c){cell.classList.add("robot");cell.textContent="🤖";}
          grid.appendChild(cell);
        }
      }
      container.querySelector("#commandQueue").innerHTML=queue.map((q,i)=>`<span class="command-chip" data-i="${i}">${({U:"↑",D:"↓",L:"←",R:"→"})[q]}</span>`).join("");
    }
    function resetPos(){pos={...start};draw();}
    function move(cmd){
      const next={...pos};
      if(cmd==="U") next.r--;
      if(cmd==="D") next.r++;
      if(cmd==="L") next.c--;
      if(cmd==="R") next.c++;
      const key=`${next.r},${next.c}`;
      if(next.r<0||next.r>=rows||next.c<0||next.c>=cols||blocks.has(key)) return false;
      pos=next; return true;
    }
    container.querySelectorAll(".command-btn").forEach(btn=>btn.addEventListener("click",()=>{
      if(running) return;
      if(queue.length<18){queue.push(btn.dataset.cmd);draw();}
    }));
    container.querySelector("#clearRobot").addEventListener("click",()=>{
      if(running) return;
      queue=[]; resetPos();
      const fb=container.querySelector("#robotFeedback");fb.className="feedback";fb.textContent="Perintah dihapus. Susun rute baru.";
    });
    container.querySelector("#runRobot").addEventListener("click",async()=>{
      if(running||queue.length===0) return;
      running=true; resetPos();
      const fb=container.querySelector("#robotFeedback");
      const chips=()=>container.querySelectorAll(".command-chip");
      for(let i=0;i<queue.length;i++){
        chips().forEach(x=>x.classList.remove("active"));
        if(chips()[i]) chips()[i].classList.add("active");
        const ok=move(queue[i]); draw();
        const currentChips=chips(); if(currentChips[i]) currentChips[i].classList.add("active");
        await new Promise(r=>setTimeout(r,420));
        if(!ok){
          fb.className="feedback warn";
          fb.textContent=`Robo menabrak pada langkah ke-${i+1}. Periksa langkah tersebut.`;
          container.querySelector("#robotGrid").classList.add("shake");
          setTimeout(()=>container.querySelector("#robotGrid").classList.remove("shake"),500);
          running=false; return;
        }
      }
      if(pos.r===goal.r&&pos.c===goal.c){
        fb.className="feedback success";
        fb.textContent="✓ Berhasil! Kamu menyusun, menjalankan, menguji, dan memperbaiki algoritma.";
        done();
      }else{
        fb.className="feedback warn";
        fb.textContent="Robo belum sampai tujuan. Tambahkan atau perbaiki langkah.";
      }
      running=false;
    });
    draw();
  }
};
