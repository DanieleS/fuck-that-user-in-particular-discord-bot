import { Command, Execute } from "../../../models/command";
import * as RTE from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/lib/pipeable";
import { Commands } from ".";
import { Context } from "../../../models/context";
import * as R from "fp-ts/Reader";

const execute: Execute = (message) =>
  pipe(
    RTE.Do,
    RTE.bind("context", () => RTE.ask<Context>()),
    RTE.chain(({ context }) =>
      RTE.fromTask(async () => {
        await message.channel.send(`Questo bot supporta i comandi seguenti:
${Commands.map((command) => {
  const cmd = command(context);
  return `- \`${process.env.COMMAND_PREFIX}${cmd.command}\` ${cmd.description}`;
}).join("\n")}
      `);
      })
    )
  );

export const Help: Command = R.of({
  command: "help",
  description: "Questo comando 😄",
  execute,
});
