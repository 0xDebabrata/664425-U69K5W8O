import { GPT_CHAT_URL, OPENAI_API_KEY } from "./environment"
import { prompts } from "./sys_content"
export async function gptCall(elementList: string[]): Promise<string[]> {
    console.log("gpt call invoked")
    const gptInputString: string = elementList.join("\n")
    const res = await fetch(GPT_CHAT_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "temperature": prompts.button.temperature,
            "messages": [
                { "role": "system", "content": prompts.button.sysMessage },
                { "role": "user", "content": gptInputString }
            ]
        })
    })

    const [{ message }] = (await res.json()).choices
    console.log(message)
    return ["this is more GG"]
}