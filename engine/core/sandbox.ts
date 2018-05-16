import { Character } from "../data/character";
import { AVGScriptUnit } from "../scripting/script-unit";
import { Dialogue } from "../data/dialogue";
import { APIDialogue } from "../scripting/api/api-dialogue";
import { api } from "../scripting/api";
import { Runtime } from "../data/runtime";

export class Sandbox {
    public done: () => void;
    public console = console;
    public api = (global["api"] = api);

    public static runtime: Runtime;
}
