import pdfplumber, os, sys
sys.stdout.reconfigure(encoding='utf-8')

attach_dir = r'C:\Users\bichenxi\AppData\Local\Temp\lobsterai\attachments'
os.chdir(attach_dir)

def find_file(partial):
    for f in os.listdir(attach_dir):
        if partial in f:
            return f
    return None

# PDFs
pdf_files = [
    ('Against Imaginary Friends', 'Against_Imaginary_Friends.txt'),
    ('Silicon Love', 'Silicon_Love.txt'),
    ('My Dataset of Love', 'My_Dataset_of_Love.txt'),
]

for partial, outname in pdf_files:
    fname = find_file(partial)
    if fname:
        print(f'=== {fname} ===')
        try:
            with pdfplumber.open(fname) as pdf:
                print(f'Pages: {len(pdf.pages)}')
                text = ''
                for page in pdf.pages:
                    t = page.extract_text()
                    if t:
                        text += t + '\n'
            # Save to file
            outpath = rf'D:\论文\thesis\papers_full\{outname}'
            with open(outpath, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f'Saved to {outpath}, length={len(text)}')
        except Exception as e:
            print(f'Error: {e}')
        print()

# TXTs
txt_files = [
    ('Rise of Emotion-aware', 'Rise_of_Emotion_aware.txt'),
    ('Our Kid Has a Human', 'Future_of_Relationships.txt'),
]

for partial, outname in txt_files:
    fname = find_file(partial)
    if fname:
        print(f'=== {fname} ===')
        try:
            with open(fname, 'r', encoding='utf-8') as f:
                text = f.read()
            outpath = rf'D:\论文\thesis\papers_full\{outname}'
            with open(outpath, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f'Saved to {outpath}, length={len(text)}')
        except Exception as e:
            print(f'Error: {e}')
        print()
