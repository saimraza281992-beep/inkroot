import fs from 'fs';
import { spawnSync } from 'child_process';
import path from 'path';

const content = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
let match;
let count = 0;

if (!fs.existsSync('temp_scripts')) fs.mkdirSync('temp_scripts');

while ((match = scriptRegex.exec(content)) !== null) {
  const scriptContent = match[1];
  if (scriptContent.trim()) {
    const fileName = `temp_scripts/script_${++count}.js`;
    fs.writeFileSync(fileName, scriptContent);
    const result = spawnSync('node', ['--check', fileName]);
    if (result.status !== 0) {
      console.error(`Error in script ${count}:`, result.stderr.toString());
      const offset = match.index + match[0].indexOf(scriptContent);
      const linesBefore = content.substring(0, offset).split('\n').length;
      console.error(`Approximate line in index.html: ${linesBefore}`);
    } else {
      console.log(`Script ${count} is valid`);
    }
  }
}
