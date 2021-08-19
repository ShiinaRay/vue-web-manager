const mongoose = require("mongoose")

// mongoose.connect('mongodb:localhost:27017/express',{
//      useNewUrlParser: true 
// })
mongoose.connect('mongodb://localhost:27017/express', {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify:true,
})
const UserSchema = new mongoose.Schema({
     username: { type: String, unique: true },
     password: {
          type: String, 
          set(val) {
               return require('bcryptjs').hashSync(val, 10)
          }
     }
})
const StudentSchema = new mongoose.Schema({
     snumber:{type:String},
     class:{type:String},
     name:{type:String},
     sex:{type:String},
     webGrade:{type:String},
     dbGrade:{type:String},
     cGrade:{type:String},
 })


const FileSchema = new mongoose.Schema({
     name:{type:String},
     url:{type:String}
 })


 const ArticleSchema = new mongoose.Schema({
      title:{type:String},
      body:{type:String},
 })



const User = mongoose.model('User', UserSchema)
const Student = mongoose.model('Student', StudentSchema)
const File = mongoose.model('File',FileSchema)
const Article = mongoose.model('Article',ArticleSchema)
//users  students files
// User.db.dropCollection('users')
module.exports = { User,Student,File,Article}