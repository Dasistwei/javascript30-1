const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = ()=>{
  navigator.mediaDevices.getUserMedia({ video: true, audio: false}).then((stream)=>{
    video.srcObject = stream
    video.play()  
  }).catch((err)=>{
    console.error(err)
  })
}

// getVideo()

const takePhoto = ()=>{
  snap.play()

  const data = canvas.toDataURL("image/png");
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'cam-img')
  link.innerHTML = `<img src = ${data} alt= "cam-img">`
  strip.insertBefore(link, strip.firstChild);  
}

video.addEventListener("canplay",()=>{
  let width = video.videoWidth
  let height = video.videoHeight

  canvas.width = width
  canvas.height = height

  let int = setInterval(()=>{
    ctx.drawImage(video, 0, 0, width, height)
  }, 26)
  clearInterval(int)
});

