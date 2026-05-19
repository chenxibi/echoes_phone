const fs = require('fs');
const path = require('path');

// Check for BOM, different encodings, etc.
const targetBytes = [0xe5, 0xb1, 0x95, 0xe5, 0xbc, 0x80, 0x2f, 0xe6, 0x94, 0xb6, 0xe8, 0xb5, 0xb7];

function walk(p) {
  let r;
  try { r = fs.readdirSync(p); } catch (e) { return; }
  r.forEach(function(f) {
    let fp = path.join(p, f);
    let st;
    try { st = fs.statSync(fp); } catch (e) { return; }
    if (st.isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(fp);
    } else if (/\.(js|jsx|ts|tsx|vue|html|css|scss|json)$/.test(f)) {
      let buffer;
      try { buffer = fs.readFileSync(fp); } catch (e) { return; }
      const str = buffer.toString('utf8');
      // Check if UTF-8 bytes of target exist
      const bufStr = buffer.toString('binary');
      const targetStr = Buffer.from(targetBytes).toString('utf8');
      if (str.includes(targetStr)) {
        console.log('UTF8 match: ' + fp);
      }
      // Also check for any file that has the 展 character (E5B195)
      if (buffer.includes(Buffer.from([0xE5, 0xB1, 0x95]))) {
        console.log('Has 展: ' + fp);
      }
    }
  });
}

walk('C:\\Users\\bichenxi\\echoes_phone\\src');
