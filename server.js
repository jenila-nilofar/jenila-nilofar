const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true })); // to handle form data
app.use(bodyParser.json()); // to handle JSON data

// Serve static files from 'public' folder
app.use(express.static('public'));

// Route to serve the application form
app.get('/application-form', (req, res) => {
    res.sendFile(__dirname + '/public/application_form.html');
});


// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/')
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('visaProcessing');
    const applicationsCollection = db.collection('applications');

    // Handling POST request to '/submit-application'
    app.post('/submit-application', (req, res) => {
        const { applicantName, passportNumber, visaType, emailAddress, phoneNumber, address, gender, arrested, refused, trafficking, crime, violence, asylum, declaration } = req.body;

        // Insert form data into MongoDB
        applicationsCollections.insertOne({
            applicantName,
            passportNumber,
            visaType,
            emailAddress,
            phoneNumber,
            address,
            gender,
            arrested,
            refused,
            trafficking,
            crime,
            violence,
            asylum,
            declaration
        })
        .then(result => {
          console.log('Application Submitted:', result.insertedId); // Log inserted ID
          res.send('Application submitted successfully!');
        })
        
        .catch(error => {
            console.error('Error inserting application:', error);
            res.status(500).send('Error submitting application');
        });
    });

    // Start the server
    app.listen(3000, () => {
        console.log('Server running at http://localhost:3000');
    });

  }).catch(error => console.error('MongoDB connection failed:', error));

 