import json
import os

os.makedirs(r'D:\论文\thesis\papers_full', exist_ok=True)

with open(r'D:\论文\thesis\pdf_extracted_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

papers = {
    'Moral_Agency': 'This Chatbot Would Never... Perceived Moral Agency of Mental Health Chatbots.pdf',
    'Depression_Care': 'Customizable AI for Depression Care Improving the User Experience of Large Language Model-Driven Chatbots.pdf',
    'Replika_Contradictions': 'Uncovering Contradictions in Human-AI Interactions Lessons Learned from User Reviews of Replika.pdf',
    'Emotional_Coregulation': 'Emotional Coregulation in Close Relationships with AI Agents - A Survey of ChatGPT and Replika Users.pdf',
    'Companion_vs_Assistant': 'Characterizing Relationships with Companion and Assistant Large Language Models.pdf',
    'Psychological_Risks': 'From Lived Experience to Insight Unpacking the Psychological Risks of Using AI Conversational Agents.pdf'
}

for name, fname in papers.items():
    if fname in data:
        text = data[fname]['text']
        with open(fr'D:\论文\thesis\papers_full\{name}.txt', 'w', encoding='utf-8') as out:
            out.write(text)
        print(f'{name}: {len(text)} chars')
    else:
        print(f'{name}: NOT FOUND')

print('Done.')
