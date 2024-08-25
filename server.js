const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Helper function to process data
function processData(data) {
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);
    return { numbers, alphabets, highestLowercaseAlphabet };
}

// POST Method
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            user_id: null,
            email: null,
            roll_number: null,
            numbers: [],
            alphabets: [],
            highest_lowercase_alphabet: []
        });
    }

    const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

    res.json({
        is_success: true,
        user_id: "your_name_ddmmyyyy",  // Replace with your full name and DOB in ddmmyyyy format
        email: "your_email@college.com", // Replace with your college email ID
        roll_number: "your_roll_number", // Replace with your roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});

// GET Method
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
