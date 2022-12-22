const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require('./routes/post');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDOC = require('swagger-jsdoc')

let port = process.env.PORT || 8000

dotenv.config();
const app = express();


mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log('CONNECTED TO MONGO DB');
})

app.use(cors());
app.use(cookieParser());//tạo cookie gắn cookie
app.use(express.json());
app.use('/uploads',express.static('uploads'))
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Travel Blog API',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8000/'
            }
        ]
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDOC(options)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

//routes
app.use("/v1/auth",authRoutes);
app.use("/v1/user",userRoutes);
app.use("/v1/post",postRoutes);

//test
app.get('/', (req,res) => {
    console.log('Hello World')
    res.send("Hello my friend")
})


app.listen(port,()=>{
    console.log('Server is running');
})

//AUTHENTICATIO là so sánh dữ liệu mà mình nhập với dữ liệu có trên database
//AUTHORIZATION