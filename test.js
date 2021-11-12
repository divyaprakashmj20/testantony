const http = require('httpsssssssssssssss');
const https = require('https');
const fs = require('fs');
var bigTextUrl = "http://norvig.com/big.txt"

http.get(bigTextUrl, (resp) => {
    let data = '';

    // a data chunk has been received.
    resp.on('data', (chunk) => {
        data += chunk;
        // console.log(chunk);
    });

    // complete response has been received.
    resp.on('end', () => {
        // console.log(data);

        m = new Map();
        var desired = data.replace(/[^a-zA-Z]/gi, ' ')
        k = desired.split(' ');

        t = new Map();

        k.map(i => {
            j = i.toLowerCase();

            if (j != '') {
                if (t.get(j) != undefined) {
                    // console.log(t.get(i));
                    t.set(j, (t.get(j) + 1))
                } else {
                    t.set(j, 1)
                }
            }

        })

        const tSort = new Map([...t.entries()].sort((a, b) => b[1] - a[1]));


        for(var i=0; i<10; i++){

            console.log([...tSort][i][0]);

            var yandexUrl = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9&lang=en-en&text=${[...tSort][i][0]}`

            console.log(yandexUrl);

            // console.log([...tSort][i]);
            https.get(yandexUrl, (resp) => {
                let data = '';
            
                // a data chunk has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
            
                // complete response has been received.
                resp.on('end', () => {
                    let a = {

                    }
                    a['Word'] = [...tSort][i][0]
                    console.log(a);
                    console.log(JSON.parse(data)?.def[0]?.text);
                });
            
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            });

        }




        // console.log(k);

        // console.log(JSON.parse(data));
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});



// https.get(yandexUrl, (resp) => {
//     let data = '';

//     // a data chunk has been received.
//     resp.on('data', (chunk) => {
//         data += chunk;
//     });

//     // complete response has been received.
//     resp.on('end', () => {
//         console.log(JSON.parse(data));
//     });

// }).on("error", (err) => {
//     console.log("Error: " + err.message);
// });


