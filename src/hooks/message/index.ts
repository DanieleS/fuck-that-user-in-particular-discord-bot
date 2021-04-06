import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";
import { Commands } from "./commands";
import { createCommand } from "../../utils/command-hook";
import { Context } from "../../models/context";

export const MessageHooks = (context: Context) =>
  pipe(Commands, A.map(createCommand(context)));
