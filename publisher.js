const amqp = require('amqplib')

const message = { number: process.argv[2] }
connect()
async function connect() {
    try {

        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")
        channel.sendToQueue('jobs', Buffer.from(JSON.stringify(message)))
        console.log(`job sent successfully ${message.number}`)
    } catch (error) {
        console.log(error)
    }
}

