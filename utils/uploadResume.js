const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

const fileFilter = (req, file, cb) => {

  const allowedExt = [".pdf", ".doc", ".docx"]
  const ext = path.extname(file.originalname).toLowerCase()

  if (allowedExt.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error("Only PDF, DOC, DOCX allowed"))
  }

}

const uploadResume = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
})

module.exports = uploadResume