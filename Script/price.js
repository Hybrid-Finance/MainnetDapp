"use strict"

let reqHeader = new Headers();
reqHeader.append('Content-Type', 'text/json');

let initObject = {
    method: 'GET', headers: reqHeader,
};

var userRequest = new Request('https://api.dev.dex.guru/v1/chain/43114/tokens/0x496e6F025ED7e799e43Fd1BaBe61497E95677734/market/?api-key=Dsi2MHetDUrejdxvPRMXUHSFGW19M7pkaIh41gZzIKQ', initObject);

fetch(userRequest)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let price = 0;
        console.log(data);
        document.getElementById("price").innerHTML = "$" + Number(data.price_usd).toFixed(3);
        price = Number(data.price_usd);
    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    });



    console.log(price);
