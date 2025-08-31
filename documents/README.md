# Shawal Mbalire Curriculum Vitae (LaTeX + Lua data pipeline)

This directory contains a data‑driven CV build system:

- `ShawalMbalireCV.tex` – master source (short / long variants via `\cvmode`).
- `parts/` – expl3 type definitions (`types.tex`) and hand-authored section fragments (education, publications, etc.).
- `lua/` – Lua helpers (minimal JSON parser + escaping) used with LuaLaTeX.
- `assets/data/*.json` – structured data for personal info, experiences, and projects consumed by Lua emitters.
- `Makefile` – convenience targets to build short and long PDFs (`make short`, `make long`, `make both`). Outputs are suffixed with `_short` / `_long`.

## Quick Start

From repository root:

```fish
make -C documents short   # builds ShawalMbalireCV_short.pdf
make -C documents long    # builds ShawalMbalireCV_long.pdf
make -C documents both    # builds both variants
open documents/ShawalMbalireCV_long.pdf
```

## Data Editing

Update JSON under `assets/data/` then rebuild. The Lua code regenerates sections (Experience, Projects, Skills) automatically.

Fields with arrays (e.g. achievements) join entries into bullet lists. To add new experience entries, append to `experiences.json`.

## Adding New Structured Types

1. Define keys & render macro in `parts/types.tex` (see existing patterns).
2. Extend the Lua emitter in `ShawalMbalireCV.tex` inside the `luacode` block or a new Lua file.
3. Reference the emitter in the document body for the desired mode(s).

## Maintenance Notes

- The custom JSON parser is intentionally tiny; if complexity grows, consider switching to `lua-cjson` (requires TeX Live package availability) or pre-generating `.tex` snippets.
- Escaping attempts to preserve hyperlinks by converting them to `\href{url}{url}`.
- Duplicate manual experience block was removed (now only structured entries remain).

## License

Content (CV text) © 2025 Shawal Mbalire. Source formatting logic under an MIT-style permissive intent (add explicit LICENSE if distributing).
