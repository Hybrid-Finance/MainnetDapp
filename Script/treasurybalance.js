"use strict"
const treasuryAddress = '0x20D43a59363111a9015457c92E730E113a7E738C';
const usdc = '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664';
const apiKey = "1CD47ZX72N99FZQKZM2VKPU95A6QFJ26YW";

let usdcTreasury = 0;
let treasurybalance = 0;
let avaxTreasury = 0;
let avaxPrice = 0;

const options= { style: 'currency', currency: 'USD' };
const numberFormat = new Intl.NumberFormat('en-US', options);


let reqHeader = new Headers();
reqHeader.append('Content-Type', 'text/json');

let initObject = {
    method: 'GET',
    headers: reqHeader,
};

Promise.all([
        fetch("https://api.snowtrace.io/api?module=account&action=tokenbalance&contractaddress=" + usdc + "&address=" + treasuryAddress + "&tag=latest&apikey=" + apiKey, initObject),
        fetch("https://api.snowtrace.io/api?module=account&action=balance&address=" + treasuryAddress + "&tag=latest&apikey=" + apiKey, initObject),
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,olympus,usd-coin-avalanche-bridged-usdc-e,magic-internet-money&vs_currencies=usd", initObject)

    ]).then( function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then( function (data){
        let usdcTreasury = (data[0].result) / Math.pow(10, 6);
        let avaxTreasury = (data[1].result) / Math.pow(10, 18);
        let avaxPrice = (data[2]["avalanche-2"]["usd"]);
        
       
        document.getElementById("treasury").innerHTML = numberFormat.format(((avaxTreasury * avaxPrice) + usdcTreasury).toFixed(0));
    })    






