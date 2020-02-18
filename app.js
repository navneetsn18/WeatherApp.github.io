let tempsec = document.querySelector(".temp-sec");
let clock = document.querySelector(".clock");
let date = document.querySelector(".date");
setInterval(displayclock,500);
function displayclock(){
    var time = new Date();
    var hrs = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var en = 'AM';
    var curdate = time.getUTCDate();
    var month = time.getUTCMonth();
    month+=1;
    var year = time.getFullYear();
    var day = time.getUTCDay();
    if(hrs>12){
        en = 'PM';
    }
    if(hrs>12){
        hrs-=12;
    }
    if(hrs==0){
        hrs=12;
    }
    if(hrs<10){
        hrs = '0'+hrs;
    }
    if(min<10){ 
        min = '0'+min;
    }
    if(sec<10){
        sec = '0'+sec;
    }
    if(day == '0'){
        day = "Sun";
    }
    if(day == '1'){
        day = "Mon";
    }
    if(day == '2'){
        day = "Tue";
    }
    if(day == '3'){
        day = "Wed";
    }
    if(day == '4'){
        day = "Thurs";
    }
    if(day == '5'){
        day = "Fri";
    }
    if(day == '6'){
        day = "Sat";
    }
    date.textContent = day + " ," + curdate + "/" + month + "/" + year;
    clock.textContent = hrs + ":" + min + ":" + sec + " " + en;
}
window.addEventListener('load',()=>{
    let long,lat;
    let temp = document.querySelector(".temp-degree");
    let tempdesc = document.querySelector(".temp-desc");
    let fc = document.querySelector(".sym");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let proxy = "https://cors-anywhere.herokuapp.com/";
            let api = `${proxy}https://api.darksky.net/forecast/211d05599f1d5e0dedaf31b11cde5430/${lat},${long}`;
            fetch(api)
                .then(res=>{
                    return res.json();
                })
                .then(data=>{
                    let resultF = data.currently.temperature;
                    let result = (data.currently.temperature-32)*(5/9);
                    let resultC = Math.floor(result);
                    fc.textContent = "°C";
                    temp.textContent = resultC;
                    tempdesc.textContent = data.currently.summary;
                    setIcon(data.currently.icon,document.querySelector(".icon"));
                    tempsec.addEventListener("click",()=>{
                        if(fc.textContent === "F")
                        {
                            fc.textContent = "°C";
                            temp.textContent = resultC;
                        }
                        else
                        {
                            fc.textContent = "F";
                            temp.textContent = resultF;
                        }
                    })
                })
        })
    }
    function setIcon(icon,iconID){
        let skycons = new Skycons({color:"white"});
        let currenticon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currenticon]);
    }
});
