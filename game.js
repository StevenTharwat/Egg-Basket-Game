function getRandom(min, max) {
    if(min> max) return -1;
    return Math.ceil( (Math.random() * (max-min))+min)
}

let levelH2;
let EB;
let FB;
let scoreH2;
let eggs;
let load;
let level = 1;
let score = 0;
let bullets = 5;
let HighScore = 0;
let isHunted = false;
let Gspeed = 1500;
let Dspeed = 0.3;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const gameMusic = new Audio('sounds/game2.mp3');
gameMusic.loop = true; 
gameMusic.volume = 0.5;
const loadMusic = new Audio('sounds/collect.mp3');


window.addEventListener("resize", function() {
    screenHeight = window.innerHeight;
    screenWidth = window.innerWidth;
});


let x;
let y;
let deg;
let GspeedInterval ;
let DspeedInterval ;

function changeSpeed(GSpeed, DSpeed) {
    clearInterval(GspeedInterval);
    clearInterval(DspeedInterval);
    GenerateEgges(parseInt(GSpeed));
    eggAnimation(parseInt(DSpeed));
}

function increseScore() {
    score++;
    if(score>0){
        EB.style.visibility = "hidden";
        FB.style.visibility = "visible";
        loadMusic.pause();
        loadMusic.play();
    }
    if(score>HighScore){
        HighScore = score;
        HighScoreH2.innerText = score
        localStorage.setItem('HighScore', HighScore)
    }
    if(score % 10 == 0){
        level = score/10;
        changeSpeed(Gspeed-(level*3), Dspeed*level);
    }
    levelH2.innerText = level
    scoreH2.innerText = score
}

function eggAnimation(speed) {
    DspeedInterval = window.setInterval(function (e) {
        eggs = document.getElementsByClassName('Gegg');
        for (const egg of eggs) {
            let eggPos = egg.getBoundingClientRect();
            let FBPos = FB.getBoundingClientRect();

            if(eggPos.top >= (screenHeight-eggPos.height) || eggPos.bottom < 0){
                egg.src = "imgs/Begg.png"
                egg.style.top = "unset"
                egg.style.bottom = "-1px"
                setTimeout(function (e) {
                    egg.remove();
                } , 1000)
                continue;
            }else{
                egg.style.top =( eggPos.top + Dspeed) +"px";
            } 
            if((FBPos.left <= eggPos.left && FBPos.left+FB.width >= eggPos.left+eggPos.width) && (FBPos.top <= eggPos.top )) {
                increseScore();
                
                egg.remove();
            }
        }
    }, speed)
}

function GenerateEgges(speed) {
    GspeedInterval = window.setInterval(function (e) {
        let eggImg= document.createElement('img');
        eggImg.src = "imgs/egg.png"
        eggImg.className = "Gegg"
        eggImg.style.left = getRandom(0,(screenWidth) - 80)+"px"
        document.body.appendChild(eggImg)
    },speed)
}



window.addEventListener('load',function (e) {
    HighScore = parseInt(this.localStorage.getItem('HighScore'))
    if(isNaN(HighScore)) {
        HighScore = 0;
    }
    levelH2 = this.document.getElementsByClassName('level')[0];
    scoreH2 = this.document.getElementsByClassName('score')[0];
    HighScoreH2 = this.document.getElementsByClassName('HighScore')[0];
    HighScoreH2.innerText = HighScore;
    EB = this.document.getElementsByClassName('EB')[0];
    FB = this.document.getElementsByClassName('FB')[0];
    EB.style.left = screenWidth-(FB.offsetWidth/2)+"px";
    FB.style.left = screenWidth-(FB.offsetWidth/2)+"px";

    window.addEventListener('mousemove', function(e){
        x = e.clientX - (FB.offsetWidth/2);
        if(x < 0) x = 0;
        if(x+FB.offsetWidth >= (screenWidth)) x = (screenWidth) - FB.offsetWidth;
        
        EB.style.left = (x) + "px";
        FB.style.left = (x) + "px";
    });

    this.document.body.addEventListener('click',function(e){
        
        gameMusic.play();
    })

    GenerateEgges(Gspeed);
    eggAnimation(5);
});