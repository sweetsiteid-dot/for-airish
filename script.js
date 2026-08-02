/* ===================================================
   LOADER
=================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.transition = "0.8s";

        setTimeout(() => {
            loader.style.display = "none";
        }, 800);

    }, 3000);

});

/* ===================================================
   CURSOR GLOW
=================================================== */

const cursorGlow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    cursorGlow.style.left = e.clientX + "px";
    cursorGlow.style.top = e.clientY + "px";

});

/* ===================================================
   ELEMENT
=================================================== */

const welcome = document.getElementById("welcome");
const gameSection = document.getElementById("gameSection");
const successSection = document.getElementById("successSection");

const startBtn = document.getElementById("startGame");

const bgMusic = document.getElementById("bgMusic");

const gameArea = document.getElementById("gameArea");

const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");

/* ===================================================
   VARIABLE
=================================================== */

let score = 0;

const targetScore = 15;

let timeLeft = 45;

let timer;

let gameRunning = false;

let spawnInterval;

/* ===================================================
   START GAME
=================================================== */

startBtn.addEventListener("click", () => {

    welcome.style.display = "none";

    gameSection.style.display = "flex";

    bgMusic.volume = 0.25;

    bgMusic.play();

    startGame();

});

/* ===================================================
   START SYSTEM
=================================================== */

function startGame(){

    score = 0;

    timeLeft = 45;

    gameRunning = true;

    updateUI();

    timer = setInterval(() => {

        timeLeft--;

        timerText.textContent = timeLeft;

        if(timeLeft <= 0){

            endGame(false);

        }

    },1000);

    spawnInterval = setInterval(() => {

        spawnObject();

    },850);

}

/* ===================================================
   UPDATE UI
=================================================== */

function updateUI(){

    scoreText.textContent = `${score} / ${targetScore}`;

    timerText.textContent = timeLeft;

    progressFill.style.width = (score / targetScore) * 100 + "%";

}

/* ===================================================
   RANDOM OBJECT
=================================================== */

function spawnObject(){

    if(!gameRunning) return;

    const item = document.createElement("div");

    item.classList.add("game-object");

    const random = Math.random();

    let type = "";
    let emoji = "";
    let value = 0;

    if(random < 0.55){

        type = "heart";
        emoji = "❤️";
        value = 1;

    }

    else if(random < 0.70){

        type = "golden";
        emoji = "💖";
        value = 2;

    }

    else if(random < 0.82){

        type = "golden";
        emoji = "⭐";
        value = 3;

    }

    else if(random < 0.93){

        type = "broken";
        emoji = "💔";
        value = -1;

    }

    else{

        type = "bomb";
        emoji = "💣";
        value = -999;

    }

    item.classList.add(type);

    item.textContent = emoji;

    const maxX = gameArea.clientWidth - 70;
    const maxY = gameArea.clientHeight - 70;

    item.style.left = Math.random() * maxX + "px";
    item.style.top = Math.random() * maxY + "px";

    gameArea.appendChild(item);

    item.addEventListener("click", () => {

        if(type === "bomb"){

            timeLeft -= 3;

            if(timeLeft < 0){

                timeLeft = 0;

            }

        }else{

            score += value;

            if(score < 0){

                score = 0;

            }

        }

        updateUI();

        item.remove();

        if(score >= targetScore){

            endGame(true);

        }

    });

    setTimeout(() => {

        if(item.parentNode){

            item.remove();

        }

    },1800);

}

/* ===================================================
   END GAME
=================================================== */

function endGame(isWin){

    gameRunning = false;

    clearInterval(timer);
    clearInterval(spawnInterval);

    document.querySelectorAll(".game-object").forEach(item => {
        item.remove();
    });

    if(isWin){

        gameSection.style.display = "none";
        successSection.style.display = "flex";

        launchConfetti();

    }else{

        alert("Time's Up! ❤️\nTry Again.");

        location.reload();

    }

}

/* ===================================================
   CONFETTI
=================================================== */

function launchConfetti(){

    if(typeof confetti !== "function") return;

    const duration = 3000;
    const end = Date.now() + duration;

    (function frame(){

        confetti({
            particleCount:4,
            angle:60,
            spread:70,
            origin:{x:0}
        });

        confetti({
            particleCount:4,
            angle:120,
            spread:70,
            origin:{x:1}
        });

        if(Date.now() < end){
            requestAnimationFrame(frame);
        }

    })();

}

/* ===================================================
   OPEN LETTER
=================================================== */

const openLetterBtn = document.getElementById("openLetter");
const letterSection = document.getElementById("letterSection");
const typingLetter = document.getElementById("typingLetter");

openLetterBtn.addEventListener("click", () => {

    successSection.style.display = "none";

    letterSection.style.display = "flex";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

    typeLetter();

});

/* ===================================================
   LETTER TEXT
=================================================== */

const letterText = `Hi Airish,

I've been thinking for a long time
about whether I should tell you this
or just keep it to myself.

But today,
I decided to be honest.

I like you.

Maybe you've never noticed it,
or maybe you already have.

I don't really know.

There are so many reasons
why it's easy to like you.

You have a smile
that makes people feel comfortable.

You have a personality
that naturally attracts everyone.

You're kind without trying.

You're fun to talk to.

And somehow,
being around you
always makes everything feel lighter.

Sometimes I understand
why so many people like you.

Because you're simply...
someone worth admiring.

Maybe my feelings
won't change anything.

Maybe you'll only see me
as a friend.

And that's okay.

I just didn't want
to keep this inside forever.

Whether you accept it
or not,

I'm still grateful
that I got the chance
to know someone like you.

Thank you for reading this.

— Noah ❤️`;

/* ===================================================
   TYPEWRITER
=================================================== */

let letterIndex = 0;
let typingFinished = false;

function typeLetter(){

    typingLetter.innerHTML = "";

    letterIndex = 0;

    typingFinished = false;

    typingEffect();

}

function typingEffect(){

    if(letterIndex < letterText.length){

        typingLetter.innerHTML += letterText.charAt(letterIndex);

        letterIndex++;

        setTimeout(typingEffect,45);

    }else{

        typingFinished = true;

        showNextSections();

    }

                    }

/* ===================================================
   SHOW NEXT SECTION
=================================================== */

function showNextSections(){

    const gallery = document.querySelector(".gallery-section");

    gallery.style.display = "flex";

    setTimeout(() => {

        gallery.scrollIntoView({
            behavior: "smooth"
        });

    },300);

}

/* ===================================================
   PHOTO ROTATION
=================================================== */

document.querySelectorAll(".photo-card").forEach(card=>{

    const random = Math.floor(Math.random()*12)-6;

    card.style.setProperty("--r",random);

});

/* ===================================================
   IMAGE MODAL
=================================================== */

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".photo-card img").forEach(img=>{

    img.addEventListener("click",()=>{

        modal.style.display = "flex";

        modalImg.src = img.src;

    });

});

closeModal.addEventListener("click",()=>{

    modal.style.display = "none";

});

modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.style.display = "none";

    }

});

/* ===================================================
   FLOATING HEART BACKGROUND
=================================================== */

const heartContainer = document.getElementById("heart-effects");

function createFloatingHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "-50px";
    heart.style.fontSize = (18 + Math.random() * 20) + "px";
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "0";
    heart.style.transition = "transform 6s linear, opacity 6s linear";

    heartContainer.appendChild(heart);

    requestAnimationFrame(()=>{

        heart.style.transform =
            `translateY(-110vh) translateX(${Math.random()*120-60}px)`;

        heart.style.opacity = "0";

    });

    setTimeout(()=>{

        heart.remove();

    },6000);

}

setInterval(createFloatingHeart,900);

/* ===================================================
   SPARKLE EFFECT
=================================================== */

const sparkleContainer = document.getElementById("sparkles");

function createSparkle(){

    const sparkle = document.createElement("div");

    sparkle.innerHTML = "✨";

    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.fontSize = (10 + Math.random() * 18) + "px";
    sparkle.style.opacity = "0";
    sparkle.style.pointerEvents = "none";
    sparkle.style.transition = "1.5s";

    sparkleContainer.appendChild(sparkle);

    requestAnimationFrame(()=>{

        sparkle.style.opacity = "1";
        sparkle.style.transform = "scale(1.5)";

    });

    setTimeout(()=>{

        sparkle.style.opacity = "0";

    },1200);

    setTimeout(()=>{

        sparkle.remove();

    },1800);

}

setInterval(createSparkle,700);

/* ===================================================
   TOUCH SUPPORT
=================================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("touchstart",()=>{

        button.style.transform = "scale(.96)";

    });

    button.addEventListener("touchend",()=>{

        button.style.transform = "";

    });

});

/* ===================================================
   MUSIC RESUME
=================================================== */

document.addEventListener("click",()=>{

    if(bgMusic.paused){

        bgMusic.play().catch(()=>{});

    }

});

/* ===================================================
   PREVENT DOUBLE TAP ZOOM
=================================================== */

let lastTouchEnd = 0;

document.addEventListener("touchend",(event)=>{

    const now = Date.now();

    if(now - lastTouchEnd <= 300){

        event.preventDefault();

    }

    lastTouchEnd = now;

},{passive:false});

/* ===================================================
   END
=================================================== */

console.log("%c❤️ A Little Confession ❤️",
"font-size:20px;color:#ff4fd8;font-weight:bold;");

console.log("Made with ❤️ by Noah");
