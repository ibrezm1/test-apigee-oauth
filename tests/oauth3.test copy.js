const { getToken, mymethod } = require("../getoauth4");
// From Online
// https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest
// https://stackoverflow.com/questions/57747392/using-jest-to-mock-multiple-axios-calls

// Jest Test Promises
// https://jestjs.io/docs/asynchronous

// Jest Coverage 
// https://stackoverflow.com/questions/24825860/how-to-get-the-code-coverage-report-using-jest

// Debug tests
// https://jest-bot.github.io/jest/docs/troubleshooting.html
const axios = require('axios');

// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

test('Test Token Generation returns token', () => {
  expect.assertions(1);
  axios.mockImplementation(() => Promise.resolve({ data: { access_token: '443344' } }));
  return getToken().then(data => {
    expect(data).toBeTruthy();
  });
});

test('Test iprice method returns data', () => {
  expect.assertions(1);
  axios.mockImplementation(() => Promise.resolve({ data: { access_token: '443344' } }));
  return mymethod().then(data => {
    expect(data).toBeTruthy();
  });
});

test("bad response", async() => {
  // axios.mockImplementation((url) => {
  //   switch (url) {
  //     case '/oauth/client_credential/accesstoken':
  //       console.log('in mock auth');
  //       return Promise.resolve({ data: { access_token: 'dfsdfsdfsf' } })
  //     case '/items.json':
  //       console.log('in mock item');
  //       return Promise.resolve({ data: [{ id: 1 }, { id: 2 }] })
  //     default:
  //       console.log('in mock default');
  //       return Promise.reject('error')
  //   }
  // })
  // chrome://inspect/
  // node --inspect-brk ./node_modules/.bin/jest --runInBand
  axios.mockImplementation(() => Promise.reject({ data: { access_token: '443344' } }));
  axios.mockReturnValue(Promise.reject('Error'));
  debugger;
  // return expect(mymethod()).rejects.toEqual({
  //   error: 'error',
  // });
  expect.assertions(1);
  const rate = await getToken();
  expect(rate).toEqual(null);


});