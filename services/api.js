const SERVICE = (function () {
  var self = {};
  var variablePrivee = 10;

  self.attributPublic = "bonjour";

  function methodePrivee() {
    console.log('Je suis encapsulée !');
  }

  self.methodePublique = function () {
    console.log('Je suis accessible !');
  };

  return self;
})();

// (function() {
//   var Service = (window.APP.Service = Object.extend(Object, {
//     get: function() {
//       console.log("in get fuction");
//       return new Promise(function(resolve, reject) {
//         let request = new XMLHttpRequest();
//         request.open("GET", "../data/sitetourisme.json");

//         request.onload = function() {
//           // success
//           if (request.status === 200) {
//             // resolve the promise with the parsed response text (assumes JSON)
//             resolve(JSON.parse(request.response));
//           } else {
//             // error retrieving file
//             reject(Error(request.statusText));
//           }
//         };

//         request.onerror = function() {
//           // network errors
//           reject(Error("Network Error"));
//         };

//         request.send();
//       });
//     }
//   }));

//   // .. more code
// })();
