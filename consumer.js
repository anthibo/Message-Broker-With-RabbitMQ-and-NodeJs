const amqp = require('amqplib')

connect()
async function connect() {
    try {

        const connection = await amqp.connect('amqp://localhost:5672')
        const channel = await connection.createChannel()
        const result = await channel.assertQueue("jobs")
        channel.consume('jobs', message => {
            const input = JSON.parse(message.content)
            console.log(`Recieved job with input ${input.number}`)

            //acknowledge a certain message and dequee it from the message queuee
            if (input.number == 9) {
                channel.ack(message)
            }
        })
        console.log('Waiting for messages....')

    } catch (error) {
        console.log(error)
    }
}

