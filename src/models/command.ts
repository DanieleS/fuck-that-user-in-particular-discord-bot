import { Message } from "discord.js";
import { Context, ContextTaskEither } from "./context";
import * as O from "fp-ts/Ord";
import * as R from "fp-ts/Reader";

export type Execute = (message: Message) => ContextTaskEither<void>;

export type Command = R.Reader<
  Context,
  {
    command: string;
    description: string;
    execute: Execute;
  }
>;

export const commandOrd = (context: Context) =>
  O.contramap((command: Command) => command(context).command)(O.ordString);
