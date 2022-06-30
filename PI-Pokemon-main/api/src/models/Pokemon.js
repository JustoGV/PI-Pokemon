const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type:DataTypes.STRING
    },
    ataque:{
      type:DataTypes.STRING
    },
    defensa:{
      type:DataTypes.STRING
    },
    velocidad:{
      type:DataTypes.STRING
    },
    altura:{
      type:DataTypes.STRING
    },
    peso:{
      type:DataTypes.STRING
    },
    img:{
      type:DataTypes.STRING
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  });
};
