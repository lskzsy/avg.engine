import * as vm from "vm";
import * as fs from "fs";
import { AVGScriptUnit } from "../scripting/script-unit";
import { Sandbox } from "../core/sandbox";
import { Transpiler } from "../scripting/transpiler";

export class AVGStory {
    private static sanbox: Sandbox = new Sandbox();

    private _scriptUnits: Array<AVGScriptUnit> = [];
    private _cursor: number = 0;
    private _code: string;
    private _compiled: string;
    private _scriptFile: string;

    constructor() { }

    public async loadFromFile(filename: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, "utf8", (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.loadFromString(data);

                resolve();
            });
        });
    }

    public loadFromString(code: string) {
        this._code = code;
        this.compile();
    }

    private compile() {
        this._compiled = Transpiler.transpileFromCode(this._code);
    }

    public async run() {
        return new Promise((resolve, reject) => {
            try {

                AVGStory.sanbox.done = () => {
                    console.log("Script execute done");
                    resolve();
                };

                let script = new vm.Script(this._compiled);
                script.runInNewContext(vm.createContext(AVGStory.sanbox), {
                    displayErrors: true
                });

            } catch (err) {
                reject("AVG Script errror : " + err);
            }
        });
    }
}
