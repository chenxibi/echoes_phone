import json

with open(r'D:\论文\thesis\pdf_extracted_results.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Print structured summaries of each paper
papers = {
    '1_Moral_Agency': ('This Chatbot Would Never... Perceived Moral Agency of Mental Health Chatbots.pdf', 450, 900),
    '2_Depression_Care': ('Customizable AI for Depression Care Improving the User Experience of Large Language Model-Driven Chatbots.pdf', 200, 800),
    '3_Replika_Contradictions': ('Uncovering Contradictions in Human-AI Interactions Lessons Learned from User Reviews of Replika.pdf', 200, 700),
    '4_Emotional_Coregulation': ('Emotional Coregulation in Close Relationships with AI Agents - A Survey of ChatGPT and Replika Users.pdf', 200, 700),
    '5_Companion_vs_Assistant': ('Characterizing Relationships with Companion and Assistant Large Language Models.pdf', 200, 700),
    '6_Psychological_Risks': ('From Lived Experience to Insight Unpacking the Psychological Risks of Using AI Conversational Agents.pdf', 200, 900),
}

with open(r'D:\论文\thesis\paper_summaries.txt', 'w', encoding='utf-8') as out:
    for name, (fname, start, end) in papers.items():
        if fname in data:
            text = data[fname]['text']
            out.write(f'\n{"="*80}\n{name}\n')
            out.write(f'Pages: {data[fname]["pages"]}, Chars: {len(text)}\n')
            out.write(f'Content (chars {start}-{end}):\n')
            out.write(text[start:end])
            out.write('\n')
        else:
            out.write(f'{name}: NOT FOUND\n')

print('Done')
