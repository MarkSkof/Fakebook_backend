const { Client } = require('minio');

let minioClient = new Client({
    endPoint: process.env.MINIO_HOST || "10.32.250.51",
    port: process.env.MINIO_PORT || "9000",
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY || "12345678",
    secretKey: process.env.MINIO_SECRET_KEY || "12345678",
})

module.exports = { minioClient }