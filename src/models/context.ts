import { Client } from "discord.js";
import * as RTE from "fp-ts/ReaderTaskEither";
import { Environment } from "./environment";
import { Errors } from "./errors";

export type Context = {
  client: Client;
  environment: Environment;
};

export type ContextTaskEither<R> = RTE.ReaderTaskEither<Context, Errors, R>;

export const contextTaskEitherFrom: <R>(r: R) => ContextTaskEither<R> = <R>(
  r: R
) => RTE.of(r);
