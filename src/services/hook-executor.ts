import { Hook } from "../models/hook";
import * as RT from "fp-ts/ReaderTask";
import * as RTE from "fp-ts/ReaderTaskEither";
import * as RA from "fp-ts/ReadonlyArray";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { Context } from "../models/context";

export function hookExecutor(
  context: Context
): <Params extends [...unknown[]]>(
  hooks: Hook<Params>[]
) => (...params: Params) => void {
  return (hooks) => (...params) =>
    pipe(
      hooks,
      RT.traverseArray((hook) =>
        pipe(
          hook.trigger(...params),
          RT.map((shouldExecute) => ({
            shouldExecute,
            hook,
          }))
        )
      ),
      RT.map(RA.filter((result) => result.shouldExecute)),
      RT.map(E.right),
      RTE.chain(RTE.traverseArray((hook) => hook.hook.handler(...params))),
      RTE.fold(
        (error) => RT.fromIO(() => console.log(error)),
        () => RT.of(void 0)
      )
    )(context)();
}
