const express = require("express")
const mongoose = require("mongoose")

const app = express()

const connectdb = () =>{
    mongoose.connect("mongodb://localhost:27017/users")
}

//schma
const userSchma  =  new mongoose.Schema({

    firstName : {type : String, required : true  },
    middleName  : {type : String, required :  false },
    lastName  : { type :  String ,required :true},
    age  : { type :  Number ,required :true},
     email  : { type : String,required :true},
     address  : { type : String,required :true},
     gender  : { type : String,required :false   }

},
{
    timestamps :true
})


const User = mongoose.model("user" ,userSchma)



const BranchDetailSchema =  new mongoose.Schema({

    name : {type : String, required : true  },
    address  : {type : String, required :  false },
    IFSC : { type :  String ,required :true},
    MICR  : { type :  Number ,required :true},
 
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true,
    }
   
      
},
{ 
    timestamp : true
}
)


const Branchs  = mongoose.model("Branch" , BranchDetailSchema)



const  masterSchma =  new mongoose.Schema({

    balance  : {type : String, required : true  },
    branchId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Branch",
        require : true,
    }
      
},
{ 
    timestamp : true
}
)


const  Master = mongoose.model("master" , masterSchma   )





const  SavingsAccountSchma =  new mongoose.Schema({

    account_number  : {type : String, required : true ,unique:true },
    balance : {type : Number, required :  true},
    interestRate : { type :   Number ,required :true},

    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true,
    }
     
      
},
{ 
    timestamp : true
}
)


const  SavingAccount = mongoose.model(" saving" ,  SavingsAccountSchma)



const fixedSchma  =  new mongoose.Schema({

    account_number : {type : String, required : true ,unique: true },
    balance  : {type : Number, required : true },
    interestRate  : { type :   Number ,required :true},
    startDate  : { type :  Number ,required :true},
    maturityDate  : { type : Number,required :true},

    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        require : true,
    }
     

},
{
    timestamps :true
})


const  Fixeds = mongoose.model("fixed" ,fixedSchma)



app.get("/master" , async  (req,res) =>{
    try {
        const master = await Master.find().lean().exec()
        return res.status(201).send({master : Master})
    } catch (error) {
        // return res
       return res.status(500).send({message : error.message})
    }
})



app.post("/saving" , async  (req,res) =>{
    try {
        const  savings = await Master.create(req.params.body)
        return res.status(201).send({ savings   : savings})
    } catch (error) {
        // return res
       return res.status(500).send({message : error.message})
    }
})



app.post("/saving:/id" , async  (req,res) =>{
    try {
        const  savings = await Master.findById(req.body)
        return res.status(201).send({ savings   : savings})
    } catch (error) {
        // return res
       return res.status(500).send({message : error.message})
    }
})

app.post("/fixeds:/id" , async  (req,res) =>{
    try {
        const  savings = await  fixeds.findByIdAndUpdate(req.body)
        return res.status(201).send({ savings   : savings})
    } catch (error) {
        // return res
       return res.status(500).send({message : error.message})
    }
})


app.post("/fixed" , async  (req,res) =>{
    try {
        const  fixeds = await  Fixeds.findByIdAndUpdate(req.params.body)
        return res.status(201).send({ fixeds : Fixeds})
    } catch (error) {
        // return res
       return res.status(500).send({message : error.message})
    }
})


app.listen(5000 , async () =>{
    try {

        await connectdb()
        
    } catch (error) {
        console.log("somethig went wrong")
    }
    console.log("listening 5000")
})