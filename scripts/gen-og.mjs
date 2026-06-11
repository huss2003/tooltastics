const sharp = require('sharp')
const fs = require('fs/promises')

async function main() {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">',
    '<defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />',
    '<stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />',
    '</linearGradient></defs>',
    '<rect width="1200" height="630" fill="url(#bg)"/>',
    '<text x="600" y="260" font-family="system-ui,sans-serif" font-size="72" fill="#ffffff" text-anchor="middle" font-weight="800">RulerKit</text>',
    '<text x="600" y="340" font-family="system-ui,sans-serif" font-size="28" fill="#93c5fd" text-anchor="middle" font-weight="400">Free Online Measurement Tools</text>',
    '<text x="600" y="390" font-family="system-ui,sans-serif" font-size="20" fill="#60a5fa" text-anchor="middle">Ruler · Pixel Ruler · Protractor · Ring Sizer · Unit Converter</text>',
    '<rect x="440" y="460" width="320" height="4" rx="2" fill="#3b82f6" opacity="0.6"/>',
    '</svg>',
  ].join('')

  await sharp(Buffer.from(svg)).png().toFile('public/og/default.png')
  console.log('OG image created')
}

main().catch(console.error)
