import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3106;

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
