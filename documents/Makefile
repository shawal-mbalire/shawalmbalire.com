## Unified CV Makefile (all artifacts stay inside this documents/ directory)
# Usage examples (from repo root):
#   make -C documents short
#   make -C documents long
#   make -C documents both
# Variables:
#   MODE=short|long (default short)
# Output PDF is always ShawalMbalireCV.pdf here.

MODE ?= short
JOBNAME = ShawalMbalireCV
SRC = ShawalMbalireCV.tex
ENGINE = lualatex -interaction=nonstopmode -halt-on-error
SHORT_PDF = $(JOBNAME)_short.pdf
LONG_PDF  = $(JOBNAME)_long.pdf

.PHONY: short long build both clean distclean show

build:
	@echo "Building $(JOBNAME) ($(MODE)) in $(PWD)"
	$(ENGINE) -jobname=$(JOBNAME)_$(MODE) "\def\cvmode{$(MODE)} \input{$(SRC)}" > /dev/null

short: MODE=short
short: build
short: post

long: MODE=long
long: build
long: post

both: short long
	@echo "Built: $(SHORT_PDF) and $(LONG_PDF)"

# quick view target for macOS (open the long version by default)
view: long
	open $(LONG_PDF)

# simple syntax check without producing PDFs (parses both modes)
lint:
	@echo "Syntax checking both modes"
	$(ENGINE) -jobname=tmp_short "\def\cvmode{short} \input{$(SRC)}" >/dev/null || true
	$(ENGINE) -jobname=tmp_long  "\def\cvmode{long}  \input{$(SRC)}" >/dev/null || true
	rm -f tmp_short.* tmp_long.*

post:
	@# placeholder for future post-processing (e.g., compression)

show:
	@echo "Source: $(SRC)"
	@echo "Mode:   $(MODE)"
	@echo "PDF:    $(JOBNAME).pdf"

clean:
	rm -f $(JOBNAME).pdf $(SHORT_PDF) $(LONG_PDF) *.aux *.log *.out *.fdb_latexmk *.fls *.synctex* $(JOBNAME)_short.* $(JOBNAME)_long.*

distclean: clean
	rm -f MbalireShawalCV.tex.bak
