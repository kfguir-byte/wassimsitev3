# 3-Layer Architecture Project

This project implements the 3-Layer Architecture as defined, pushing deterministic execution logic to Python scripts and keeping directives in readable Markdown.

## Structure

- **`directives/`** - Markdown-based SOPs defining the goals, inputs, tools to use, outputs, and edge cases. Treat these as instructions for your AI orchestration layer.
- **`execution/`** - Deterministic Python scripts. These scripts perform actual web requests, API calls, file parsing, and Google service interactions.
- **`.tmp/`** - Directory for all intermediate files, scraped data, and temporary outputs. Do not commit anything generated here.

## Setup Instructions

1. **Environment Variables**: Open `.env` and configure your API keys.
2. **Google Services**: Place `credentials.json` (and `token.json` once authenticated) inside the root directory. They are already ignored by git.
3. **Dependencies**: Make sure you have python installed and run `pip install -r requirements.txt`.

## Workflow
1. Read/draft directives based on user request.
2. Select or create Python tools inside `execution/` to fulfill the directive reliably.
3. Handle outputs (saving to `.tmp` or delivering via a Google Sheet/Doc).
4. Update the directive via self-annealing if execution errors expose a missing edge case.
