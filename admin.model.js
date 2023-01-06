
module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            allowNull: false,
        },
    },
    {
        tableName: 'admin'
    });

    //Refer : https://stackoverflow.com/a/27979695/7493808
    Admin.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());      
        // delete values.password;
        values.created_at = values.createdAt;
        values.updated_at = values.updatedAt;
        //This will remove field from json object (note after create/update method  json object require this)
        ['password', 'createdAt', 'updatedAt',].forEach(e => delete values[e]);
        return values;
    };

    //Refer : https://stackoverflow.com/a/50291209/7493808
    Admin.isExistField = function(fieldName, fieldValue) {
        return Admin.count({ where: { [fieldName]: fieldValue } }).then(count => {
            if (count != 0) {
              return true;
            }
            return false;
        });
    };
    
    return Admin;
}
