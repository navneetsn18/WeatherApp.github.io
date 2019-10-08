window.addEventListener('load',()=>{
    let long,lat;
    let temp = document.querySelector(".temp-degree");
    let tempdesc = document.querySelector(".temp-desc");
    let locationplace = document.querySelector(".location-place");
    let fc = document.querySelector(".sym");
    let tempsec = document.querySelector(".temp-sec");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            let proxy="https://cors-anywhere.herokuapp.com/";
            let api= `${proxy}https://api.darksky.net/forecast/e6e8e2aea1121aa3641b125a4438351b/${lat},${long}`;
            fetch(api)
                .then(res=>{
                    return res.json();
                })
                .then(data=>{
                    temp.textContent = data.currently.temperature;
                    locationplace.textContent = data.timezone;
                    tempdesc.textContent = data.currently.summary;
                    setIcon(data.currently.icon,document.querySelector(".icon"));
                    let result =(data.currently.temperature-32)*(5/9);
                    console.log(fc);
                    tempsec.addEventListener("click",()=>{
                        if(fc.textContent==="F")
                        {
                            fc.textContent="C";
                            temp.textContent=Math.floor(result);
                        }
                        else
                        {
                            fc.textContent="F";
                            temp.textContent= data.currently.temperature;
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