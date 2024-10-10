import { Request, Response, Router } from "express";
import sharp from "sharp";

class DefaultRouter {
  async handle(req: Request, res: Response) {
    try {
      const { image, width, height } = req.body;

      if (!image || !width || !height) {
        return res.status(400).json({ error: "Parâmetros ausentes" });
      }

      const imgBuffer = Buffer.from(image, "base64");

      const resizedImageBuffer = await sharp(imgBuffer)
        .resize(parseInt(width), parseInt(height))
        .toBuffer();

      const resizedImageBase64 = resizedImageBuffer.toString("base64");

      return res.json({ image: resizedImageBase64 });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao processar a imagem" });
    }
  }
}

export const routes = Router();
routes.post("/resize", new DefaultRouter().handle as any);
