// --- 1. منطق العداد (8 ساعات) ---
const timerElement = document.getElementById('timer');
const curtainContainer = document.getElementById('curtain-container');
const appContainer = document.getElementById('app-container');

// نحدد وقت الإطلاق: 8 ساعات من أول زيارة
let launchTime = localStorage.getItem('mml_launch_time');
if (!launchTime) {
    const now = new Date();
    now.setHours(now.getHours() + 8);
    launchTime = now.getTime();
    localStorage.setItem('mml_launch_time', launchTime);
}

function updateTimer() {
    const now = new Date().getTime();
    const distance = launchTime - now;

    if (distance < 0) {
        document.getElementById('timer').innerHTML = "00:00:00";
        openCurtain();
    } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        timerElement.innerHTML = 
            (hours < 10 ? "0" + hours : hours) + ":" + 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds);
    }
}
setInterval(updateTimer, 1000);

// الباب الخلفي للمخرج (اضغط على اللوغو لفتح الستارة فوراً)
document.querySelector('.glowing-logo').addEventListener('click', () => {
    openCurtain();
});

// --- 2. حركة الستارة ---
function openCurtain() {
    curtainContainer.classList.add('curtain-open');
    setTimeout(() => {
        appContainer.classList.remove('hidden');
        appContainer.classList.add('visible');
        document.getElementById('phase-0').classList.add('active');
    }, 1000);
}

// --- 3. التنقل بين المراحل ---
function nextPhase(phaseNum) {
    document.querySelector('.phase-section.active').classList.remove('active');
    const next = document.getElementById(`phase-${phaseNum}`);
    if(next) {
        next.classList.add('active');
        if(phaseNum === 3) {
            setTimeout(() => {
                const btn = document.getElementById('realize-btn');
                btn.classList.remove('hidden-btn');
                btn.classList.add('visible-btn');
            }, 3000);
        }
    }
}

// --- 4. التخزين ---
let userProfile = {};
function selectIdentity(type) { userProfile.identity = type; nextPhase(2); }
function selectLens(type) { userProfile.lens = type; nextPhase(3); }
function selectMode(type) {
    userProfile.mode = type;
    document.querySelector('.phase-section.active').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
    if(type === 'practical') {
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#000';
    }
}