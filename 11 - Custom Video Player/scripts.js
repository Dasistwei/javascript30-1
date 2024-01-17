const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const playBtn = player.querySelector(".toggle")
const skipBtn = player.querySelector(".player__controls")
const progress = player.querySelector(".progress")
const progressBar = player.querySelector(".progress__filled")
const ranges = player.querySelectorAll(".player__slider")
// console.log(ranges, video.volume = 0.2)
// play video
const playOrPauseVideo = ()=>{
  let method = video.paused?"play":"pause"
  let icon = video.paused?'❚ ❚':'►';
  playBtn.textContent = icon
  video[method]()
}

//skip 
const skipVideo = (e) =>{
  const skipTime = Number(e.target.getAttribute("data-skip"))
  video.currentTime +=skipTime
}

//track progress Bar 
const handleProgress = ()=>{
  let percent = (video.currentTime / video.duration)*100
  progressBar.style.flexBasis = `${percent}%`
}
//scrub
const scrub = (e)=>{
  let scrubTime = (e.offsetX/progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}
//handle volume or speed
const handleRange =(e)=>{
  video[e.target.name] = e.target.value
}
video.addEventListener("click", playOrPauseVideo)
video.addEventListener("timeupdate", handleProgress)
playBtn.addEventListener("click", playOrPauseVideo)
skipBtn.addEventListener("click", skipVideo)
ranges.forEach(range=>range.addEventListener("mousemove", handleRange))
ranges.forEach(range=>range.addEventListener("change", handleRange))


let mousedown = false
progress.addEventListener("click", scrub)
progress.addEventListener("mousedown", ()=>{mousedown = true})
progress.addEventListener("mousemove", (e)=>mousedown && scrub(e))
progress.addEventListener("mouseup", ()=>{mousedown = false})

// console.log(progressBar)