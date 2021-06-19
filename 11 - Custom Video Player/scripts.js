/*get elements*/
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player. querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*build funcs*/
function togglePlay(){
    //only works after giving browser permission
    const method= video.paused ? 'play' : 'pause';
    video[method]();
    // if(video.paused){
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    // console.log('changed range');
    // console.log(this.name);
    // console.log(this.value);
    video[this.name] = this.value;
}

function scrub(e){
    const scrubTime = (e.offsetX/ progress.offsetWidth) * video.duration;
    console.log(scrubTime);
    video.currentTime =scrubTime;
    
}

function handleProgress(){
    const percent = (video.currentTime/video.duration) * 100;
    //console.log(percent);
    progressBar.style.flexBasis = `${percent}%`;
}

/*hook event listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn=>btn.addEventListener(
    'click', skip));

ranges.forEach(rng=>rng.addEventListener(
    'change', handleRangeUpdate));

progress.addEventListener('click', scrub);

let mousedown = false;
progress.addEventListener('mousedown', ()=>mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown=false);
progress.addEventListener('mousemove', (e)=>mousedown && scrub(e));