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
    } else if (/\.(css|scss|sass|less|styl)$/.test(f)) {
      let c;
      try { c = fs.readFileSync(fp, 'utf8'); } catch (e) { return; }
      if (c.includes('展开') || c.includes('收起')) {
        console.log(fp);
        const lines = c.split('\n');
        lines.forEach(function(l, i) {
          if (l.includes('展开') || l.includes('收起')) {
            console.log('  line ' + (i+1) + ': ' + l.trim().substring(0, 120));
          }
        });
      }
    }
  });
}

walk('C:\\Users\\bichenxi\\echoes_phone\\src');
walk('C:\\Users\\bichenxi\\echoes_phone\\public');
