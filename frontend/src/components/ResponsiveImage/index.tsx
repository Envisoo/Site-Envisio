/** @format */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";

const tamanhos = {
  pequeno: 320,
  medio: 768,
  grande: 1024,
  extraGrande: 1920,
};

async function otimizarImagens() {
  const pastaImagens = path.join(process.cwd(), "public/images");
  const arquivos = await fs.readdir(pastaImagens);

  for (const arquivo of arquivos) {
    if (!/\.(jpg|jpeg|png)$/i.test(arquivo)) continue;

    const caminhoImagem = path.join(pastaImagens, arquivo);
    const imagem = sharp(caminhoImagem);
    const info = await imagem.metadata();

    // Criar versões WebP em diferentes tamanhos
    for (const [tamanho, largura] of Object.entries(tamanhos)) {
      await imagem
        .resize(largura, Math.round((largura * info.height!) / info.width!))
        .webp({ quality: 80 })
        .toFile(
          path.join(pastaImagens, `${path.parse(arquivo).name}-${tamanho}.webp`)
        );
    }
  }
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ResponsiveImage({ src, alt, className }: ResponsiveImageProps) {
  const basePath = src.replace(/\.[^/.]+$/, "");

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={`${basePath}-xl.webp`} />
      <source media="(min-width: 768px)" srcSet={`${basePath}-lg.webp`} />
      <source media="(min-width: 320px)" srcSet={`${basePath}-md.webp`} />
      <img
        src={`${basePath}-sm.webp`}
        alt={alt}
        loading="lazy"
        className={className}
      />
    </picture>
  );
}

export { otimizarImagens };
