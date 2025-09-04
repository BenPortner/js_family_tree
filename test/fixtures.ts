import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import { FamilyTreeData } from "../src/familyTreeData";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to remove comments from JSON content
function removeComments(content: string): string {
  return content
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments
}

let fixtureFile = join(__dirname, "../data/data_simple.js");
let fileContent = readFileSync(fixtureFile, "utf-8").replace("data = ", "");
export const SimpleFamilyTree: FamilyTreeData = JSON.parse(fileContent);

fixtureFile = join(__dirname, "../data/data_GoT.js");
fileContent = readFileSync(fixtureFile, "utf-8").replace("data = ", "");
fileContent = removeComments(fileContent);
export const GoTFamilyTree: FamilyTreeData = JSON.parse(fileContent);

fixtureFile = join(__dirname, "../data/data_circle.js");
fileContent = readFileSync(fixtureFile, "utf-8").replace("data = ", "");
export const CircleFamilyTree: FamilyTreeData = JSON.parse(fileContent);