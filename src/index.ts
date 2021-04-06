import Discord from "discord.js";
import * as IOE from "fp-ts/IOEither";
import { constVoid, flow } from "fp-ts/lib/function";
import { pipe } from "fp-ts/lib/pipeable";
import { Context } from "./models/context";
import { hookExecutor } from "./services/hook-executor";
import { MessageHooks } from "./hooks/message";
import { Environment, EnvironmentC } from "./models/environment";
import { error, log } from "fp-ts/lib/Console";

const init = (environment: Environment) => () => {
  const client = new Discord.Client();
  const context: Context = { client, environment };
  const executeHooks = hookExecutor(context);

  client.on("message", executeHooks(MessageHooks(context)));

  client.login(environment.DISCORD_TOKEN);
};

pipe(
  process.env,
  EnvironmentC.decode,
  IOE.fromEither,
  IOE.chain(flow(init, IOE.fromIO)),
  IOE.fold(error, () => constVoid)
)();
