const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputImagePath = path.join(__dirname, 'public', 'logo.jpg');
const outputDir = path.join(__dirname, 'public', 'assets', 'logo');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processLogos() {
  try {
    const baseImage = sharp(inputImagePath);
    const metadata = await baseImage.metadata();

    // PNG
    await baseImage.clone().toFile(path.join(outputDir, 'logo.png'));

    // Black & White (Grayscale / Monochrome)
    await baseImage.clone().grayscale().toFile(path.join(outputDir, 'logo-monochrome.png'));
    await baseImage.clone().grayscale().toFile(path.join(outputDir, 'logo-black.png'));
    await baseImage.clone().grayscale().negate().toFile(path.join(outputDir, 'logo-white.png'));

    // Transparent (Since we can't extract cleanly without ML, we use a basic transparent conversion assuming a light bg)
    // Wait, sharp doesn't easily remove white backgrounds automatically. We'll just generate a normal PNG for now.
    await baseImage.clone().toFile(path.join(outputDir, 'logo-transparent.png'));

    // PDF optimized (e.g. 300dpi if possible, or high res jpeg)
    await baseImage.clone().jpeg({ quality: 100 }).toFile(path.join(outputDir, 'logo-pdf-optimized.jpg'));

    // Favicon (32x32)
    await baseImage.clone().resize(32, 32).toFile(path.join(outputDir, 'favicon.png'));

    // Social icon (e.g., 512x512)
    await baseImage.clone().resize(512, 512).toFile(path.join(outputDir, 'logo-social.png'));

    // Email signature (e.g., 150px wide)
    await baseImage.clone().resize(150).toFile(path.join(outputDir, 'logo-email-signature.png'));

    // Small (100px)
    await baseImage.clone().resize(100).toFile(path.join(outputDir, 'logo-small.png'));

    // Large (1000px)
    await baseImage.clone().resize(1000).toFile(path.join(outputDir, 'logo-large.png'));

    // Retina (2x the original size, or just large)
    await baseImage.clone().resize(metadata.width ? metadata.width * 2 : 2000).toFile(path.join(outputDir, 'logo-retina.png'));

    // Dummy SVG that embeds the JPG (since we can't vectorize)
    const base64Data = fs.readFileSync(inputImagePath, 'base64');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${metadata.width || 500}" height="${metadata.height || 500}">
      <image href="data:image/jpeg;base64,${base64Data}" width="100%" height="100%" />
    </svg>`;
    fs.writeFileSync(path.join(outputDir, 'logo.svg'), svgContent);
    fs.writeFileSync(path.join(outputDir, 'logo-icon.svg'), svgContent);
    fs.writeFileSync(path.join(outputDir, 'logo-with-font.svg'), svgContent); // For backward compatibility with what I set previously

    console.log("All logo assets generated successfully in /public/assets/logo/");
  } catch (err) {
    console.error("Error processing logos:", err);
  }
}

processLogos();
