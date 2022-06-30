const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const pokemon=require('./RouterPokemons.js')
const type=require('./RouterTypes.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons',pokemon)
router.use('/types',type)



module.exports = router;
