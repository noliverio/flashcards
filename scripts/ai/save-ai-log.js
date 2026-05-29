#!/usr/bin/env node
import { execSync } from "child_process";
/**
 * Save AI run artifacts into docs/ai/example-<issue>-ai-log.md
 *
 * Usage:
 *   node scripts/ai/save-ai-log.js --issue 123 --title "Select card by id" \
 *     --prompt-file prompt.md --transcript-file transcript.txt --diff-file patch.diff \
 *     --files-changed-file files.txt --commit $(git rev-parse --short HEAD)
 */
import fs from "fs";
import path from "path";

function usage() {
  console.log(
    "Usage: save-ai-log.js --issue <id> [--title <title>] [--prompt-file <path>] [--transcript-file <path>] [--diff-file <path>] [--files-changed-file <path>] [--commit <sha>] [--outdir <dir>] [--force]",
  );
}

function getArg(name) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

const issue = getArg("--issue");
if (!issue) {
  usage();
  process.exit(1);
}
const title = getArg("--title") || "";
const promptFile = getArg("--prompt-file");
const transcriptFile = getArg("--transcript-file");
const diffFile = getArg("--diff-file");
const filesChangedFile = getArg("--files-changed-file");
let commit = getArg("--commit");
const outdir = getArg("--outdir") || "docs/ai";
const force = process.argv.includes("--force");

function readMaybe(filePath) {
  if (!filePath) return "";
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    console.warn(`Warning: cannot read ${filePath}: ${e.message}`);
    return "";
  }
}

const promptContent = readMaybe(promptFile);
const transcriptContent = readMaybe(transcriptFile);
const diffContent = readMaybe(diffFile);
const filesChangedContent = readMaybe(filesChangedFile);

// Auto-detect commit if not provided
if (!commit) {
  try {
    commit = execSync("git rev-parse --short HEAD").toString().trim();
  } catch (e) {
    commit = "";
  }
}

const now = new Date().toISOString();
const outFileName = `example-${issue}-ai-log.md`;
const outPath = path.join(outdir, outFileName);

if (fs.existsSync(outPath) && !force) {
  const bak = `${outPath}.${Date.now()}.bak`;
  console.log(`${outPath} exists — creating backup ${bak}`);
  fs.copyFileSync(outPath, bak);
}

let filesList = "";
if (filesChangedContent) {
  const lines = filesChangedContent.split(/\r?\n/).filter(Boolean);
  filesList = lines.map((l) => `- ${l}`).join("\n");
}

const md = [];
md.push(`# AI run log — ${title || issue}`);
md.push("");
md.push(`- **Issue / task**: ${issue}`);
if (commit) md.push(`- **Commit SHA**: ${commit}`);
md.push(`- **Recorded at**: ${now}`);
md.push("");
if (promptContent) {
  md.push("## Original prompt");
  md.push("");
  md.push("```");
  md.push(promptContent.trim());
  md.push("```");
  md.push("");
}

if (transcriptContent) {
  md.push("## Agent transcript");
  md.push("");
  md.push("```");
  md.push(transcriptContent.trim());
  md.push("```");
  md.push("");
}

if (filesList) {
  md.push("## Files changed (reported)");
  md.push("");
  md.push(filesList);
  md.push("");
}

if (diffContent) {
  md.push("## Unified diff");
  md.push("");
  md.push("```diff");
  md.push(diffContent.trim());
  md.push("```");
  md.push("");
}

md.push("## Human review notes");
md.push("");
md.push("- Reviewed by:");
md.push("- Approved:");
md.push("");

fs.mkdirSync(outdir, { recursive: true });
fs.writeFileSync(outPath, md.join("\n"), "utf8");
console.log(`Wrote AI run log to ${outPath}`);
