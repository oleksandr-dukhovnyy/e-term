import fs from 'node:fs';
import util from 'util';
import { exec as _exec } from 'node:child_process';
import path from 'node:path';
const exec = util.promisify(_exec);

const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve('./package.json')).toString()
);

(async () => {
  // build
  console.log((await exec('npm run build')).stdout);

  // update gh-pages
  fs.rmdirSync(path.resolve('./docs'));
  const files = fs.readdirSync(path.resolve('./dist'));

  files.forEach((filename) => {
    fs.copyFileSync(path.resolve(filename), path.resolve('./docs'));
  });
  fs.writeFileSync(path.resolve('./docs/index.html'), ``);

  // create & push tags
  const version = packageJSON.version;
  if (!/\d+\.\d+\.\d+\./.test(version)) throw `invalid version: ${version}`;
  console.log((await exec(`git add .`)).stdout);
  console.log((await exec(`git commit -m "docs update"`)).stdout);
  console.log((await exec(`git tag ${version}`)).stdout);
  console.log((await exec(`git push --tags`)).stdout);

  // publish to npm
  console.log((await exec('npm publish')).stdout);
})();
