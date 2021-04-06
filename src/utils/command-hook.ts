import { Message } from "discord.js";
import { constant, constFalse, constVoid, flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import * as RT from "fp-ts/ReaderTask";
import * as RTE from "fp-ts/ReaderTaskEither";
import { Command } from "../models/command";
import { Context } from "../models/context";
import { MessageHook } from "../models/message-hook";

const commandFromMessage = (message: Message) =>
  pipe(
    RTE.Do,
    RTE.bind("context", () => RTE.ask<Context>()),
    RTE.bind("maybeCommand", () => RTE.of(message.content.split(" ")[0])),
    RTE.bind("command", ({ maybeCommand, context: { environment } }) =>
      RTE.fromPredicate(
        (message: string) => message.startsWith(environment.COMMAND_PREFIX),
        () => "The message is not a command"
      )(maybeCommand)
    ),
    RTE.map(({ command, context: { environment } }) =>
      command.replace(environment.COMMAND_PREFIX!, "")
    )
  );

export function createCommand(
  context: Context
): (command: Command) => MessageHook {
  return (command) => {
    const cmd = command(context);
    return {
      trigger: (message) =>
        pipe(
          message,
          RTE.fromPredicate(
            (message) => !message.author.bot,
            constant("Message from a bot, no action executed")
          ),
          RTE.chain(commandFromMessage),
          RTE.chain((c) =>
            RTE.fromPredicate(
              (parsedCommand) => parsedCommand === cmd.command,
              constant("Not this command")
            )(c)
          ),
          RTE.fold(
            () => RT.of(false),
            () => RT.of(true)
          )
        ),
      handler: cmd.execute,
    };
  };
}
