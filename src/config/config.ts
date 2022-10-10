
const dbConfig = {
    mongoUrl: process.env.MONGO_URL || "mongodb+srv://saheedfaremi:Saheed123*@cluster0.7elbk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    port: process.env.PORT || 5050,
}

const valueConfig = {
    tokenExpiryTime: 30000,
    JWT_SECRET: process.env.JWT_SECRET || 'tj67O==5H',
}

export { dbConfig, valueConfig }