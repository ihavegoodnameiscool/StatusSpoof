(function(r,n,i){"use strict";const{FormText:l}=i.Forms;function d(){return React.createElement(l,null,"Welcome to status spoofer")}var a={onLoad:function(){console.log("hi"),n.logger.log("Starting status spoof!");const s=WebSocket;s.prototype.send=new Proxy(s.prototype.send,{apply(c,e,t){if(e.url.includes("wss://gateway.discord.gg")){console.log(`[HOOK] [${e.url}] Hooked send function`);try{const o=JSON.parse(t.at(0));o.op===2&&(console.log(`[HOOK] [${e.url}] Hooking IDENTIFY packet`),o.d.properties.os="Embedded",o.d.properties.browser="Discord Embedded",o.d.properties.device="Xbox",o.d.properties.browser_user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox Series X) AppleWebKit/537.36 (KHTML, like Gecko) PlayStation Chrome/48.0.2564.82 Safari/537.36 Edge/20.02",o.d.properties.browser_version="108.0",o.d.properties.os_version="",t[0]=JSON.stringify(o))}catch{console.log(`[HOOK] [${e.url}] Could not parse JSON data. Probably `)}}return Reflect.apply(c,e,t)}})},onUnload:function(){n.logger.log("Goodbye, world.")},settings:d};return r.default=a,Object.defineProperty(r,"__esModule",{value:!0}),r})({},vendetta,vendetta.ui.components);