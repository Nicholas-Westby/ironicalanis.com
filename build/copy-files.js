import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { join as pathJoin, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copySingleFile(srcPath, destPath) {
    await mkdir(dirname(destPath), { recursive: true });
    await copyFile(srcPath, destPath);
}

async function copyDirectory(srcDir, destDir) {
    await mkdir(destDir, { recursive: true });
    const entries = await readdir(srcDir, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = pathJoin(srcDir, entry.name);
        const destPath = pathJoin(destDir, entry.name);
        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await copySingleFile(srcPath, destPath);
        }
    }
}

async function main() {
    const baseDir = pathJoin(__dirname, '..');
    const destDir = pathJoin(baseDir, 'dist');

    // List of paths to copy
    const pathsToCopy = [
        'assets/images',
        'assets/models',
        'assets/shaders',
        'robots.txt',
    ];

    for (const p of pathsToCopy) {
        const src = pathJoin(baseDir, p);
        const dest = pathJoin(destDir, p);
        if (!existsSync(src)) {
            continue;
        }
        const stats = await stat(src);
        if (stats.isDirectory()) {
            await copyDirectory(src, dest);
        } else {
            await copySingleFile(src, dest);
        }
    }
}

await main();
