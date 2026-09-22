import ast
import re
from pathlib import Path

root=Path(__file__).resolve().parents[2]
tree=ast.parse((root/'tmp/pdfs/expand_comp352.py').read_text(encoding='utf-8'))
data={}
for node in tree.body:
    if isinstance(node,ast.Assign) and isinstance(node.targets[0],ast.Name) and node.targets[0].id in ('qs','mc','tf'):
        data[node.targets[0].id]=ast.literal_eval(node.value)
qs,mc,tf=data['qs'],data['mc'],data['tf']
qs[0][1][0]='(a) Let n be a positive power of two. For the pseudocode below, give the exact number of calls to work() and a tight asymptotic bound. Each call takes constant time. (4 marks)'
qs[5][1][2]='(c) Draw the binary min-heap as a tree after the removeMin operation in part (b). Label every node with its key and briefly explain why the result satisfies the min-heap property. (3 marks)'
qs[5][2][2]='(c) The resulting tree has root 2, left child 5 and right child 9; node 5 has left child 6. Every parent is no larger than its children: 2 <= 5, 2 <= 9 and 5 <= 6. The shape is complete, with the last level filled from left to right. Award 2 marks for the correct labelled tree and 1 for the heap-property explanation.'
mc[5]=('A hash table uses h(k) = k mod 7. Which pair of keys collides?', 'A 10 and 17   B 10 and 18   C 5 and 13   D 7 and 15', 'A: 10 mod 7 = 3 and 17 mod 7 = 3, so both keys hash to index 3.')

def esc(s):
    return ''.join({'&':r'\&','%':r'\%','$':r'\$','#':r'\#','_':r'\_','{':r'\{','}':r'\}','~':r'\textasciitilde{}','\\':r'\textbackslash{}'}.get(ch,ch) for ch in s)

def tex(s):
    # Render mathematical notation in LaTeX math mode throughout the document.
    pattern=r'(?:Theta|O)\([^)]*\)|[A-Za-z0-9]+\^[A-Za-z0-9]+|log2\(n\)|<=|>=|<-|\bTheta\b'
    out=[];pos=0
    for match in re.finditer(pattern,s):
        out.append(esc(s[pos:match.start()]));v=match.group()
        if v.startswith(('Theta(','O(')):
            v=v.replace('Theta',r'\Theta').replace('log',r'\log ').replace(' ',r'\,')
        elif v=='log2(n)':v=r'\log_2 n'
        elif v=='<=':v=r'\leq'
        elif v=='>=':v=r'\geq'
        elif v=='<-':v=r'\leftarrow'
        elif v=='Theta':v=r'\Theta'
        else:
            base,power=v.split('^');v=base+'^{'+power+'}'
        out.append('$'+v+'$');pos=match.end()
    out.append(esc(s[pos:]));return ''.join(out)

parts=[r'''\documentclass[11pt,a4paper]{article}
\usepackage[margin=19mm,top=24mm,bottom=22mm,headheight=15pt]{geometry}
\usepackage{fontspec,amsmath,amssymb,xcolor,fancyhdr,tabularx,tikz}
\setmainfont{TeX Gyre Heros}
\setsansfont{TeX Gyre Heros}
\setmonofont{TeX Gyre Cursor}
\definecolor{ink}{HTML}{18324E}
\definecolor{muted}{HTML}{526176}
\definecolor{line}{HTML}{DCE3EB}
\color{ink}
\setlength{\parindent}{0pt}
\setlength{\parskip}{7pt}
\pagestyle{fancy}\fancyhf{}
\fancyhead[L]{\small\textbf{EAZYGRADES}}
\fancyhead[R]{\small COMP 352 / CORE}
\fancyfoot[L]{\scriptsize\shortstack[l]{\copyright\ 2026 EazyGrades. For personal study use only.\\Redistribution, resale, or sharing is not permitted.}}
\fancyfoot[R]{\small\thepage}
\renewcommand{\headrulewidth}{0.6pt}
\renewcommand{\footrulewidth}{0.3pt}
\newcommand{\pagetitle}[2]{\textcolor{muted}{\small\MakeUppercase{#1}}\par\vspace{4pt}{\LARGE\bfseries #2}\par\vspace{10pt}}
\newcommand{\qtitle}[1]{{\large\bfseries #1}\par\vspace{3pt}}
\newcommand{\worklines}{\par\vspace{3pt}{\color{line}\hrule}\vspace{17pt}{\color{line}\hrule}\vspace{17pt}{\color{line}\hrule}\vspace{13pt}}
\begin{document}
\pagetitle{Outline-based practice}{Core Exam Practice}
{\Large\bfseries COMP 352}\par
{\large Data Structures and Algorithms}\par\vspace{14pt}
8 multiple-choice questions\quad\textbullet\quad 6 true/false questions\par
10 structured questions\quad\textbullet\quad Worked solutions included\par\vspace{16pt}
\qtitle{Before you begin}
Show your reasoning and use additional paper as needed. Try the questions before checking the solutions.

\textbf{120 practice marks.} Multiple choice: 1 mark each. True/false: 1 mark for the answer and 1 for the explanation. Structured questions: 10 marks each. No negative marking in this practice set.
\vspace{16pt}
\qtitle{Topics}
Algorithm analysis and recursion; arrays, stacks and queues; linked lists; trees and heaps; hashing and sorting; graphs and data-structure design.
\vfill
{\small\color{muted}Based on the supplied COMP 352 Winter 2025 course outline. Selected topics only; not a complete syllabus review or a prediction of your exam.\par
AI-generated practice for study and revision only. Not official course material. EazyGrades is not affiliated with Concordia University or any school. No academic result is guaranteed.}
\newpage
\pagetitle{Section A / 8 marks}{Multiple choice}
Choose one answer for each question.
''']
for i,(question,choices,_) in enumerate(mc,1):
    opts=re.split(r'\s+(?=[ABCD] )',choices)
    assert len(opts)==4
    parts.append(r'\begin{minipage}{\linewidth}'+'\n'+r'\textbf{M'+str(i)+r'.} '+tex(question)+r'\par'+'\n')
    parts.append(r'\renewcommand{\arraystretch}{1.4}\begin{tabularx}{\linewidth}{@{}X X@{}}'+'\n')
    cells=[r'\textbf{'+x[0]+r'.}\enspace '+tex(x[2:]) for x in opts]
    parts.append(cells[0]+' & '+cells[1]+r' \\'+'\n'+cells[2]+' & '+cells[3]+'\n'+r'\end{tabularx}\end{minipage}\par\vspace{7pt}'+'\n')
parts.append(r'\newpage\pagetitle{Section B / 12 marks}{True or false}'+'\n'+r'Give a brief justification for each answer.\par'+'\n')
for i,(q,_) in enumerate(tf,1):parts.append(r'\textbf{T'+str(i)+'.} '+tex(q)+r'\par\worklines'+'\n')

titles=['Analysis and recursion','Linear data structures','Trees and priority queues','Hashing and sorting','Graphs and design']
for k in range(0,10,2):
    parts.append(r'\newpage\pagetitle{Section C / 20 marks}{'+titles[k//2]+'}\n')
    for j in (k,k+1):
        title,questions,_=qs[j]
        parts.append(r'\qtitle{Q'+str(j+1)+'. '+tex(title)+r' / 10 marks}'+'\n')
        for sub,q in enumerate(questions):
            parts.append(tex(q)+r'\par'+'\n')
            if j==0 and sub==0:
                parts.append(r'''\begin{quote}\small\ttfamily
i $\gets$ 1\\
while i $\leq$ n:\\
\hspace*{1em}for j $\gets$ 1 to i:\\
\hspace*{2em}work()\\
\hspace*{1em}i $\gets$ 2 $\times$ i
\end{quote}
''')
        if j==5:parts.append(r'\vspace{3pt}{\color{line}\fbox{\parbox[t][85pt][t]{0.95\linewidth}{\small\color{muted}Tree drawing}}}\par'+'\n')
        else:parts.append(r'\worklines'+'\n')

parts.append(r'\newpage\pagetitle{Solutions / Sections A and B}{Concept-check answers}'+'\n'+r'\qtitle{Multiple choice}'+'\n')
for i,(_,_,a) in enumerate(mc,1):parts.append(r'\textbf{M'+str(i)+'.} '+tex(a)+r'\par'+'\n')
parts.append(r'\vspace{8pt}\qtitle{True or false}'+'\n')
for i,(_,a) in enumerate(tf,1):parts.append(r'\textbf{T'+str(i)+'.} '+tex(a)+r'\par'+'\n')

for k in range(0,10,2):
    parts.append(r'\newpage\pagetitle{Solutions / Section C}{Worked solutions '+str(k+1)+'--'+str(k+2)+'}\n')
    for j in (k,k+1):
        title,_,answers=qs[j];parts.append(r'\qtitle{Q'+str(j+1)+'. '+tex(title)+'}\n')
        for a in answers:parts.append(tex(a)+r'\par'+'\n')
        if j==5:parts.append(r'''\begin{center}
\begin{tikzpicture}[level distance=12mm,level 1/.style={sibling distance=35mm},level 2/.style={sibling distance=18mm},every node/.style={circle,draw=ink,minimum size=7mm}]
\node {2} child {node {5} child {node {6}} child[missing]} child {node {9}};
\end{tikzpicture}\end{center}
''')
        parts.append(r'\vspace{12pt}'+'\n')
parts.append(r'\end{document}'+'\n')
out=root/'output/pdf/EazyGrades-COMP-352-Core-Exam-Practice.tex'
out.write_text(''.join(parts),encoding='utf-8')
print(out)
