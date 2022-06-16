const axios = require('axios');

let config = {
  headers: {
            "Access-Control-Allow-Origin" : "*",
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
  responseType: 'json'
};


let baseUrl = 'http://app-81596f36-d8cc-4f19-af91-72139047918a.cleverapps.io';
// let baseUrl = 'http://localhost:3000';
 
async function _getQuizzes() {
  return await axios.get(baseUrl+'/quizzes', config);
}
 
//////////////////////////////////////////

const ApiServices = {

  // Quiz
    _getQuizzes,

}

window.ApiServices = ApiServices;
