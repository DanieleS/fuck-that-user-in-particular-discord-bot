import { Command, Execute } from "../../../models/command";
import * as RTE from "fp-ts/ReaderTaskEither";
import { pipe } from "fp-ts/lib/pipeable";
import { Context } from "../../../models/context";
import { constVoid } from "fp-ts/lib/function";
import { capitalizeWords } from "../../../utils/strings";

const execute: Execute = (message) =>
  pipe(
    RTE.ask<Context>(),
    RTE.chain((context) =>
      RTE.fromTask(async () => {
        const member = message.guild?.member(context.environment.TARGET_ID);

        return member?.voice.setChannel(null);
      })
    ),
    RTE.map(constVoid)
  );

export const KickTarget: Command = (ctx) => ({
  command: `kick-${ctx.environment.TARGET_NAME}`,
  description: `Kicka ${capitalizeWords(
    ctx.environment.TARGET_NAME.toLocaleLowerCase()
  )} dal canale vocale`,
  execute,
});
