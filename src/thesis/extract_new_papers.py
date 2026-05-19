import pdfplumber, os, sys, glob
sys.stdout.reconfigure(encoding='utf-8')

attach_dir = r'C:\Users\bichenxi\AppData\Local\Temp\lobsterai\attachments'
os.chdir(attach_dir)

# Find PDF by partial name match
def find_file(partial):
    for f in os.listdir(attach_dir):
        if partial in f:
            return f
    return None

files_to_process = [
    find_file('Behaviors and Perceptions'),
    find_file('Dark Addiction'),
    find_file('Long-Term Memory'),
    find_file('1773917343321')  # AI's Impact on Mental Health
]

for fname in files_to_process:
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
                print(text[:3000])
                if len(text) > 3000:
                    print('...[truncated]')
        except Exception as e:
            print(f'Error: {e}')
        print()

# Read txt files
txt_files = [
    find_file('When Human-AI Interactions'),
    find_file('Beyond Text and Speech'),
    find_file('Do we know and do we care')
]

for fname in txt_files:
    if fname:
        print(f'=== {fname} ===')
        try:
            with open(fname, 'r', encoding='utf-8') as f:
                text = f.read()
                print(text[:3000])
                if len(text) > 3000:
                    print('...[truncated]')
        except Exception as e:
            print(f'Error: {e}')
        print()
