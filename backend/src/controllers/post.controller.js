import {Post} from '../models/post.model.js';

//create a post

const createPost = async (req, res) => {
    try {
        const { name,description,age} = req.body;

        //basic validation
        if(!name || !description || !age){
            return res.status(400).json({ message: "All fields are required" });
        }
        const post = await Post.create({
            name,
            description,
            age
        });
        res.status(201).json({
            message: "Post created successfully",
            post: {
                id: post._id,
                name: post.name,
                description: post.description,
                age: post.age
            }
        })
    }catch (err){
        res.status(500).json({ message: "Server error" });
    }
}

const getPosts = async (req, res) =>{
    try{
        const Posts = await Post.find();
        res.status(200).json({
            message: "Posts retrieved successfully",
            posts: Posts
        });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

const updatePost = async (req,res) =>{
    try{
        //basic validation to check if the body is empty
        if(Object.keys(req.body).length === 0){
            
            return res.status(400).json({
                message: "Request body cannot be empty"
            });
        }
        console.log(1);
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post updated successfully",
            post: {
                id: post._id,
                name: post.name,
                description: post.description,
                age: post.age
            }
        });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}
const deletePost = async (req,res) =>{
    try{

        //simple validation to check if the id is valid
        if(Object.keys(req.params.id).length === 0){
            return res.status(400).json({
                message: "Post id is required"
            });
        }
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }
        res.status(200).json({
            message: "Post deleted successfully"
            
        });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

export {
    createPost,
    getPosts,
    updatePost,
    deletePost
};