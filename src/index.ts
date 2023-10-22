import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import morgan from 'morgan'
import responseTime from 'response-time'



import 'dotenv/config'

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,    
}))

// Increase the payload size limit (e.g., 10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(compression({
    level: 6,
    threshold: 1 *1000,
    filter: (req:express.Request, res:express.Response) => {
        if(req.headers['x-no-compression']) {
            return false
        }
        return compression.filter(req, res)
    }
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(responseTime())

const server = http.createServer(app);


    const mongodbConnect = () => mongoose.connect(process.env.MONGO_URI || '', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ Connected to MongoDB');
        server.listen(8080 || process.env.PORT, () => {
            console.log('🚀 Server running on http://localhost:8080/');
    })
    })
    .catch((error) => {
        // console.log(error)
        console.error(`🎆 Error connecting to MongoDB`);

        setTimeout(() => {            
            mongodbConnect()
        }, 3000);
    });
    
    mongodbConnect()

    app.get('/', (req, res) => {
        res.send('Server is running');
    });
    try {
        
        app.use('/api', router())
    } catch (error) {
        console.log("error")
    }
    
   