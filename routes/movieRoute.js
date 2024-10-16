const express = require('express');
const multer = require('multer');
const {getMovie, createMovie, updateMovie, deleteMovie} = require('../controllers/movieController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({ storage: storage });

router.get('/get-movie/:id', getMovie)
router.get('/get-movie', getMovie)

router.post('/create', upload.single('thumbnail'), createMovie)
router.put('/update/:id', upload.single('thumbnail'), updateMovie)
router.delete('/delete/:id', deleteMovie)

module.exports = router;
