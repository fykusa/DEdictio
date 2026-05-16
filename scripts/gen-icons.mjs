import sharp from 'sharp'
import { mkdirSync } from 'fs'

mkdirSync('public/icons', { recursive: true })

const sizes = [192, 512]

for (const size of sizes) {
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 15, g: 17, b: 23, alpha: 1 },
    },
  })
    .composite([{
      input: Buffer.from(
        `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="55%" font-size="${Math.round(size * 0.45)}" text-anchor="middle" dominant-baseline="middle" font-family="serif" fill="#6ee7b7">D</text>
        </svg>`
      ),
      blend: 'over',
    }])
    .png()
    .toFile(`public/icons/icon-${size}.png`)

  console.log(`icon-${size}.png created`)
}
