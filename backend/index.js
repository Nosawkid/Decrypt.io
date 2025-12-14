import express, { json } from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './configs/Db.js'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import authRoutes from './routes/auth.js'
dotenv.config()



const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

app.get("/", () => {
    resizeBy, json({ message: "Welcome to Decrypt.io" })
})
// Auth Routes
app.use("/api/auth", authRoutes)



app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log("Server running at Port: ", port)
})





