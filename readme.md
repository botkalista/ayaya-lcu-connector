# ayaya-lcu-connector
## Simple lib to interact with LCU

## Install

`npm i ayaya-lcu-connector`

## Usage

```js
const LCU = require('ayaya-lcu-connector');
const lcu = new LCU();

lcu.connect().then(() => {
    lcu.listenForEvents((data, type, uri) => {
        console.log(type + ' ' + uri);
    })
});

lcu.makeRequest('GET','/lol-chat/v1/me').then(data=>{
   console.log(data.summonerName); 
});
```

## License

MIT