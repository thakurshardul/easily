import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/resume/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+'-'+file.originalname)
    }
  })
  
  export const resumeUpload = multer({ storage: storage })