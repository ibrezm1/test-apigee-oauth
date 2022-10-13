const { getToken,mymethod } = require("../getoauth3");
// From Online
// https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
// https://stackoverflow.com/questions/57747392/using-jest-to-mock-multiple-axios-calls

// Jest Test Promises
// https://jestjs.io/docs/asynchronous

// Jest Coverage 
// https://stackoverflow.com/questions/24825860/how-to-get-the-code-coverage-report-using-jest
const axios = require('axios');

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

test('the data is peanut butter', () => {
  axios.mockImplementation(() => Promise.resolve({ data: {access_token:'443344'} }));
    return getToken().then(data => {
      expect(data).toBeTruthy();
    });
  });

  test('the data is peanut butter', () => {
    axios.mockImplementation(() => Promise.resolve({ data: {access_token:'443344'} }));
      return mymethod().then(data => {
        expect(data).toBeTruthy();
      });
    });

    test("bad response", () => {
      axios.mockImplementation((url) => {
        switch (url) {
          case 'https://jinatedtugasal-eval-test.apigee.net/oauth/client_credential/accesstoken':
            return Promise.resolve({data: {access_token : 'dfsdfsdfsf'}})
          case '/items.json':
            return Promise.resolve({data: [{id: 1}, {id: 2}]})
          default:
            return Promise.reject('error')
        }
      })
      return mymethod().then(console.log).catch(err=>{
        console.log(err)
        expect(err).toBeTruthy();
      });
      
    });