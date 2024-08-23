const dotenv = require("dotenv")

dotenv.config()

const openai = {
    apiKey: process.env.OPENAI_API_KEY
}

const amqp = {
    url: process.env.AMQP_URL
}

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }

  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }

  const gemini = {
    apiKey: process.env.GEMINI_API_KEY
  }

  const aiModels = {
    analysis: process.env.ANALYSIS_MODEL_URL,
    recognition: process.env.RECOGNITION_MODEL_URL
  }


const ipInfo = {
  url: process.env.IP_INFO_URL || "https://ipinfo.io",
  token: process.env.IP_INFO_TOKEN
}

const cronJob = {
  unit: process.env.DEFAULT_JOB_TIME_UNIT || "sec",
  value: process.env.DEFAULT_JOB_TIME_VALUE || 20
}

module.exports = {
    openai,
    firebase: firebaseConfig,
    amqp,
    gemini,
    aiModels,
    cloudinaryConfig,
    ipInfo,
    cronJob
}

