const express = require('express');
const path = require('path'); // Import path module
require('dotenv').config(); // dotenv প্যাকেজ লোড করা
const rateLimit = require('express-rate-limit');
const app = express();
const divisions = require('./divisions.json');
const districts = require('./districts.json');
const upzilas = require('./upzilas.json');
const unions = require('./unions.json');




// Middleware to serve static files
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'index.html')));
=======
app.use(express.static(path.join(__dirname, 'public')));
>>>>>>> 7ca436b (আপনার কমেন্ট বার্তা)



// Rate limiter middleware
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // ১ মিনিটে যতবার অনুরোধ করা যাবে
    max: 300, // সর্বোচ্চ ৩০০ অনুরোধ
    message: "You have exceeded the maximum number of requests. Please try again after a minute."
});

// Rate Limiting শুধুমাত্র API রুটের জন্য
app.use('/api/', apiLimiter);



// Endpoint to get all divisions
app.get('/api/divisions', (req, res) => {
    res.json(divisions);
});


// Endpoint to get all divisions
app.get('/api/districts', (req, res) => {
    res.json(districts);
});

app.get('/api/districts/:division_id', (req, res) => {
    const divisionId = req.params.division_id; // স্ট্রিং হিসেবেই নেবো
    console.log(`Received request for division ID: ${divisionId}`);
    
    console.log('All Districts:', districts); // এখানে লগ করুন সব জেলা
    const filteredDistricts = districts.filter(d => d.division_id === divisionId); // স্ট্রিং চেক করবো
    
    if (filteredDistricts.length === 0) {
        return res.status(404).json({ message: "No districts found for this division." });
    }
    
    console.log('Filtered Districts:', filteredDistricts);
    res.json(filteredDistricts);
});

// District to Upzila
app.get('/api/upzilas/:district_id', (req, res) => {
    const districtId = req.params.district_id; // স্ট্রিং হিসেবেই নেবো
    const filteredUpzilas = upzilas.filter(u => u.district_id === districtId); // স্ট্রিং চেক করবো
    
    if (filteredUpzilas.length === 0) {
        return res.status(404).json({ message: "No upzilas found for this district." });
    }

    res.json(filteredUpzilas);
});

// Upzila to Union
app.get('/api/unions/:upzila_id', (req, res) => {
    const upzilaId = req.params.upzila_id; // স্ট্রিং হিসেবেই নেবো
    const filteredUnions = unions.filter(u => u.upzila_id === upzilaId); // স্ট্রিং চেক করবো
    
    if (filteredUnions.length === 0) {
        return res.status(404).json({ message: "No unions found for this upzila." });
    }

    res.json(filteredUnions);
});

// Start server
const PORT = process.env.PORT || 8159;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
