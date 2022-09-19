// const cacheName = 'PatCache_v1';

// let urlsToCache = [
//   './index.html',
// ]
// function getFiles(folder) {
//   const testFolder = folder;
//   const fs = require('fs');
//   fs.readdir(testFolder, (err, files) => {
//     files.forEach(file => {
//       console.log(file);
//     });
//   });
// }
// // alle elementer til at skabe appen skal caches

// self.addEventListener('install', (event) => {
//   event.waitUntil(caches.open(cacheName).then((cache) => {
//     // Add all the assets in the array to the "cacheName"
//     // `Cache` instance for later use.
//     return cache.addAll(urlsToCache);
//   }));
// });
// self.addEventListener('activate', (event) => {
//   // Specify allowed cache keys
//   // Get all the currently active `Cache` instances.
//   event.waitUntil(caches.keys().then((keys) => {
//     // Delete all caches that aren't in the "cacheName":
//     return Promise.all(keys.map((key) => {
//       if (!cacheName.includes(key)) {
//         return caches.delete(key);
//       }
//     }));
//   }));
// });
// self.addEventListener('fetch', function (event) {
//   event.respondWith(

//     //Look network then cach
//     //fetch(event.request).catch(function (){
//     // retun caches.match(event.request)
//     //})

//     //Look cach then network
//     //caches.match(event.request).then(function (response) {
//       //return response || fetch(event.request);
//     //})

//     //Look cach then network   and cache found resource
//     caches.open(cacheName).then(function (cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function (response) {
//           cache.put(event.request, response.clone())
//           return response
//         })
//       })
//     })

//   );
// });