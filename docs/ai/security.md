# AI security & privacy guidance

Short policy for agents and AI-assisted work in this repository.

- Do not include secrets, API keys, or private credentials in prompts or attachments.
- Redact or replace secrets with placeholders before storing logs (e.g. `REDACTED_TOKEN`).
- Agents must not be given access to production credentials or databases.
- If a fix requires credentials or sensitive data, stop and request a human to run the verification steps locally.
- Keep an audit log for AI runs under `docs/ai/examples/` and redact secrets before committing logs.
