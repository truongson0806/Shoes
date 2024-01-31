const buyOk=(req,res,next)=>{
    if(true){
        // console.log(req)
        next()
    }
    // if(req.isPaid && req.isDelivered){
    //     next()
    // }
    else{
        res.status(401)
        throw new Error("Bạn chưa mua sản phẩm này trước đây")
    }
}
export default buyOk