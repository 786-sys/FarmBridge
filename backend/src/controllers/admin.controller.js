

const getHello=async(req,res)=>{
    res.status(200).json({message:"hello admin"})
}
export {getHello}