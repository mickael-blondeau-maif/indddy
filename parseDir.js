#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { JavaTokens } from './javaTokens.js';

const rootDir = process.argv[2] || 'src';

let allTokens = [];

// Scan des fichiers .java du répertoire dir
function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            scanDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.java')) {
            const javaText = fs.readFileSync(fullPath, 'utf-8');
            try {
                const visitor = new JavaTokens(javaText);
                const tokens = visitor.parse();
                allTokens.push(...tokens);
            } catch (err) {
                console.error(`Erreur de parsing dans ${fullPath} : ${err.message}`);
            }
        }
    }
}

scanDirectory(rootDir);

let total = 0;
const freqMap = new Map();
allTokens.forEach(token => {
    freqMap.set(token, (freqMap.get(token) || 0) + 1);
    total++;
});

// Tri par fréquence décroissante
const sorted = Array.from(freqMap.entries()).sort((a, b) => b[1] - a[1]);

sorted.forEach(([token, count]) => {
    console.log(`${count.toString().padStart(4)} ${token}`);
});
