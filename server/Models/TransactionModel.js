import mongoose from "mongoose";
const transactionScheme=mongoose.Schema({
    idTransactionVNPay:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    bankCode:{
        type:String,
        required:true
    },
    thoiGianThanhToan:{
        type:Date,
        required:true
    },
    maOrder:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Order"
    },
    transactionStatus:{
        type:String,
        required:true
    }
})

const Transaction=mongoose.model("Transaction",transactionScheme)
export default Transaction