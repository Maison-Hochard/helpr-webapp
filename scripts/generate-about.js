// • client.hostindicatestheIPaddressoftheclientperformingtheHTTPrequest
// • server.current_timeindicatestheservertimeintheEpochUnixTimeStampformat • server.servicesindicatesthelistofservicessupportedbytheserver
// • server.services[].nameindicatesthenameoftheservice
// • server.services[].actionsindicatesthelistofActionssupportedbythisservice
// • server.services[].actions[].nameindicatestheidentifierofthisAction
// • server.services[].actions[].descriptionindicatesthedescriptionofthisAction
// • server.services[].reactionsindicatesthelistofREActionssupportedbythisservice • server.services[].actions[].nameindicatestheidentifierofthisREAction
// • server.services[].actions[].descriptionindicatesthedescriptionofthisREAction

import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const prisma = new PrismaClient();

async function writeJSONFile(filename, content) {
  const jsonContent = JSON.stringify(content);
  await fs.writeFile(filename, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

async function runScript() {
  const providers = await prisma.provider.findMany({
    include: {
      Trigger: true,
      Action: true,
    },
  });
  const formattedProviders = providers.map((provider) => {
    return {
      name: provider.name,
      description: provider.description,
      actions: provider.Action.map((action) => {
        return {
          name: action.name,
          description: action.description,
        };
      }),
      reactions: provider.Trigger.map((trigger) => {
        return {
          name: trigger.name,
          description: trigger.description,
        };
      }),
    };
  });
  const about = {
    client: {
      host: await fetch("https://api.ipify.org?format=json").then((res) => res.json().then((json) => json.ip)),
    },
    server: {
      current_time: Date.now(),
      services: formattedProviders,
    },
  };
  await writeJSONFile("about.json", about);
  return about;
}

runScript()
  .then((about) => console.log("Script finished", about))
  .catch((e) => console.error("Script failed", e));
