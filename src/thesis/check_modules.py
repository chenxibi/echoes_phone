import sys
print('Python:', sys.executable)
print('Version:', sys.version)

modules_to_check = ['pypdf', 'fitz', 'pdfplumber', 'PyPDF2', 'pymupdf']
for m in modules_to_check:
    try:
        __import__(m)
        print(f'{m}: OK')
    except ImportError as e:
        print(f'{m}: NOT AVAILABLE - {e}')
