import  {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user already exists
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if(existing){
            return res.status(409).json({ message: "Username or email already exists" });
        }

        //create user
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn: false,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    }catch(err){
        console.error(`Error registering user: ${err.message}`);
        res.status(500).json({ message: "Server error" });
    }
}

const loginUser = async (req,res)=>{
    try{
        //if the user already exists
        const { username, password } = req.body;
        const user = await User.findOne({
            username: username.toLowerCase()
        });
        if(!user){
            return res.status(400).json({ message: "Invalid username or password" });
        };

        //compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch(err){
        console.error(`Error logging in: ${err.message}`);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export { registerUser, loginUser };