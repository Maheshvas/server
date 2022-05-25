const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Post=require('./model/post');
const bodyParser=require('body-parser');
const multer=require('multer');
const cors=require('cors');




const storage=multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, 'uploads')
    },
    filename: function (req,file,cb){
        const fileNameArr=file.originalname.split('.');
        cb(null,file.fieldname + '-'+Date.now()+'.'+fileNameArr[fileNameArr.length-1]);
    }
})
const upload=multer({storage:storage})

async function connectDB(){
    try {
        return await mongoose.connect('mongodb+srv://manoj45:manoj45@cluster0.30lk2.mongodb.net/?retryWrites=true&w=majority');
    } catch(e) {
        console.log(e);
        throw error('database failed to connect to mongodb');
    }
}

async function main(){
    await connectDB();
    app.use('/uploads',express.static('uploads'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(cors());

    app.get('/',function(req,res){
        res.send({message:'welcome to insta clone on this port 8000' });
    })

    app.get('/api/v1/posts',async function(req,res){
        const posts=await Post.find();
        res.json({
            posts
        })
    })
    app.post('/api/v1/posts', upload.single('image'), async (req,res)=>{
        const post = new Post({
            image: req.file.filename,
            author:req.body.author,
            location:req.body.location,
            description:req.body.description
        });
        
        try{
            const savedPost= await post.save();
            res.json(savedPost);
        }catch(e){
            res.json({msg:e}); 
        }
    
    });

    

    app.listen(process.env.PORT || 8000,()=>console.log('server started on port 8000'));
}

main()