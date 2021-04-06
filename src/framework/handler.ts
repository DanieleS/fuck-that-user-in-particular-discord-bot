import { Client, ClientEvents } from "discord.js";
import { HKT, HKT2, HKT3, URIS, URIS2, URIS3 } from "fp-ts/HKT";
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative3,
} from "fp-ts/lib/Applicative";
import { constVoid } from "fp-ts/lib/function";

export function addHandler<
  Event extends keyof ClientEvents,
  URI extends URIS3,
  A,
  B
>(
  ap: Applicative3<URI>
): (
  event: Event,
  handler: (...args: ClientEvents[Event]) => void
) => (client: Client) => HKT3<URI, A, B, void>;
export function addHandler<
  Event extends keyof ClientEvents,
  URI extends URIS2,
  A
>(
  ap: Applicative2<URI>
): (
  event: Event,
  handler: (...args: ClientEvents[Event]) => void
) => (client: Client) => HKT2<URI, A, void>;
export function addHandler<
  Event extends keyof ClientEvents,
  URI extends URIS,
  A,
  B
>(
  ap: Applicative1<URI>
): (
  event: Event,
  handler: (...args: ClientEvents[Event]) => void
) => (client: Client) => HKT<URI, void>;
export function addHandler<
  Event extends keyof ClientEvents,
  URI extends URIS,
  A,
  B
>(
  ap: Applicative<URI>
): (
  event: Event,
  handler: (...args: ClientEvents[Event]) => void
) => (client: Client) => HKT<URI, void> {
  return (event, handler) => (client) => {
    client.on(event, handler);

    const v = constVoid();

    return ap.of(v);
  };
}
