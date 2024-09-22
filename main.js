const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World! Gemini");
})


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const generate = async (prompt) => {
    try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
    } catch (error) {
    console.error(error);
    }
}
 
// generate();


app.get('/api/content',  async (req, res) => {
    try {
        const data = req.body.question;
    const result = await generate(data);

    res.send( {
        "result": result
    })
    } catch (error) {
        console.error("error:" +error);
    }
})
app.listen(3000, () => {
    console.log("Server started on port 3000");
})