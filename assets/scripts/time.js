const timeContainer = document.getElementById("time-wrapper");
// const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
// const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

function updateTime() {
    let dateString = new Date().toString();
    let parts = dateString.split("GMT");
    
    const datePart = parts[0].trim();
    const timeZonePart = "GMT" + parts[1].trim();
    
    timeContainer.getElementsByClassName("time")[0].textContent = datePart;
    timeContainer.getElementsByClassName("gmt")[0].textContent = timeZonePart;
}

updateTime();
setInterval(updateTime, 1000);