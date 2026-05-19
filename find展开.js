const fs = require('fs');
const path = require('path');

const dirs = ['C:\\Users\\bichenxi\\echoes_phone\\src', 'C:\\Users\\bichenxi\\echoes_phone\\public'];
const target = '展开';
const files = [];

function walk(p) {
  let r;
  try { r = fs.readdirSync(p); } catch (e) { return; }
  r.forEach(function(f) {
    let fp = path.join(p, f);
    let st;
    try { st = fs.statSync(fp); } catch (e) { return; }
    if (st.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(fp);
    } else if (/\.(vue|tsx?|ts|js|jsx|html)$/.test(f)) {
      let c;
      try { c = fs.readFileSync(fp, 'utf8'); } catch (e) { return; }
      if (c.includes(target)) files.push(fp);
    }
  });
}

dirs.forEach(function(dir) { walk(dir); });
console.log(files.length ? files.join('\n') : 'not found');
