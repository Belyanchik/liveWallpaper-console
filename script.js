const sleep = [
    ["", "⠀⠀⠙⣳⡆", "⠀⠀⠘⠷⠀⠀⣀", "⠀⠀⠀⠀⠀⢠⣿⠃"],
    ["⠀⠀⠀⠀⠀⠀⠀⠀⡀", "⠀⠀⠀⠀⠀⠀⠈⣹⠏", "⠀⠀⠀⣀⠀⠀⠐⠛⠚", "⠀⠀⠚⣿⣤"]
]

const cursor = ["|", ""]

function updateScreen() {  //Updating what is displayed on the screen, other than system information
    if(i == 4){i = 0};
    let now = new Date();
    document.querySelector(".time").textContent = `[TIME]${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    document.querySelector(".date").textContent = `[DATE]${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    
    document.querySelector(".cursor").textContent = cursor[i % 2];
    if(i % 2 == 0){
        document.querySelector(".s1").textContent = `${sleep[Math.floor(i / 2)][0]}`;
        document.querySelector(".s2").textContent = `${sleep[Math.floor(i / 2)][1]}`;
        document.querySelector(".s3").textContent = `${sleep[Math.floor(i / 2)][2]}`;
        document.querySelector(".s4").textContent = `${sleep[Math.floor(i / 2)][3]}`;
    }
    i++;
};

function livelySystemInformation(data) {  //Used directly by the application, required to obtain system information
    let obj = JSON.parse(data);

    let cpu = Math.trunc(obj.CurrentCpu)
    let gpu = Math.trunc(obj.CurrentGpu3D)
    let ram = obj.TotalRam - obj.CurrentRamAvail

    let cpuGraph = drawGraphic(cpu)
    let gpuGraph = drawGraphic(gpu)
    let ramGraph = drawGraphic(Math.trunc(ram * 100 / obj.TotalRam))

    document.querySelector(".cpu").textContent = `[CCPU]${cpuGraph}${cpu}%`;
    document.querySelector(".gpu").textContent = `[CGPU]${gpuGraph}${gpu}%`;
    document.querySelector(".mem").textContent = `[CRAM]${ramGraph}${ram}/${obj.TotalRam}`;
}

function drawGraphic(num) {  //Graphical representation of resource usage
    let graph = ""
    if(String(num).length == 2) {
        graph = `[${"#".repeat(Number(String(num)[0]))}${".".repeat(Number(10 - String(num)[0]))}]`
    } else if(String(num).length == 3) {
        graph = `[${"#".repeat(10)}]`
    } else if(String(num).length == 1) {
        graph = `[${".".repeat(10)}]`
    }
    return graph
}

let i = 1;
updateScreen()
let timerId = setInterval(() => updateScreen(), 500);