const ImageUpload =require("../../../utils/uploadImage.js")
const blogImageUpload = async (req, res) => {
    ImageUpload(req.body.Image).
    then((url)=>{
        console.log("to yaha hu ma");
        console.log(url);
        return res.send(url);}).
    catch((err)=>{
        console.log("This error here occurred");
        return res.status(500).send(err)
    });

}

module.exports = blogImageUpload;
