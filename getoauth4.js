const axios = require('axios');

require('dotenv').config()
axios.defaults.baseURL = process.env.APIGEE_BASE;

// Setting defaults at axios or instance level
// https://axios-http.com/docs/config_defaults

// axios requirement config
//https://axios-http.com/docs/req_config

// Execllent curl convertor
// https://curlconverter.com/node-axios/

// access token via APIGEE
// https://docs.apigee.com/api-platform/tutorials/secure-calls-your-api-through-oauth-20-client-credentials

// Docs of err handling
// https://stackabuse.com/handling-errors-with-axios/

function getToken() {
    return new Promise((resolve, reject) => {
        var options = {
            //baseURL: process.env.APIGEE_BASE,
            url: process.env.APIGEE_PATH_OAUTH,
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: new URLSearchParams({
                client_id: process.env.APIGEE_CLIENT_ID,
                client_secret: process.env.APIGEE_CLIENT_SECRET,
            }),
            params: {
                grant_type: 'client_credentials',
            },

        }
        axios(options).then(response =>  resolve(response.data.access_token) ).catch(err => {
            console.log(err.response.data);
            reject(err.message)})

    })
}
function mymethod() {
    return new Promise((resolve, reject) => {
        getToken().then(token => {
            console.log(token);
            options = {
                //baseURL: process.env.APIGEE_BASE,
                url: process.env.APIGEE_PATH_GETPRODUCT,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            axios(options).then(response => resolve(response.data)).catch(err => {
                console.log(err.response.data);
                reject(err.message)})
        }).catch(err => reject(err))
    })
}
mymethod().then(data => console.log(data)).catch(console.log)
module.exports = {
    getToken,
    mymethod
}