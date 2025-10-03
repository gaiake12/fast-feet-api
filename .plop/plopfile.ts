import { readdirSync } from "fs";
import path from "path";
import type { ActionType, NodePlopAPI } from "plop";

const getDirectories = () => {
  const defaultPath = path.resolve(__dirname, "../src/modules");
  return readdirSync(defaultPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
};

export default async function (plop: NodePlopAPI) {
  plop.setGenerator("use case", {
    description: "Create new use case",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the use case?",
      },
      {
        type: "checkbox",
        name: "repositories",
        message: "What repositories will be used in the use case?",
        choices: [
          "UsersRepository",
          "RecipientsRepository",
          "OrdersRepository",
        ],
      },
      {
        type: "list",
        name: "directory",
        message: "In which directory will the use case be created?",
        choices: getDirectories(),
      },
    ],
  });
}
