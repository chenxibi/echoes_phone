import pdfplumber
import os

os.chdir(r"C:\Users\bichenxi\Downloads")

files = [
    'This Chatbot Would Never... Perceived Moral Agency of Mental Health Chatbots.pdf',
    'Customizable AI for Depression Care Improving the User Experience of Large Language Model-Driven Chatbots.pdf',
    'Uncovering Contradictions in Human-AI Interactions Lessons Learned from User Reviews of Replika.pdf',
    'Emotional Coregulation in Close Relationships with AI Agents - A Survey of ChatGPT and Replika Users.pdf',
    'Characterizing Relationships with Companion and Assistant Large Language Models.pdf',
    'From Lived Experience to Insight Unpacking the Psychological Risks of Using AI Conversational Agents.pdf'
]

for f in files:
    print(f'=== {f} ===')
    try:
        with pdfplumber.open(f) as pdf:
            print(f'Pages: {len(pdf.pages)}')
            text = ''
            for page in pdf.pages[:6]:
                t = page.extract_text()
                if t:
                    text += t + '\n'
            print(text[:4000])
    except Exception as e:
        print(f'Error: {e}')
    print('\n' + '='*80 + '\n')
