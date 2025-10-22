import { readdirSync } from "fs";
import path from "path";
import Handlebars from "handlebars";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

Handlebars.registerHelper("lower", (value) => {
  return value.charAt(0).toLowerCase() + value.slice(1);
});

const getDirectories = (source) => {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export default async function (plop) {
  plop.setGenerator("use case", {
    description: "Create new use case",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the use case?",
      },

      {
        type: "list",
        name: "module",
        message: "In which directory will the use case be created?",
        choices: getDirectories(path.resolve(__dirname, "../src/modules")),
      },
    ],

    actions: () => {
      const actions = [
        {
          type: "add",
          path: "../src/modules/{{module}}/useCases/{{name}}/{{name}}Factory.ts",
          templateFile: "./templates/useCaseFactory.ts.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "../src/modules/{{module}}/useCases/{{name}}/{{name}}.ts",
          templateFile: "./templates/useCase.ts.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "../src/modules/{{module}}/useCases/{{name}}/{{name}}Validator.ts",
          templateFile: "./templates/useCaseValidator.ts.hbs",
          abortOnFail: true,
        },
        {
          type: "add",
          path: "../src/modules/{{module}}/useCases/{{name}}/{{name}}Controller.ts",
          templateFile: "./templates/useCaseController.ts.hbs",
          abortOnFail: true,
        },
      ];

      return actions;
    },
  });
}
