import Redis from "ioredis"


export const redis = new Redis();

redis.on('connect', () => {
    console.log('Client connected to redis...')
})

redis.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

redis.on('error', (err) => {
    console.log(err.message)
})

redis.on('end', () => {
    console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
    redis.quit()
})
