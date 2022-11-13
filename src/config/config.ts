import * as dotenv from 'dotenv'
let dot = dotenv.config()


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

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}

export { dbConfig, valueConfig, sendGridConfig, cloudinaryConfig }