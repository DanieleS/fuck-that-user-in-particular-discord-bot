import * as t from "io-ts";

export const EnvironmentC = t.type(
  {
    DISCORD_TOKEN: t.string,
    COMMAND_PREFIX: t.string,
    TARGET_ID: t.string,
    TARGET_NAME: t.string,
  },
  "Environment"
);

export type Environment = t.TypeOf<typeof EnvironmentC>;
