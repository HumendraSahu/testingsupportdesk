const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const ticketQueue = new Queue('ticketQueue', { connection });

new Worker(
  'ticketQueue',
  async (job) => {
    console.log(`Processing ticket job ${job.id}`, job.data);
    // Placeholder for ticket creation or logging logic
  },
  { connection }
).on('failed', (job, err) => {
  console.error(`Job ${job.id} failed`, err);
});

module.exports = ticketQueue;
