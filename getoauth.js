const axios = require('axios');

axios
  .post(
    'https://jinatedtugasal-eval-test.apigee.net/oauth/client_credential/accesstoken',
    new URLSearchParams({
      client_id: '3fyns8j65SwbfY75JiAW2kbpJHsbquHG',
      client_secret: 'tNVjfn6c2S9gOXe7',
    }),
    {
      params: {
        grant_type: 'client_credentials',
      },
    }
  )
  .then((response) => {
    const token = response.data.access_token
    console.log(`token received : ${token}`);
    axios.get('https://jinatedtugasal-eval-test.apigee.net/test-oauth', {
        headers: {
            'Authorization': 'Bearer nIs2PARP6Lc2jLpRX59tDX8KglIz'
        }
    }).then(response => console.log(response.data))

  });

