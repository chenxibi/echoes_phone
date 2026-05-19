import os
import sys

# Try Python 3.12 first
python312 = r'C:\Users\bichenxi\AppData\Local\Programs\Python\Python312\python.exe'
python311 = r'C:\Users\bichenxi\AppData\Roaming\LobsterAI\runtimes\python-win\python.exe'

for py in [python312, python311]:
    print(f'Trying: {py}')
    result = os.system(f'"{py}" -c "from pypdf import PdfReader; print(\\"pypdf OK\\")" 2>&1')
    print(f'Result: {result}')
