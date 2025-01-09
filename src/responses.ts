import { app } from "./bolt";

import YAML from 'yaml';
import fs from 'fs';

const file = await fs.promises.readFile('./src/responses.yml', { encoding: 'utf-8' });
const responses = YAML.parse(file)

app.message(async ({ message }) => {
    if (message.user === undefined) { 
        return;
    } 

    if (message.text in responses) {
        await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: message.channel,
            text: responses[message.text],
            thread_ts: message.ts,
            reply_broadcast: true,
            username: 'orpheus',
        });
    }


    console.log(message);
});
