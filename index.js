import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/process-image", async (req, res) => {
  const { imageUrl, prompt } = req.body;

  if (!imageUrl || !prompt) {
    return res
      .status(400)
      .json({ error: "Faltan parámetros 'imageUrl' o 'prompt'" });
  }

  let data = JSON.stringify({
    version: "8a89b0ab59a050244a751b6475d91041a8582ba33692ae6fab65e0c51b700328",
    input: {
      image: imageUrl,
      prompt: prompt,
      scheduler: "K_EULER_ANCESTRAL",
      num_samples: 1,
      guidance_scale: 7.5,
      negative_prompt:
        "anime, cartoon, graphic, text, painting, crayon, graphite, abstract, glitch, deformed, mutated, ugly, disfigured",
      num_inference_steps: 30,
      adapter_conditioning_scale: 1,
      adapter_conditioning_factor: 1,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.replicate.com/v1/predictions",
    headers: {
      Authorization: `Bearer ${process.env.VITE_REPLICATE_API_KEY}`,
      "Content-Type": "application/json",
      Prefer: "wait",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
