const JWT =require("jsonwebtoken");

const {OAuth2Client}=require("google-auth-library");
const USER_MODEL =require("../../models/user_model");

const SignIn = async (req, res) => {
    try{
        const GoogleToken=req.body.token;
        const GoogleClient=new OAuth2Client();

        const Ticket=await GoogleClient.verifyIdToken({
            idToken:GoogleToken,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        
        const GooglePayload=Ticket.getPayload();
        if(GooglePayload?.hd==="cfd.nu.edu.pk")
        {
        const user = await USER_MODEL.findOne({ email_id: GooglePayload.email});
        let UserData={
            email_id: GooglePayload.email,
            name: GooglePayload.name,
            batch: null,
            profilepicture: GooglePayload.picture,
            subscribe: false,
            rollnum: null,
            usertype: 'user',
        };

        if(!user){
            const addedUser=await USER_MODEL.create(UserData);
            addedUser?console.log("User Added To USER_MODEL Database"):
            res.status(500).json({ error: "An error occurred" });
        }

        const NewUserToken=JWT.sign({email:GooglePayload.email},process.env.JWT_SECRET);
        res.status(200).json({token:NewUserToken});
    }
    else
    {
        res.status(500).json({message:"Register With CFD Account"});
    }
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
    }

}

module.exports = SignIn;
