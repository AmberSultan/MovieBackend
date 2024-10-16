const Movie = require('../models/MovieModel');

const getMovie = async (req, res) => {
    try {
      if (req.params.id) {
        const movie = await Movie.findById(req.params.id);
  
        if (!movie) {
          return res.status(404).json({
            success: false,
            message: "Movie not found",
          });
        }
  
        return res.status(200).json({
          success: true,
          message: "Movie retrieved successfully",
          data: movie,
        });
      } else {
        const movies = await Movie.find({});
  
        return res.status(200).json({
          success: true,
          message: "Movies retrieved successfully",
          data: movies,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };

const createMovie = async (req, res)=>{

    console.log(req.body)

    const {title, description, genre, duration, releaseDate, language, rating, trailer, schedule } = req.body;
    let thumbnail = '';
    if (req.file) {
        thumbnail = req.file.path;
    }
     //console.log(JSON.parse(schedule[0].date))
     //console.log(schedule);
     let parsedSchedule = JSON.parse(schedule)

     console.log("parsed array: ",parsedSchedule);
     

    //  let date = parsedSchedule[0].date

    //  let showtiming = parsedSchedule[0].showtiming

    //  console.log({
    //     date: date,
    //     showtiming: showtiming
    //  });
     
     
 try{

    const movie = await Movie.create({title, description, genre, duration, releaseDate, language, rating, trailer, schedule: parsedSchedule, thumbnail})

    res.status(200).json({
        success: true,
        message: "Movie successfully Created",
        data: movie
    })
 }catch(err){
    res.status(400).json({
        success: false,
        message: "not successful",
        data: err
    })
 }  
 
}
// updatin movie
// const updateMovie = async (req, res) => {
//     const { id } = req.params;
//     const thumbnail = req.file.path;
//     const {title, description, genre, duration, releaseDate, language, rating, schedule }= req.body;
    


//     try {
//         const movie = await Movie.findByIdAndUpdate(
//             id,
//             { title, description, genre, duration, releaseDate, language, rating, schedule , thumbnail },
//             { new: true }
//         );

//         if (!movie) {
//             return res.status(404).json({
//                 success: false,
//                 message: "movie not found"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "movie updated successfully",
//             data: movie
//         });
//     } catch (err) {
//         res.status(400).json({
//             success: false,
//             message: "Failed to update movie",
//             error: err.message
//         });
//     }
// };


const updateMovie = async (req, res) => {
    const { id } = req.params;
    // const { title, description, genre, duration, releaseDate, language, rating, schedule } = req.body;

    const {title, description, genre, duration, releaseDate, language, rating,trailer, schedule } = req.body;
    let thumbnail = '';
    if (req.file) {
        thumbnail = req.file.path;
    }

    console.log("Movie ID:", id);
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    let parsedSchedule = JSON.parse(schedule)

     console.log("parsed array: ",parsedSchedule);
    
    try {
      // Initialize the update object with fields from req.body
      const updateData = { title, description, genre, duration, releaseDate, language, rating, trailer, schedule: parsedSchedule, thumbnail };
  
      // Only add the thumbnail field if a new file is uploaded
    //   if (req.file) {
    //     updateData.thumbnail = req.file.path;
    //   }
  
      // Find and update the movie
      const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: "Movie not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Movie updated successfully",
        data: movie,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Failed to update movie",
        error: err.message,
      });
    }
  };
  
  

const deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully",
            data: movie
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to delete movie",
            error: err.message
        });
    }
};



module.exports = {
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
}