const axios = require('axios')
const crypto = require('crypto-js')
const caesarCrypto = require("./caesar-crypto")
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')
//this const not used explict but this load a data on .env file with my token
const dotenv = require('dotenv').config()

const tokenCodeNation = { token: process.env.TOKEN }
const rootPath = path.resolve(__dirname, 'files', `answer.json`)

/**
 * Aplication for resolve the Challenge on CodeNation
 * The main get challenge json using Axios, process de criptography and send via Axios the file json updated
 * In this code Write and Read File not needs all operations is time execution, but on end one file json final is write
 * 
 * @author Walisson Rodrigo
 * @email walissonrodrigo@outlook.com
 * @gitHub gitbub.com/WalissonRodrigo
 */
async function main() {
    const json = await getChallengeJson()
    var challenge = { cifrado, decifrado, numero_casas, resumo_criptografico, token } = json
    challenge.decifrado = caesarCrypto.decrypt(challenge.cifrado, challenge.numero_casas)
    challenge.resumo_criptografico = crypto.SHA1(challenge.decifrado, challenge.cifrado).toString()
    challenge.score = await sendChallengeJson(challenge)

    if (challenge.score > 0) {
        //Nota Obtida com Sucesso Vamos brincar de encriptar agora
        let encript = caesarCrypto.encrypt(challenge.decifrado, challenge.numero_casas)
        console.log("encriptado:", encript, ":")
    }

    fs.writeFile(rootPath, JSON.stringify(challenge), 'utf8', (error) => {
        if (error) {
            console.error("Falha ao criar o json no disco")
            return
        }
        console.log('FINAL OK!', challenge)
    })
}

main()

async function getChallengeJson() {
    let json = null
    await axios.get("https://api.codenation.dev/v1/challenge/dev-ps/generate-data", { params: tokenCodeNation })
        .then((res) => {
            console.log("Meu Desafio", res)
            json = { cifrado, decifrado, numero_casas, resumo_criptografico, token } = res.data
        }).catch((erro) => {
            console.error("Deu Ruim no JSON", erro)
        })
    return json
}

async function sendChallengeJson(json) {
    const form = new FormData();
    form.append("answer", JSON.stringify(json), { filename: 'answer.json', contentType: 'application/json' })
    let headers = form.getHeaders()
    let response = null
    await axios.post("https://api.codenation.dev/v1/challenge/dev-ps/submit-solution", form, {
        params: tokenCodeNation, headers: headers
    })
        .then((res) => {
            console.log("Minha Nota", res.data)
            response = res.data.score
        }).catch((erro) => {
            console.error("Deu Ruim no JSON", erro)
        })
    return response
}