// server start krna
// db connect krna
const app = require('./src/app')
const connect = require('./src/db/db')

connect();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
})  
    