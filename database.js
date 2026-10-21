const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Car = sequelize.define('cars', {
    brand: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING  
    },
    model: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    year: Sequelize.DataTypes.INTEGER,
    price: Sequelize.DataTypes.FLOAT,
    isAvailable: Sequelize.DataTypes.BOOLEAN
});

sequelize.sync({ force: true }).then(() => {
    console.log('База данных синхронизирована');

    createCars([
        {
            brand: 'Toyota',
            model: 'Camry 2.5 AT',
            year: 2021,
            price: 2450000.00,
            isAvailable: true
        },
        {
            brand: 'Volkswagen',
            model: 'Tiguan 2.0 TSI',
            year: 2019,
            price: 1890000.00,
            isAvailable: false
        }
    ]);

});

async function createCars(array) {
    const cars = await Car.bulkCreate(array);
    console.log(cars)
};

