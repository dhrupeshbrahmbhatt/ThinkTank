const fs = require("fs");
const path = require("path");

// Folders or files to ignore
const ignore = [
  "node_modules",
  ".git",
  "dist",
  "build",
  ".next",
  "out",
  "coverage",
  ".DS_Store",
  "package-lock.json",
  "yarn.lock"
];

function printTree(dir, prefix = "") {
  const files = fs.readdirSync(dir);
  let tree = "";

  for (const file of files) {
    if (ignore.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    tree += prefix + "├── " + file + "\n";

    if (stat.isDirectory()) {
      tree += printTree(filePath, prefix + "│   ");
    }
  }
  return tree;
}

// Start from ThinkTank folder
const projectName = "ThinkTank";
const treeOutput = projectName + "/\n" + printTree(".");

console.log(treeOutput);

// Save to structure.txt
fs.writeFileSync("structure.txt", treeOutput, "utf-8");
console.log("\n✅ Project structure (with files) saved to structure.txt");
