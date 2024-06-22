import { logger } from "@vendetta";
import Settings from "./Settings";

export default {
    onLoad: () => {
        logger.log("Starting status spoof!");
        const oldWebsocket = WebSocket
        oldWebsocket.prototype.send = new Proxy(oldWebsocket.prototype.send, {
            apply(target: (data: (string | ArrayBufferLike | Blob | ArrayBufferView)) => void, thisArg: WebSocket, argArray: any[]): any {
                if (thisArg.url.includes("wss://gateway.discord.gg")) {
                    console.log(`[HOOK] [${thisArg.url}] Hooked send function`)
                    try {
                        const data = JSON.parse(argArray.at(0)) as {op: number, d: {properties: {os: string, browser: string, device: string, browser_user_agent: string, browser_version: string, os_version: string}}}
                        if (data.op === 2) {
                            console.log(`[HOOK] [${thisArg.url}] Hooking IDENTIFY packet`)
                            data.d.properties.os = "Embedded"
                            data.d.properties.browser = "Discord Embedded"
                            data.d.properties.device = "Xbox"
                            data.d.properties.browser_user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) PlayStation Chrome/48.0.2564.82 Safari/537.36 Edge/20.02";
                            data.d.properties.browser_version = "108.0";
                            data.d.properties.os_version = "";
                            argArray[0] = JSON.stringify(data)
                        }
                    } catch (e) {
                        console.log(`[HOOK] [${thisArg.url}] Could not parse JSON data. Probably `)
                    }
                }
                return Reflect.apply(target, thisArg, argArray)
            }
        })

    },
    onUnload: () => {
        logger.log("Goodbye, world.");
    },
    settings: Settings,
}