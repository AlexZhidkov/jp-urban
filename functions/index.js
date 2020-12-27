/*
 * A Firebase Cloud Function that uses Google OAuth2 to 
 * manage a Google user's calendar.
 * 
 * @Author: Scott McCartney
 * @Twitter: @skittlesMc9
 * https://medium.com/zero-equals-false/integrating-firebase-cloud-functions-with-google-calendar-api-9a5ac042e869
 * @Github: https://github.com/scott-mccartney/google-calendar-cloud-function
 */
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar('v3');
const functions = require('firebase-functions');
const https = require('https');

const googleCredentials = require('./credentials.json');
const humanitixOptions = {
    hostname: 'console.humanitix.net',
    path: '/public/api/v1/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': googleCredentials.humanitixApiKey,
    }
}

function getAvailableSlots(auth) {
    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: auth,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            q: 'Available_Time_Slot',
        }, (err, res) => {
            if (err) {
                console.log('Rejecting because of error');
                reject(err);
            }
            console.log('Request successful');
            resolve(res.data);
        });
    });
}

exports.getListOfEvents = functions.region('australia-southeast1').https.onCall((data, context) => {
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    });

    return getAvailableSlots(oAuth2Client).then(d => {
        return d;
    }).catch(err => {
        console.error('Error retrieving list of events: ' + err.message);
        return { error: err.message };
    });
});

exports.bookEvent = functions.region('australia-southeast1').https.onCall((data, context) => {
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    });

    data.auth = oAuth2Client;

    return bookEventInCalendar(data).then(d => {
        return d;
    }).catch(err => {
        console.error('Failed to book event in calendar: ' + err.message);
        return { error: err.message };
    });
});

function bookEventInCalendar(data) {
    return new Promise((resolve, reject) => {
        calendar.events.update(data,
            (err, res) => {
                if (err) {
                    console.log('Rejecting because of error');
                    reject(err);
                }
                console.log('Request successful');
                resolve(res.data);
            });
    });
}

exports.humanitixGetEvents = functions.region('australia-southeast1').https.onCall((data, context) => {
    return _humanitixGetEvents().then(d => {
        return d;
    }).catch(err => {
        console.error('Error retrieving events from Humanitix: ');
        console.error(err);
        return { error: err };
    });
});

function _humanitixGetEvents() {
    return new Promise((resolve, reject) => {
        let options = humanitixOptions;
        options.path += 'events';

        const request = https.request(options, (res) => {
            console.log('Humanitix response Status Code:', res.statusCode);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data))
            });
        });
        request.on('error', (err) => {
            console.log("Error: ", err.message);
            reject(new Error(err.message));
        });
        request.end();
    });
}