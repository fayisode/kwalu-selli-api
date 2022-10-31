
const dbConfig = {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT || 5050,
}


const valueConfig = {
    tokenExpiryTime: 30000,
    JWT_SECRET: process.env.JWT_SECRET ,
}

const sendGridConfig = {
    user: process.env.SENDGRID_USER,
    apiKey: process.env.SENDGRID_API_KEY,
}

export { dbConfig, valueConfig, sendGridConfig }