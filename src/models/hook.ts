import * as RT from "fp-ts/ReaderTask";
import { Context, ContextTaskEither } from "./context";

type OnChange<Params extends unknown[], T> = (...args: Params) => T;

export type Trigger<Params extends unknown[]> = OnChange<
  Params,
  RT.ReaderTask<Context, boolean>
>;
export type Handler<Params extends unknown[]> = OnChange<
  Params,
  ContextTaskEither<void>
>;

export type Hook<Params extends unknown[]> = {
  trigger: Trigger<Params>;
  handler: Handler<Params>;
};
