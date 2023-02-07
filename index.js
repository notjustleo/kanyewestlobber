let chars = ["a", "b", 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
let reserve = ['1', '2', '3', '4', '5', '6', '7', '8', 9, '0']
const { twitterClient, twitterBearer } = require("./client.js")
const fs = require('fs')
const untakennames = JSON.parse(fs.readFileSync('./untakennames.json', 'utf-8'))
const { rword } = require('rword')
const chalk = require('chalk')

setInterval(async function() {
    // let name = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)]
    let name = rword.generate(1)
    //let name = 'yows'
    let userobj = await twitterClient.v2.userByUsername(name)
    if (userobj.errors) {
        // console.log(userobj.errors)
        // console.log(userobj.errors[0])
        if (userobj.errors[0].detail.startsWith(`User has been suspended`)) {
            console.log(chalk.red(`@${name} is suspended`))
        } else {
            if (name.length < 5) {
                console.log(chalk.red(`@${name} is less than 5 characters`))
            } else {
                console.log(chalk.green(`@${name} is not taken`))
                await twitterClient.v2.tweet(`the twitter handle @${name} is not taken`)
                if (!untakennames.includes(name)) {
                    untakennames.push(name)
                    fs.writeFileSync('./untakennames.json', JSON.stringify(untakennames, null, 4))
                }
            }
        }
    } else if (userobj.data) {
        console.log(chalk.red(`@${name} is taken`))
    }
}, 2000)