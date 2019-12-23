const express = require('express')
const app = express()
const port = 3000
const axios = require("axios");

const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

app.get('/', (req, res) => {
    axios({
        method: "get",
        url:
            "https://images.unsplash.com/photo-1574880790898-29d299ff284b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600",
        responseType: "stream"
    }).then(response => {
        // response.data.pipe(transformer).pipe(res);
        // console.log(`response is ${JSON.stringify(response)}`);
        // logger.info(response)
        console.log(`response is ${Object.keys(response.data)}`);
        return response;
    });
    res.send(`Hello world, today's date is ${(new Date()).getDate()}!`);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))