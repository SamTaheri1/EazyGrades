from pathlib import Path
import re
p=Path('output/pdf/EazyGrades-COMP-352-Core-Exam-Practice.tex')
s=p.read_text(encoding='utf-8')
s=s.replace(r'\newcommand{\qtitle}[1]{{',r'\newcommand{\qtitle}[1]{\par\noindent{')
s=s.replace('10 structured questions','10 long answer questions').replace('Worked solutions included','Answer key included').replace('Structured questions:','Long answer questions:')
s=s.replace('No negative marking in this practice set.\n',r'No negative marking in this practice set.\par'+'\n')
changes={
 r'$5n^{2}$ + 3n + 8':r'$5n^{2}+3n+8$',
 'T(1) = 1 and T(n) = 2T(n/2) + n':r'$T(1)=1$ and $T(n)=2T\!\left(\frac{n}{2}\right)+n$',
 'mid = floor((lo + hi)/2)':r'$\mathit{mid}=\left\lfloor\frac{\mathit{lo}+\mathit{hi}}{2}\right\rfloor$',
 '[lo, mid-1]':r'$[\mathit{lo},\mathit{mid}-1]$',
 '[mid+1, hi]':r'$[\mathit{mid}+1,\mathit{hi}]$',
 '3n + 7 in':r'$3n+7$ in',
 r'n $\log_2 n$, $2^{n}$, $\log_2 n$, $n^{2}$, n':r'$n\log_2 n$, $2^n$, $\log_2 n$, $n^2$, $n$',
 'h(k) = k mod 7':r'$h(k)=k\bmod 7$',
 '10 mod 7 = 3 and 17 mod 7 = 3':r'$10\bmod 7=3$ and $17\bmod 7=3$',
 'front = 3 and size = 3':r'$\mathit{front}=3$ and $\mathit{size}=3$',
 'front = 4, size = 2':r'$\mathit{front}=4$, $\mathit{size}=2$',
 'front = 4, size = 4':r'$\mathit{front}=4$, $\mathit{size}=4$',
 '(4+2) mod 5 = 1':r'$(4+2)\bmod 5=1$',
 '(4+3) mod 5 = 2':r'$(4+3)\bmod 5=2$',
 '0..4 = [C, D, E, unused, B]':r'$0,\ldots,4$ contain $[C,D,E,\text{unused},B]$',
 '1 + 2 + ... + n = 2n - 1':r'$1+2+\cdots+n=2n-1$',
 r'$\log_2 n$ + 1':r'$\log_2 n+1$',
 r'$\log_2 n$, n, n $\log_2 n$, $n^{2}$, $2^{n}$':r'$\log_2 n$, $n$, $n\log_2 n$, $n^2$, $2^n$',
 r'n $\geq$ 1, 3n + 7 $\leq$ $10n^{2}$':r'$n\geq 1$, $3n+7\leq 10n^2$',
 r'(3n + 7)/$n^{2}$':r'$\frac{3n+7}{n^2}$',
 r'T(n) = n $\log_2 n$ + n = $\Theta(n\,\log\,n)$':r'$T(n)=n\log_2 n+n=\Theta(n\log n)$',
 'lo > hi':r'$\mathit{lo}>\mathit{hi}$',
 '1 + 2 + 4 + ...':r'$1+2+4+\cdots$',
 'less than 2n':r'less than $2n$',
 'h = 2':r'$h=2$',
 'i > 0':r'$i>0$',
 'floor((i-1)/2)':r'$\left\lfloor\frac{i-1}{2}\right\rfloor$',
 r'parent $\leq$ child':r'$\mathit{parent}\leq\mathit{child}$',
 r'5 $\leq$ 6':r'$5\leq 6$',
 r'2 $\leq$ 5':r'$2\leq 5$',
 r'2 $\leq$ 9':r'$2\leq 9$',
 '4/7':r'$\frac{4}{7}$',
 '2i+1':r'$2i+1$',
 '2i+2':r'$2i+2$',
 r'\enspace 2i &':r'\enspace $2i$ &',
 'i/2':r'$\frac{i}{2}$',
 'height n-1':r'height $n-1$',
 'prev = null':r'$\mathit{prev}=\mathrm{null}$',
 'curr = head':r'$\mathit{curr}=\mathit{head}$',
 'curr != null':r'$\mathit{curr}\ne\mathrm{null}$',
 'next = curr.next':r'$\mathit{next}=\mathit{curr}.\mathit{next}$',
 'curr.next = prev':r'$\mathit{curr}.\mathit{next}=\mathit{prev}$',
 'prev = curr':r'$\mathit{prev}=\mathit{curr}$',
 'curr = next':r'$\mathit{curr}=\mathit{next}$',
 'tail.prev':r'$\mathit{tail}.\mathit{prev}$',
 'tail.next':r'$\mathit{tail}.\mathit{next}$',
 r'B$\leftarrow$A, C$\leftarrow$A, D$\leftarrow$B, E$\leftarrow$D':r'$B\leftarrow A$, $C\leftarrow A$, $D\leftarrow B$, $E\leftarrow D$',
 'A-B-D-E':r'$A\to B\to D\to E$',
 'A-C-D-E':r'$A\to C\to D\to E$',
}
for a,b in changes.items():
 if a not in s:print('Not found:',a)
 s=s.replace(a,b)
# Treat the pseudocode as one coherent mathematical expression per instruction.
a=s.index(r'\begin{quote}\small\ttfamily')
b=s.index(r'\end{quote}',a)+len(r'\end{quote}')
s=s[:a]+r'''\begin{quote}\small
$i\gets 1$\\
\textbf{while} $i\leq n$:\\
\hspace*{1em}\textbf{for} $j\gets 1$ \textbf{to} $i$:\\
\hspace*{2em}$\operatorname{work}()$\\
\hspace*{1em}$i\gets 2i$
\end{quote}'''+s[b:]

# Format remaining prose-level variables, arrays, pairs and function calls,
# leaving existing math blocks and the preamble unchanged.
pre,body=s.split(r'\begin{document}',1)
chunks=re.split(r'(\$[^$]*\$)',body)
for i in range(0,len(chunks),2):
 t=chunks[i]
 t=re.sub(r'\[(?:\d+,\s*)*\d+\]',lambda m:'$'+m[0]+'$',t)
 t=re.sub(r'\(\d+,\d+\)',lambda m:'$'+m[0]+'$',t)
 t=re.sub(r'\b(work|push|pop)\((\d*)\)',lambda m:r'$\operatorname{'+m[1]+'}('+m[2]+')$',t)
 t=re.sub(r'\b(n|i|j|mid|lo|hi|front|size|head|tail|prev|curr|next|null)\b',lambda m:('$'+m[1]+'$') if len(m[1])==1 else (r'$\mathit{'+m[1]+'}$') if m[1]!='null' else r'$\mathrm{null}$',t)
 # Restore ordinary English words which happen to share identifier names.
 for old,new in [(r'\mathit{next} task','next task'),(r'\mathit{next} interval','next interval')]:
  t=t.replace('$'+old.split('}')[0]+'}$'+old.split('}')[1],new)
 chunks[i]=t
s=pre+r'\begin{document}'+''.join(chunks)
# Make graph symbols and traversal sequences readable as mathematical lists.
graph={
 'vertices A, B, C, D, E, F and edges AB, AC, BD, CD, DE':r'vertices $A,B,C,D,E,F$ and edges $AB,AC,BD,CD,DE$',
 'A: B,C; B: A,D; C: A,D; D: B,C,E; E: D; F: empty':r'$A: B,C$; $B: A,D$; $C: A,D$; $D: B,C,E$; $E: D$; $F: \varnothing$',
 'A,B,C,D,E':r'$A,B,C,D,E$',
 'A,B,D,C,E':r'$A,B,D,C,E$',
 '0,1,1,2,3':r'$0,1,1,2,3$',
}
# Restrict replacements to prose outside math blocks.
chunks=re.split(r'(\$[^$]*\$)',s)
for i in range(0,len(chunks),2):
 for a,b in graph.items():chunks[i]=chunks[i].replace(a,b)
 # Vertex and queue-item labels in prose (not option labels or LaTeX parameters).
 chunks[i]=re.sub(r'(?<![\w{])([A-F])(?= is | at | goes | reachable| gives | and |,|;| to |\.)',r'$\1$',chunks[i])
 chunks[i]=re.sub(r'(?<=from )([A-F])\b',r'$\1$',chunks[i])
 chunks[i]=re.sub(r'(?<=Removing )([A-F])\b',r'$\1$',chunks[i])
s=''.join(chunks)
# Ordinary prose should remain ordinary prose, rather than styled as identifiers.
s=s.replace(r'$\mathit{next}$ task','next task').replace(r'$\mathit{next}$ interval','next interval')
s=s.replace(r'of $\mathit{size}$','of size').replace(r'interval $\mathit{size}$','interval size').replace(r'has capacity','has capacity')
p.write_text(s,encoding='utf-8')
print('Updated LaTeX expressions and cover layout.')
