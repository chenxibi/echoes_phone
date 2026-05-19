const fs = require('fs');
const path = require('path');

function walk(p) {
  let r;
  try { r = fs.readdirSync(p); } catch (e) { return; }
  r.forEach(function(f) {
    let fp = path.join(p, f);
    let st;
    try { st = fs.statSync(fp); } catch (e) { return; }
    if (st.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(fp);
    } else if (/\.(json|jsonc|txt|md|yaml|yml|toml|hjson)$/.test(f)) {
      let c;
      try { c = fs.readFileSync(fp, 'utf8'); } catch (e) { return; }
      if (c.includes('展开/收起')) {
        console.log(fp);
      }
    }
  });
}

walk('C:\\Users\\bichenxi\\echoes_phone');
