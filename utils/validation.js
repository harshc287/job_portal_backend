// Validate email format
exports.validateEmail = (email) => {

 const regex =
 /^[^\s@]+@[^\s@]+\.[^\s@]+$/

 return regex.test(email)

}

exports.validatePassword = (password) => {

 if(password.length < 6){
  return {
   valid:false,
   message:"Password must be at least 6 characters"
  }
 }

 return { valid:true }

}

exports.checkRequiredFields = (fields)=>{

 for(const key in fields){

   if(!fields[key] || fields[key].trim() === ""){
     return `${key} is required`
   }

 }

 return null

}

exports.validateJobData = (data)=>{

 if(!data.title){
   return "Job title is required"
 }

 if(!data.description){
   return "Job description is required"
 }

 if(!data.location){
   return "Job location is required"
 }

 if(!data.salary){
   return "Salary is required"
 }

 return null

}