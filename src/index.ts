import app from './app';
const port = 2000;

app.listen(process.env.PORT||port,()=>{
    console.log('server is running on port',process.env.PORT||port);
})