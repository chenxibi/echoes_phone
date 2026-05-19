import os
from pypdf import PdfReader

papers = [
    (1, r'C:\Users\bichenxi\Downloads\Designing an Emotionally Intelligent Conversational System to Support HomeBased Reminiscence Therapy for Older Adults.pdf'),
    (2, r'C:\Users\bichenxi\Downloads\Designing and Evaluating a Tangible Tabletop Game for Playful Exploration of the Energy Grid.pdf'),
    (3, r"C:\Users\bichenxi\Downloads\'Better a Lasagna than a Onesie' - Exploring Everyday Postpartum Needs and Care to Inform the Design of Supportive Technologies.pdf")
]

for idx, paper in papers:
    print(f'=== PAPER {idx} ===')
    try:
        reader = PdfReader(paper)
        print(f'Pages: {len(reader.pages)}')
        text = ''
        for j, page in enumerate(reader.pages):
            t = page.extract_text()
            if t:
                text += f'\n--- Page {j+1} ---\n' + t
        with open(rf'D:/论文/thesis/paper{idx}_raw.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print(f'Saved paper{idx}_raw.txt, chars: {len(text)}')
    except Exception as e:
        print(f'Error: {e}')
    print()
