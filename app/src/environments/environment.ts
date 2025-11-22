// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, 
  TAPI:'http://localhost:3000',
  mapboxToken: 'pk.eyJ1IjoiYW1hcnJlcm8xNSIsImEiOiJjbWk4dWhoZ3kwZ2ZqMmlweHJuMm9uZHVvIn0.uTN7Gx0qJoRP1KjtgRPTzQ',
  firebaseConfig:{
      apiKey: "AIzaSyCeUDAdbVyCM2hW9AdtEoMwa_XqUdEVbDM",
      authDomain: "tracking-2b4eb.firebaseapp.com",
      projectId: "tracking-2b4eb",
      storageBucket: "tracking-2b4eb.firebasestorage.app",
      messagingSenderId: "487329839272",
      appId: "1:487329839272:web:3c8b0ef6c30f429843ea9d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
