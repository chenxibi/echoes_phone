import pdfplumber, os, sys, glob
sys.stdout.reconfigure(encoding='utf-8')

attach_dir = r'C:\Users\bichenxi\AppData\Local\Temp\lobsterai\attachments'
os.chdir(attach_dir)

def find_file(partial):
    for f in os.listdir(attach_dir):
        if partial in f:
            return f
    return None

# Process parasocial PDF
fname = find_file('Parasocial')
if fname and fname.endswith('.pdf'):
    print(f'=== {fname} ===')
    try:
        with pdfplumber.open(fname) as pdf:
            print(f'Pages: {len(pdf.pages)}')
            text = ''
            for page in pdf.pages:
                t = page.extract_text()
                if t:
                    text += t + '\n'
            print(text[:3500])
            if len(text) > 3500:
                print('...[truncated]')
    except Exception as e:
        print(f'Error: {e}')
    print()
