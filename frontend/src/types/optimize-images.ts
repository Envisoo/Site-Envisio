import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sizes = {
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1920
};

async function optimizeImages() {
  const imageDir = path.join(process.cwd(), 'public/images');
  const files = await fs.readdir(imageDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const imagePath = path.join(imageDir, file);
    const image = sharp(imagePath);

    // Criar versões WebP em diferentes tamanhos
    for (const [size, width] of Object.entries(sizes)) {
      await image
        .resize(width)
        .webp({ quality: 80 })
        .toFile(path.join(imageDir, `${path.parse(file).name}-${size}.webp`));
    }
  }
}

optimizeImages();