const {productmodel} = require("../module/Productmodule")


const createproduct = async (req,res)=>{
    const product = req.body;
    const newproduct = new productmodel(product);
    

    try{
        if(req.file){
            
            newproduct.product_img = req.file.filename
        }
         await newproduct.save()
         res.status(201).json({
            message:"Product Created Successful",
            result:newproduct
         })

    } catch (err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const getallproduct = async (req,res)=>{
    try{
        const getall = await productmodel.find({})
        return res.status(200).json({
            message:"Product Founded",
            result:getall
        })
    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const deleteproduct = async (req,res)=>{
    const {id} = req.params
    try{
        const deleteproduct = await productmodel.findOne({
            _id: id
        })
        await productmodel.findByIdAndDelete(id);
        return res.status(201).json({
            message:"product Deleted Successful"
        })
    } catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

const updateproduct = async (req,res) =>{
    const {id}  = req.params;
    const data = req.body;
    try{
        const product = await productmodel.findOne({
            _id : id
        })

        const update = await productmodel.findByIdAndUpdate(id,data);
        return res.status(200).json({
            message:"Update Successful",
            result:update
        })
    } catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}


module.exports ={
    createproduct,
    getallproduct,
    deleteproduct,
    updateproduct
}