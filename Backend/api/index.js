// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(bodyParser.json());

// // POST method route
// app.post("/bfhl", (req, res) => {
//   const { data } = req.body;
//   if (!Array.isArray(data)) {
//     return res.status(400).json({
//       is_success: false,
//       message: "Invalid input, 'data' should be an array.",
//     });
//   }

//   const user_id = "john_doe_17091999"; // Replace with dynamic values if needed
//   const email = "john@xyz.com"; // Replace with dynamic values if needed
//   const roll_number = "ABCD123"; // Replace with dynamic values if needed

//   const numbers = [];
//   const alphabets = [];
//   let highest_lowercase_alphabet = "";

//   data.forEach((item) => {
//     if (!isNaN(item)) {
//       numbers.push(item);
//     } else if (typeof item === "string") {
//       alphabets.push(item);
//       if (item >= "a" && item <= "z") {
//         if (
//           highest_lowercase_alphabet === "" ||
//           item > highest_lowercase_alphabet
//         ) {
//           highest_lowercase_alphabet = item;
//         }
//       }
//     }
//   });

//   res.status(200).json({
//     is_success: true,
//     user_id: user_id,
//     email: email,
//     roll_number: roll_number,
//     numbers: numbers,
//     alphabets: alphabets,
//     highest_lowercase_alphabet: highest_lowercase_alphabet
//       ? [highest_lowercase_alphabet]
//       : [],
//   });
// });

// // GET method route
// app.get("/bfhl", (req, res) => {
//   res.status(200).json({
//     operation_code: 1,
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON request body
app.use(bodyParser.json());

// POST method for processing JSON data
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    // Ensure 'data' is an array
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Data must be an array" });
    }

    // Process data
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(
      (item) => item >= "a" && item <= "z"
    );
    const highestLowercaseAlphabet =
      lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method for returning a hardcoded operation code
app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

// Export the handler for Vercel
module.exports = app;
