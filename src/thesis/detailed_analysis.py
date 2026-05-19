import json

with open(r'D:\论文\thesis\pdf_extracted_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Papers and approximate locations of key sections (based on PDF page structure)
# Strategy: search for section headers or key phrases to find body text
papers_info = {
    'Moral_Agency': {
        'file': 'This Chatbot Would Never... Perceived Moral Agency of Mental Health Chatbots.pdf',
        'sections': {
            'intro': 9000,
            'related': 18000,
            'methods': 40000,
            'results': 60000,
            'discussion': 75000
        }
    },
    'Depression_Care': {
        'file': 'Customizable AI for Depression Care Improving the User Experience of Large Language Model-Driven Chatbots.pdf',
        'sections': {
            'intro': 8000,
            'related': 18000,
            'methods': 40000,
            'results': 70000,
            'discussion': 95000
        }
    },
    'Replika_Contradictions': {
        'file': 'Uncovering Contradictions in Human-AI Interactions Lessons Learned from User Reviews of Replika.pdf',
        'sections': {
            'intro': 5000,
            'related': 12000,
            'methods': 20000,
            'results': 30000,
            'discussion': 40000
        }
    },
    'Emotional_Coregulation': {
        'file': 'Emotional Coregulation in Close Relationships with AI Agents - A Survey of ChatGPT and Replika Users.pdf',
        'sections': {
            'intro': 5000,
            'related': 12000,
            'methods': 22000,
            'results': 35000,
            'discussion': 45000
        }
    },
    'Companion_vs_Assistant': {
        'file': 'Characterizing Relationships with Companion and Assistant Large Language Models.pdf',
        'sections': {
            'intro': 5000,
            'related': 12000,
            'methods': 20000,
            'results': 30000,
            'discussion': 40000
        }
    },
    'Psychological_Risks': {
        'file': 'From Lived Experience to Insight Unpacking the Psychological Risks of Using AI Conversational Agents.pdf',
        'sections': {
            'intro': 8000,
            'related': 20000,
            'methods': 45000,
            'results': 90000,
            'discussion': 130000
        }
    }
}

with open(r'D:\论文\thesis\detailed_analysis.txt', 'w', encoding='utf-8') as out:
    for pname, pinfo in papers_info.items():
        fname = pinfo['file']
        if fname not in data:
            out.write(f'{pname}: NOT FOUND\n')
            continue
        text = data[fname]['text']
        out.write(f'\n{"="*80}\n')
        out.write(f'PAPER: {pname}\n')
        out.write(f'Total chars: {len(text)}, pages: {data[fname]["pages"]}\n')
        out.write(f'{"="*80}\n')
        for sname, start in pinfo['sections'].items():
            end = start + 2000
            chunk = text[start:end]
            out.write(f'\n--- {sname.upper()} (chars {start}-{end}) ---\n')
            out.write(chunk)
            out.write('\n')

print('Done')
