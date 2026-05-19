import pdfplumber
import os
import json

os.chdir(r"C:\Users\bichenxi\Downloads")

files = [
    'This Chatbot Would Never... Perceived Moral Agency of Mental Health Chatbots.pdf',
    'Customizable AI for Depression Care Improving the User Experience of Large Language Model-Driven Chatbots.pdf',
    'Uncovering Contradictions in Human-AI Interactions Lessons Learned from User Reviews of Replika.pdf',
    'Emotional Coregulation in Close Relationships with AI Agents - A Survey of ChatGPT and Replika Users.pdf',
    'Characterizing Relationships with Companion and Assistant Large Language Models.pdf',
    'From Lived Experience to Insight Unpacking the Psychological Risks of Using AI Conversational Agents.pdf'
]

results = {}
for i, f in enumerate(files):
    print(f'[{i+1}/{len(files)}] Processing: {f}')
    try:
        with pdfplumber.open(f) as pdf:
            num_pages = len(pdf.pages)
            print(f'  Total pages: {num_pages}')
            text = ''
            for j, page in enumerate(pdf.pages):
                t = page.extract_text()
                if t:
                    text += f'\n--- Page {j+1} ---\n' + t
            results[f] = {'pages': num_pages, 'text': text}
            print(f'  Extracted: {len(text)} chars')
    except Exception as e:
        results[f] = {'error': str(e)}
        print(f'  Error: {e}')

# Save to JSON for easy reading
with open(r'D:\论文\thesis\pdf_extracted_results.json', 'w', encoding='utf-8') as out:
    json.dump(results, out, ensure_ascii=False, indent=2)

print('\nAll done! Results saved to pdf_extracted_results.json')
for fname, data in results.items():
    print(f'\n{fname}')
    print(f'  Pages: {data.get("pages", "N/A")}')
    print(f'  Chars: {len(data.get("text", ""))}')
    if 'error' in data:
        print(f'  Error: {data["error"]}')
