# Clean CV Build System

# Default target builds the CV
all: MbalireShawalCV.pdf

MbalireShawalCV.pdf: MbalireShawalCV.tex
	pdflatex -interaction=nonstopmode -halt-on-error MbalireShawalCV.tex

clean:
	rm -f *.aux *.log *.out *.fdb_latexmk *.fls *.synctex.gz

clean-all: clean
	rm -f MbalireShawalCV.pdf

.PHONY: all clean clean-all