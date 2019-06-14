const API = (function() {
  var self = {};

  // self.attributPublic = "bonjour";
  //   self.glData = null;

  function methodePrivee() {
    console.log("Je suis encapsulée !");
  }

  self.add = function() {
    console.log("Je suis accessible !");
  };

  self.get = async function() {
    return new Promise((resolve, reject) => {
      const url = "http://192.168.33.12/api/data/read.php";
      return axios
        .get(url)
        .then(function(response) {
          resolve({
            title: "Success!!!",
            body: "We got an example success!",
            config: {
              closeOnClick: true
            }
          });
        })
        .catch(function(error) {
          reject({
            title: "Error!!!",
            body: "We got an example error!",
            config: {
              closeOnClick: true
            }
          });
        });
    });
  };

  return self;
})();

// const API = (function () {
//   var self = {};
//   var variablePrivee = 10;

//   self.attributPublic = "bonjour";

//   function methodePrivee() {
//     console.log('Je suis encapsulée !');
//   }

//   self.methodePublique = function () {
//     console.log('Je suis accessible !');
//   };

//   return self;
// })();

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
