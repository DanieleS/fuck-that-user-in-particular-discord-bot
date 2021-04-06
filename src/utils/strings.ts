import { pipe } from "fp-ts/lib/pipeable";
import * as A from "fp-ts/Array";

export function capitalizeWords(phrase: string): string {
  return pipe(
    phrase.split(" "),
    A.map((word) => word.replace(/^[a-z]/, (letter) => letter.toUpperCase())),
    (words) => words.join(" ")
  );
}
