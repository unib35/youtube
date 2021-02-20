const express = require('express');
const router = express.Router();
// const { Video } = require("../models/video");

const { auth } = require("../middleware/auth");
const multer = require('multer');


// STORATE MULTER COIFIG (OPTION)
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4' || ext !== '.png' || ext !== '.jpg') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
})

// 위에서 정의한 MULTER OPTION을 multer에 넣어주고, 그것을 upload 변수에 넣어준다.
//.single('file') 파일은 하나만 올릴수 있게한다.
var upload = multer({ storage: storage }).single("file")

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
	//비디오를 서버에 저장한다.
	upload(req, res, err => {
		if(err) {
			return res.json({ success: false, err})
		}
		// res.req.file.path => 답장은 req에 포함된 file.path를 보낸다.
		return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
	})
})

module.exports = router;
