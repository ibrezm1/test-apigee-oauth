const axios = require('axios');
// axios requirement config
//https://axios-http.com/docs/req_config

// Execllent curl convertor
// https://curlconverter.com/node-axios/

// access token via APIGEE
// https://docs.apigee.com/api-platform/tutorials/secure-calls-your-api-through-oauth-20-client-credentials

function getToken() {
    return new Promise((resolve, reject) => {
        var options = {
            url: 'https://jinatedtugasal-eval-test.apigee.net/oauth/client_credential/accesstoken',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                client_id: '3fyns8j65SwbfY75JiAW2kbpJHsbquHG',
                client_secret: 'tNVjfn6c2S9gOXe7',
            }),
            params: {
                grant_type: 'client_credentials',
            },

        }
        axios(options).then(response =>  resolve(response.data.access_token) ).catch(err => console.log(err))

    })
}
function mymethod() {
    return new Promise((resolve, reject) => {
        getToken().then(token => {
            console.log(token);
            options = {
                url: 'https://jinatedtugasal-eval-test.apigee.net/test-oauth',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            axios(options).then(response => resolve(response.data)).catch(err => reject(err))
        }).catch(err => reject(err))
    })
}
//mymethod().then(data => console.log(data)).catch(console.log)
module.exports = {
    getToken,
    mymethod
}