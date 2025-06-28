import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3106;

// Enable CORS for all routes
app.use(
  cors({
    origin: ["http://localhost:3000", "https://studio.fcc.lol"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

app.post("/validate-token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      valid: false,
      error: "Token is required"
    });
  }

  const expectedToken = process.env.IN_STUDIO_AUTH_TOKEN;

  if (!expectedToken) {
    return res.status(500).json({
      valid: false,
      error: "Server configuration error: IN_STUDIO_AUTH_TOKEN not set"
    });
  }

  const isValid = token === expectedToken;

  res.json({
    valid: isValid,
    message: isValid ? "Token is valid" : "Token is invalid"
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
