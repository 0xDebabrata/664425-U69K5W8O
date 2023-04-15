import { GPT_CHAT_URL, OPENAI_API_KEY } from "./environment"
import { prompts } from "./sys_prompts"

export async function gptCall(elementList: string[], type: "button" | "anchor"): Promise<string> {
    let gptInputString = ""

    for (let url of elementList) {
        gptInputString += url + '\n'
    }

    const res = await fetch(GPT_CHAT_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "temperature": prompts[type].temperature,
            "messages": [
                { "role": "system", "content": prompts[type].sysMessage },
                { "role": "user", "content": prompts[type].userMessage + gptInputString }
            ],
            "max_tokens": 2000
        })
    })
    const data = await res.json()
    const response = data.choices[0].message.content

    return response
}
