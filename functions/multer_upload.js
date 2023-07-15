const multer=require("multer");
const path=require("path");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: path.join(__dirname, '../uploads/'),
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   }),
// });
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads/'),

    filename: function (req, file, cb) {
      const uniqueprefix = Math.round(Math.random() * 1E9)
      cb(null, uniqueprefix+"-"+file.originalname);
    }
  })


const upload=multer({storage:storage},{
    fileFilter:function(req,file,cb){

        const ext=path.extname(file.originalname);
        if(["jpg","jpeg","png"].includes(ext)){
            cb(null,true)
        }else{
            cb(null,false);
        }
    },
    limit:{
        fileSize:20000000 //2mb
    }
})

module.exports=upload;