# PDF authoring

Author and revise practice PDFs in LaTeX. The `.tex` file is the editable source; compile it to update the PDF. Use mathematical superscripts, bold and clearly separated multiple-choice labels, concise introductory copy, and space for written or drawn answers.

For COMP 352, edit `VistaGrades-COMP-352-Core-Exam-Practice.tex` in this folder. The earlier Python/ReportLab generator in `tmp/pdfs/expand_comp352.py` is a legacy version and should not be run over the revised PDF.

Compile with a LaTeX engine supporting fontspec (XeLaTeX, LuaLaTeX, or Tectonic). From the website project directory, the portable compiler used for this revision can be run in PowerShell with:

```powershell
$env:LOCALAPPDATA = "$PWD/tmp/latex-tools/cache"
./tmp/latex-tools/tectonic.exe -o output/pdf output/pdf/VistaGrades-COMP-352-Core-Exam-Practice.tex
```

Compiler and cache files under `tmp/latex-tools` are local build dependencies. Keep PDFs in this private output folder unless website publication is requested.

Private LaTeX sources and legacy exam-generation scripts are retained only in the local workspace and ignored by Git. Obtain them through private storage when setting up a new checkout.
