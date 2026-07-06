import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createOgImage() {
  const inputPath = path.join(__dirname, 'src', 'assets', 'couple', 'photo-01.jpg');
  const outputPath = path.join(__dirname, 'public', 'og-image.jpg');

  try {
    console.log('Generating OG image...');
    
    // 1. Create the blurred background
    const bg = await sharp(inputPath)
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .blur(25)
      .modulate({ brightness: 0.6 })
      .toBuffer();

    // 2. Resize the foreground image so it fits within the 630px height without cropping
    const fg = await sharp(inputPath)
      .resize(null, 630, { fit: 'inside' })
      .toBuffer();

    // 3. Composite foreground over background
    await sharp(bg)
      .composite([{ input: fg, gravity: 'center' }])
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log('Successfully created public/og-image.jpg');
  } catch (err) {
    console.error('Error generating OG image:', err);
  }
}

createOgImage();
