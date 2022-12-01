
const mongoose = require("mongoose")

const volunteerSchema = new mongoose.Schema({
    name : {type :String ,required :true},
    email : {type :String ,required :true},
    mobileNumber : {type : Number ,required :true,minLength:10,maxLength:10},
    address : {type :String ,required :true},
    location : {type :String ,required :true},
    spokenLanguages : {type :Array ,required :true},
    availability : {type :Array ,enums:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],required:true},
    userId:{type:String}

})

const VolunteerModel = mongoose.model("volunteer",volunteerSchema)

module.exports = {
    VolunteerModel
}