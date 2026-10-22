const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Users = sequelize.define('users', {
    name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.DataTypes.STRING
    }
});

const Profiles = sequelize.define('profiles', {
    bio: Sequelize.DataTypes.TEXT,
    avatarUrl: Sequelize.DataTypes.STRING,
    birthDate: Sequelize.DataTypes.DATEONLY
});

Users.hasOne(Profiles, {
    foreignKey: {
        name: 'userId'
    },
    as: 'profile'
});

Profiles.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
});

sequelize.sync({ force: true }).then(() => {
    console.log('База данных синхронизирована');
    createUsers([
        {
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            profile: {
                bio: 'Студент, изучающий программирование',
                avatarUrl: 'https://example.com/ivan.png',
                birthDate: '2005-06-15'
            }
        },
        {
            name: 'Пётр Петров',
            email: 'petr@example.com',
            profile: {
                bio: 'Любитель автомобилей и технологий',
                avatarUrl: 'https://example.com/petr.png',
                birthDate: '2004-09-20'
            }
        }
    ]);
});


async function createUsers(array) {
    for (const item of array) {
        const user = await Users.create({
            name: item.name,
            email: item.email
        });

        await user.createProfile(item.profile);
    }

    const users = await Users.findAll({
        include: [{
            model: Profiles,
            as: 'profile'
        }]
    });

    console.log(JSON.stringify(users, null, 4));
}