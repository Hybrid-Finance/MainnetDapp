"use strict"
const treasuryAddress = '0x20D43a59363111a9015457c92E730E113a7E738C';
const tokenAddress = "0x496e6F025ED7e799e43Fd1BaBe61497E95677734";
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
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,hybrid&vs_currencies=usd", initObject),
        fetch("https://api.snowtrace.io/api?module=stats&action=tokensupply&contractaddress=" + tokenAddress + "&apikey=" + apiKey, initObject)

    ]).then( function (responses) {
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    }).then( function (data){
        let usdcTreasury = (data[0].result) / Math.pow(10, 6);
        let avaxTreasury = (data[1].result) / Math.pow(10, 18);
        let avaxPrice = (data[2]["avalanche-2"]["usd"]);
        let hybridPrice = (data[2]["hybrid"]["usd"]);
        let supply = (data[3].result) / Math.pow(10, 18);
        console.log(supply);
        
        document.getElementById("price").innerHTML = "$" + Number(hybridPrice).toFixed(3);
        document.getElementById("treasury").innerHTML = numberFormat.format(((avaxTreasury * avaxPrice) + usdcTreasury).toFixed(0));
        document.getElementById("marketcap").innerHTML = numberFormat.format((supply * hybridPrice).toFixed(0));
    });






