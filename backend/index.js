import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import path from 'path'                  // <--- 1. Import path
import { fileURLToPath } from 'url'      // <--- 2. Import URL helper
import connectDB from './configs/Db.js'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import authRoutes from './routes/auth.js'
import transmissionRoutes from './routes/transmission.js'
import userRoutes from './routes/user.js'

dotenv.config()

// 3. Resolve directory path (Required for ES Modules)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

// --- API ROUTES ---
app.use("/api/auth", authRoutes)
app.use("/api/transmissions", transmissionRoutes)
app.use("/api/users", userRoutes)

// -------------------------------------------------------------------------
// --- DEPLOYMENT LOGIC (Serve React Frontend) ---
// -------------------------------------------------------------------------

// 4. Serve the static files from the build folder
// You said the path is: backend > public > dist
app.use(express.static(path.join(__dirname, 'public/dist')))

// 5. Handle React Routing (The "Catch-All")
// If a request comes in that doesn't match an API route (like /dashboard),
// send the index.html file so React Router can handle it.
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'dist', 'index.html'))
})

// -------------------------------------------------------------------------

// Error Handlers
// Note: Since we have a catch-all (*) above, the 'notFound' middleware 
// might not be reached for GET requests. This is normal for SPAs.
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log("Server running at Port: ", port)
})