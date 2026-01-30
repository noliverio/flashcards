import type { Config } from "./types"
import { homedir } from "node:os"
import { join } from "node:path"

const config = await readConfig()

async function main(){
    const canAccessAPI = await validateAPIConnectivity()
    if (!canAccessAPI){
        console.error("Cannot access API. Please Verify that the api service is running, and that the correct endpoint is configured.")
        process.exit(1)
    }

}

async function readConfig(){
    const file_path = join(homedir(),".flashcardrc")
    const configFile = Bun.file(file_path)
    const config: Config = await configFile.json()
    return config
}

async function validateAPIConnectivity(){
    try{
        const req = await fetch(`${config.api_url}/`)
        if (req.status != 200){
            return false
        }
        if ((await req.text()) != "Hello Bun!"){
            return false
        }
        return true
    }catch (error){
        return false
    }
}

main()