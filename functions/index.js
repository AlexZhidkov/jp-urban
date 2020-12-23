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

const googleCredentials = require('./credentials.json');

const ERROR_RESPONSE = {
    status: "500",
    message: "There was an error adding an event to your Google calendar"
};
const TIME_ZONE = 'EST';

function addEvent(event, auth) {
    return new Promise(function (resolve, reject) {
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: {
                'summary': event.eventName,
                'description': event.description,
                'start': {
                    'dateTime': event.startTime,
                    'timeZone': TIME_ZONE,
                },
                'end': {
                    'dateTime': event.endTime,
                    'timeZone': TIME_ZONE,
                },
            },
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

exports.addEventToCalendar = functions.region('australia-southeast1').https.onRequest((request, response) => {
    const eventData = {
        eventName: request.body.eventName,
        description: request.body.description,
        startTime: request.body.startTime,
        endTime: request.body.endTime
    };
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    });

    addEvent(eventData, oAuth2Client).then(data => {
        response.set('Access-Control-Allow-Origin', '*').status(200).send(data);
        return;
    }).catch(err => {
        console.error('Error adding event: ' + err.message);
        response.set('Access-Control-Allow-Origin', '*').status(500).send(ERROR_RESPONSE);
        return;
    });
});

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

