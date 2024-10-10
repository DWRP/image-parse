import express from "express";
import { routes } from "./routes/index.routes";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
