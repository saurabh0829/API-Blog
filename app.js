import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user-routes';
import blogRouter from './routes/blog-routes';
const app = express();

app.use(express.json());  // this parses all the data in json format 
app.use('/api/user',router);
app.use('/api/blog',blogRouter);

mongoose
.connect('mongodb+srv://admin:m7J94ggpc7kL2dJ0@cluster0.zyh4lci.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() => app.listen(5300))
    .then(() => console.log("Connected To database and listenig to localhost 53000"))
    .catch((err) => console.log(err));

