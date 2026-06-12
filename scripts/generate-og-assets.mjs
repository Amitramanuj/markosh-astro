// One-off generator for the social share image and favicons.
// Run: node scripts/generate-og-assets.mjs
import sharp from 'sharp';

const logo = 'public/markosh-logo.png';

const ogSvg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FAF8F4"/>
  <rect x="0" y="0" width="1200" height="8" fill="#4338CA"/>
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#16181F">Markosh</text>
  <text x="90" y="375" font-family="Arial, sans-serif" font-size="34" fill="#4338CA">Senior engineers, embedded in your team.</text>
  <text x="90" y="445" font-family="Arial, sans-serif" font-size="26" fill="#5A5E6B">IT Staffing · Custom Software · AI Development</text>
  <text x="90" y="560" font-family="Arial, sans-serif" font-size="24" fill="#5A5E6B">markosh.com</text>
</svg>`;

const logoBadge = await sharp(logo).resize(160, 160, { fit: 'contain' }).png().toBuffer();

await sharp(Buffer.from(ogSvg))
  .composite([{ input: logoBadge, top: 90, left: 90 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');

await sharp(logo).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(logo).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(logo).resize(16, 16).png().toFile('public/favicon-16.png');

console.log('Generated og-image.png, apple-touch-icon.png, favicon-32.png, favicon-16.png');
