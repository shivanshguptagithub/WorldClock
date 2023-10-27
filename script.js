function submit() {
    let timezone = document.getElementById("timezone").value
    let date = new Date()
    let timcard = `<div class="timecard">
                        <div class="tz">${timezone}</div>
                        <div class="dateTime">${date.toLocaleString('en-US', { timeZone: timezone })}</div>
                        <div class="container-clock">
                            <img class="clock" id="clock" src="analogclock.png" alt="clock" srcset="">
            
                            <div class="hours" id="hours"></div>
                            <div class="mins" id="mins"></div>
                            <div class="secs"  id="secs"></div>
                        </div>
                    </div>`
    document.getElementById("timecards").innerHTML += timcard
    document.getElementById("timezone").value = ""

}
setInterval(() => {
    let tzs = Array.from(document.getElementsByClassName("tz"))
    let dateTime = Array.from(document.getElementsByClassName("dateTime"))
    let date = new Date()
    dateTime.forEach((ele, i) => {
        let tzl = tzs[i].innerHTML
        ele.innerHTML = date.toLocaleString('en-US', { timeZone: tzl })
    })
}, 1000);

setInterval(() => {
    let tzs = Array.from(document.getElementsByClassName("tz"))
    let tcs= Array.from(document.getElementsByClassName("timecard"))
    let hrhands = Array.from(document.getElementsByClassName("hours"))
    let minhands = Array.from(document.getElementsByClassName("mins"))
    let sechands = Array.from(document.getElementsByClassName("secs"))
    
    tzs.forEach((ele,j) => {
        let date=new Date()
        
        let hours, mins, secs
        let tzl = ele.innerHTML
        
        let dateFormat = new Intl.DateTimeFormat('en-US', {
            timeZone: tzl,
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        })
        
        date = dateFormat.formatToParts(date)
        
        if(((parseInt(date[0].value)<6)&&date[6].value==="AM")||((parseInt(date[0].value)>5)&&date[6].value==="PM")){
            tcs[j].classList.add("timecard-dark")
        }
        else{
            tcs[j].classList.remove("timecard-dark")
        }

        for (let i = 0; i < date.length; i++) {
            if (date[i].type === "hour") {
                hours = parseInt(date[i].value);
            }
            else if (date[i].type === "minute") {
                mins = parseInt(date[i].value);
            }
            else if (date[i].type === "second") {
                secs = parseInt(date[i].value);
            }
        }
        
        let hrDeg = (hours % 12) * 30 + (mins) * 0.5
            hrhands[j].style.transformOrigin = "bottom"
            hrhands[j].style.transform = `rotate(${hrDeg}deg)`

        let minDeg = (mins) * 6
        minhands.forEach((ele) => {
            minhands[j].style.transformOrigin = "bottom"
            minhands[j].style.transform = `rotate(${minDeg}deg)`
        })

        let secDeg = (secs) * 6
        sechands.forEach((ele) => {
            sechands[j].style.transformOrigin = "bottom"
            sechands[j].style.transform = `rotate(${secDeg}deg)`
        })
    })
}, 1000);