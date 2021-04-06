import { Message } from "discord.js";
import { Hook, Trigger as HookTrigger, Handler as HookHandler } from "./hook";

type MessageParams = [message: Message];

export type Trigger = HookTrigger<MessageParams>;
export type Handler = HookHandler<MessageParams>;
export type MessageHook = Hook<MessageParams>;
