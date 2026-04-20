import  {User} from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        console.log(1);

        //basic validation
        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log(2);

        //check if user already exists
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if(existing){
            return res.status(409).json({ message: "Username or email already exists" });
        }

        console.log(3);
        //create user
        const user = await User.create({
            username,
            email:email.toLowerCase(),
            password,
            loggedIn: false,
        });

        console.log(4);

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
        console.log("User found:", user.username);
        console.log("Password in DB:", user.password);
        console.log("Password received:", password);
        const isMatch = await user.comparePassword(password);
        console.log("Password match result:", isMatch);
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

const logoutUser = async (req,res)=>{
    try{
        const {email} = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        //console.log("User found for logout:", user);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        //console.log("Logging out user:", user.username);
        res.status(200).json({ message: "Logout successful" });
    }catch(err){
        console.error(`Error logging out: ${err.message}`);
        res.status(500).json({ message: "Internal Server error" });
    }
}

export { registerUser, loginUser, logoutUser };