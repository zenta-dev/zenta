import * as fs from "fs";
import * as path from "path";

const uiDir = path.resolve(__dirname, "..", "packages", "ui");

console.log(uiDir);

// read all filenames in src/components/ui directory then upsert them to src/components/ui/index.ts
const uiComponentsDir = path.resolve(uiDir, "src", "components", "ui");
const uiComponentsIndex = path.resolve(uiComponentsDir, "index.ts");

fs.unlinkSync(uiComponentsIndex);

const uiComponentFiles = fs.readdirSync(uiComponentsDir);

const uiComponentExports = uiComponentFiles.map((file) => {
  const componentName = file.replace(/\.tsx$/, "");
  return `export * from "./${componentName}";`;
});

fs.writeFileSync(uiComponentsIndex, uiComponentExports.join("\n"));

// read all filenames in src directory then upsert them to src/index.ts

// read all filenames in src/hooks directory then upsert them to src/components/index.ts
const componentsDir = path.resolve(uiDir, "src", "components");
const componentsIndex = path.resolve(componentsDir, "index.ts");

fs.unlinkSync(componentsIndex);

const componentFiles = fs.readdirSync(componentsDir);

const componentsExports = componentFiles.map((file) => {
  const componentName = file.replace(/\.tsx$/, "");
  return `export * from "./${componentName}";`;
});

fs.writeFileSync(componentsIndex, componentsExports.join("\n"));
