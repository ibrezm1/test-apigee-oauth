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

// Reset Mocks
// https://stackoverflow.com/questions/47812801/how-to-reset-jest-mock-functions-calls-count-before-every-test
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

test("bad response for get token", async () => {
  jest.clearAllMocks();
  axios.mockClear();
  
  //axios.mockImplementation(() => Promise.reject({ response: { data: 'abcd' } }));
  axios.mockReturnValue(Promise.reject({response:{data:'abcd'},message:'test'}));
  try {
    const rate = await getToken();
    expect(rate).toEqual(null);
  } catch (e) {
    console.log(e)
  }
});

test("bad response for get my method", async () => {
  jest.clearAllMocks();
  axios.mockClear();
  //axios.mockReturnValue(Promise.reject({response:{data:'abcd'},message:'test'}));
  
  axios.mockReturnValueOnce(() => Promise.reject({ response: { data: 'abcd' },message:'test' }));
  axios.mockReturnValueOnce(() => Promise.resolve({ data: { access_token: '443344' } }));
  try {
    const rate = await mymethod();
    expect(rate).toEqual(null);
  } catch (e) {
  }
});