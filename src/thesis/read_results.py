import json

with open(r'D:\论文\thesis\pdf_extracted_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(r'D:\论文\thesis\pdf_analysis.txt', 'w', encoding='utf-8') as out:
    for fname in data:
        out.write(f'=== {fname} ===\n')
        text = data[fname]['text']
        out.write(text[:3000])
        out.write('\n...\n\n')

print('Done. Saved to pdf_analysis.txt')
