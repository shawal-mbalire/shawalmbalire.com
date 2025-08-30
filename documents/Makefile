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
SRC = MbalireShawalCV.tex
ENGINE = lualatex -interaction=nonstopmode -halt-on-error

.PHONY: short long build both clean distclean show

build:
	@echo "Building $(JOBNAME).pdf (mode=$(MODE)) in $(PWD)"
	$(ENGINE) -jobname=$(JOBNAME) "\def\cvmode{$(MODE)} \input{$(SRC)}" > /dev/null

short: MODE=short
short: build

long: MODE=long
long: build

both: short long

show:
	@echo "Source: $(SRC)"
	@echo "Mode:   $(MODE)"
	@echo "PDF:    $(JOBNAME).pdf"

clean:
	rm -f $(JOBNAME).pdf *.aux *.log *.out *.fdb_latexmk *.fls *.synctex* MbalireShawalCV_short.* MbalireShawalCV_long.*

distclean: clean
	rm -f MbalireShawalCV.tex.bak
