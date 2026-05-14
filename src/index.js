const fs = require("fs");
const path = require("path");

function mktouch(filePath) {
  const resolvedPath = path.resolve(filePath);
  const dir = path.dirname(resolvedPath);

  // Create directories if they don't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create or update file timestamp
  const now = new Date();
  if (fs.existsSync(resolvedPath)) {
    fs.utimesSync(resolvedPath, now, now);
    return { created: false, path: resolvedPath };
  } else {
    fs.writeFileSync(resolvedPath, "");
    return { created: true, path: resolvedPath };
  }
}

function run(args) {
  if (args.length === 0) {
    console.error("Usage: mktouch <file1> [file2] [file3] ...");
    console.error("Example: mktouch src/client/dto/create-client.dto.ts");
    process.exit(1);
  }

  let hasError = false;

  for (const filePath of args) {
    try {
      const result = mktouch(filePath);
      if (result.created) {
        console.log(`\x1b[32m✔\x1b[0m Created: ${filePath}`);
      } else {
        console.log(`\x1b[33m~\x1b[0m Updated: ${filePath}`);
      }
    } catch (err) {
      console.error(`\x1b[31m✖\x1b[0m Error: ${filePath} → ${err.message}`);
      hasError = true;
    }
  }

  if (hasError) process.exit(1);
}

module.exports = { mktouch, run };