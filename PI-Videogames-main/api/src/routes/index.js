const { Router } = require('express');
const { Videogame, Genres } = require('../db')
const { Sequelize, Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/games/:id', async (req, res) => {
    try{
    const { id } = req.params;

    if (id) {
      let videogame = await Videogame.findOne({
        where: { id: { [Op.iLike]: `%${id}%` } },
        include: {
          model: Genres,
          attributes: ["name", "image", "description", "released","rating","platforms","genres"],
          through: { attributes: [] },
        },
      });
      if (videogame) {
        return res.json(videogame);
      } else {
        return res.status(404).json({ message: "El videogame no fue encontrado." });
      }
    } else {
      return res.status(404).json({ message: "El videogame no fue encontrado." });
    }

  } catch (err) {
    console.log(err);
  }
});




router.get('/games', async (req, res,) => {
    try {
        const { name } = req.query;
    
        if (name) {
          const videogame = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: {
              model: Genres,
              attributes: ["name", "image", "description", "released","rating","platforms","genres"],
              through: { attributes: [] },
            },
          });
          if (videogame) {
            res.json(videogame);
          } else {
            res.json({ mal: 404 });
          }
        } else {
          const allGames = await Videogame.findAll({
            include: {
              model: Genres,
              attributes: ["name", "image", "description", "released","rating","platforms","genres"],
              through: { attributes: [] },
            },
          });
          if (allGames) {
            return res.json(allGames);
          } else {
            return res.status(404).json({ message: "No se han encontrado games" });
          }
        }
      } catch(err){
          console.log(err);
      }
    });

    

    router.get('/allGenres', async (req, res) => {
        try {
            const allGenres = await Genre.findAll();
        
            if (allGenres) {
              res.json(allGenres);
            } else {
              res.status(404).json({ message: "No se han encontrado Generos" });
            }
          } catch (err) {
            console.log(err);
          };
        });
        router.get('/platforms', async (req, res) => {
          try {
              const allPlatforms = await Videogame.findAll({
                attributes: [
                    "Xbox One",
                    "Xbox Series S/X",
                    "Xbox 360",
                    "PlayStation 3",
                    "PlayStation 4",
                    "PlayStation 5",
                    "PC",
                    "Nintendo Switch",
                    "Linux",
                    "macOS",
                    "Android",
                    "iOS",
                    "Xbox",
                    "PS Vita",
                    "Web",
                    "Wii U",
                    "Nintendo 3DS",
                    "PlayStation 2",
                    "Dreamcast"]
            });
          
              if (allPlatforms) {
                res.json(allPlatforms);
              } else {
                res.status(404).json({ message: "No se han encontrado plataformas." });
              }
            } catch (err) {
              console.log(err);
            };
          });
          
        




router.post('/videogames', async (req,res)=>{
    try {
        const {name, image, description, released, rating, platforms, genres} = req.body;
    
        if (name && image && description && released && rating && platforms && genres) {
          const [instance] = await Genre.findOrCreate({
            where: {
              name: name,
              image: image,
              description : description,
              released:released,
              rating:rating,
              platforms:platforms,
              genres:genres
            },
          });
    
          games.forEach(async (name) => {
            const videogame = await Videogame.findOne({ where: { name: name } });
    
            await videogame.addGenre(instance);
          });
    
          return res.send("Video game creado exitosamente!");
        } else {
          return res
            .status(400)
            .json({ message: "No se ha podido crear el videogame." });
        }
      } catch (err) {
        console.log("Hubo un error en POST postVideogames.");
      };
    });
    
    
module.exports = router;
