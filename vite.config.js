import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure arena hero image & official logos are copied to public/
const srcImg = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/.user_uploaded/media_1792825870296.jpg';
const srcLogo = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/.user_uploaded/media_1792832229357.png';
const srcNavbarLogo = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/.user_uploaded/media_1792832353110.png';
const srcFormBg = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/.user_uploaded/media_1792834862179.png';
const srcOgImage = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/.user_uploaded/media_1792837493016.png';
const srcOgBanner = 'C:/Users/Admin/.gemini/antigravity-ide/brain/4a6bf79f-3d07-4197-ab16-23aac6d94d29/og_banner_1792846479219.jpg';
const publicDir = path.resolve(__dirname, 'public');
const destImg = path.resolve(publicDir, 'hero-bg.jpg');
const destLogo = path.resolve(publicDir, 'bxc-logo.png');
const destNavbarLogo = path.resolve(publicDir, 'navbar-logo.png');
const destFormBg = path.resolve(publicDir, 'form-bg.png');
const destOgImage = path.resolve(publicDir, 'og-image.png');
const destOgJpg = path.resolve(publicDir, 'og-image.jpg');
const destOgPoster = path.resolve(publicDir, 'og-poster.png');

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  if (fs.existsSync(srcImg) && !fs.existsSync(destImg)) {
    fs.copyFileSync(srcImg, destImg);
  }
  if (fs.existsSync(srcLogo)) {
    fs.copyFileSync(srcLogo, destLogo);
  }
  if (fs.existsSync(srcNavbarLogo)) {
    fs.copyFileSync(srcNavbarLogo, destNavbarLogo);
  }
  if (fs.existsSync(srcFormBg)) {
    fs.copyFileSync(srcFormBg, destFormBg);
  }
  if (fs.existsSync(srcOgImage)) {
    fs.copyFileSync(srcOgImage, destOgImage);
    fs.copyFileSync(srcOgImage, destOgPoster);
    fs.copyFileSync(srcOgImage, destOgJpg);
  }
} catch (err) {
  console.error('Error copying assets:', err);
}

// Auto-install framer-motion if not yet in node_modules (local dev convenience only)
const framerMotionPath = path.resolve(__dirname, 'node_modules', 'framer-motion');
if (!fs.existsSync(framerMotionPath) && !process.env.VERCEL && !process.env.CI) {
  try {
    console.log('Installing framer-motion for smooth animations...');
    execSync('npm install framer-motion --no-audit --no-fund', {
      cwd: __dirname,
      stdio: 'inherit'
    });
    console.log('framer-motion installed successfully!');
  } catch (err) {
    console.warn('Could not auto-install framer-motion:', err.message);
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});
