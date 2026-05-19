const fs = require('fs');
const path = require('path');

const target = '展开/收起';
const found = [];

function walk(p) {
  let r;
  try { r = fs.readdirSync(p); } catch (e) { return; }
  r.forEach(function(f) {
    let fp = path.join(p, f);
    let st;
    try { st = fs.statSync(fp); } catch (e) { return; }
    if (st.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(fp);
    } else {
      let c;
      try { c = fs.readFileSync(fp, 'utf8'); } catch (e) { return; }
      if (c.includes(target)) {
        found.push(fp);
      }
    }
  });
}

walk('C:\\Users\\bichenxi\\echoes_phone');
found.forEach(function(fp) { console.log(fp); });
