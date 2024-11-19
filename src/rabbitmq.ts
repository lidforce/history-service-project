import amqp from 'amqplib';

export async function connectRabbitMQ(queue: string, callback: (message: any) => void) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    console.log(`Подключился к RabbitMQ. Ожидание сообщений: ${queue}`);

    channel.consume(queue, (msg) => {
      if (msg) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Полученное сообщение:`, message);
        callback(message);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Ошибка подключения RabbitMQ:', error);
  }
}
