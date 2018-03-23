const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const serviceAccount = require("./path/SixR-0c5047e9f63b.json");

//admin.initializeApp(functions.config().firebase);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "sixr-2d3f0.appspot.com"
});


exports.addMessage = functions.https.onRequest((req, res) => {
    const bucket = admin.storage().bucket();

    bucket.getFiles().then(results => {
        const fies = results[0];
        if(fies.length === 0){
            return;
        }
        const file = fies[0];

        return file.getSignedUrl({
            action: 'read',
            expires: moment().add(1, 'days').format('MM-DD-YYYY')
        }).then(url => res.json(url[0])
        ).catch(err => {
            console.error('ERROR:', err);
        });


    }).catch(err => {
        console.error('ERROR:', err);
    });



    // Grab the text parameter.

});
