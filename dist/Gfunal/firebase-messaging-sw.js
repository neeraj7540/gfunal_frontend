importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
apiKey: "AIzaSyAleVNSHbEv_xHElsU2AnZqTtZYM3n365A",
  authDomain: "gfunl-953d9.firebaseapp.com",
  databaseURL: "https://gfunl-953d9.firebaseio.com",
  projectId: "gfunl-953d9",
  storageBucket: "gfunl-953d9.appspot.com",
  messagingSenderId: "265309906245",
  appId: "1:265309906245:web:3ff639f398770cab788a2c",
  measurementId: "G-7EQSXQ0QHD"
});

const messaging = firebase.messaging();
