const fs = require("fs");
const path = require("path");
const { mktouch } = require("../src/index");

const TEST_DIR = path.join(__dirname, "tmp");

function cleanup() {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true });
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(`\x1b[31m✖ FAIL\x1b[0m ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`\x1b[32m✔ PASS\x1b[0m ${message}`);
  }
}

cleanup();

// Test 1: Creates file with nested dirs
const file1 = path.join(TEST_DIR, "a/b/c/file.ts");
const r1 = mktouch(file1);
assert(fs.existsSync(file1), "Creates file in nested directories");
assert(r1.created === true, "Returns created: true for new file");

// Test 2: Updates existing file (no duplicate creation)
const r2 = mktouch(file1);
assert(fs.existsSync(file1), "File still exists after second touch");
assert(r2.created === false, "Returns created: false for existing file");

// Test 3: Multiple files in different paths
const file2 = path.join(TEST_DIR, "x/y/file2.ts");
const file3 = path.join(TEST_DIR, "x/y/file3.ts");
mktouch(file2);
mktouch(file3);
assert(fs.existsSync(file2), "Creates first file in shared directory");
assert(fs.existsSync(file3), "Creates second file in shared directory");

cleanup();
console.log("\nAll tests done!");