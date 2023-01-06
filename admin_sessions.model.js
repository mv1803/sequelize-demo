var suid = require('rand-token').suid;

module.exports = (sequelize, Sequelize) => {
    const AdminSession = sequelize.define('admin_sessions', {
        admin_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'admin',
                key: 'id'
            }
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
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
    }, {
        tableName: 'admin_sessions',
    });
    
    //Refer : https://stackoverflow.com/a/50291209/7493808
    AdminSession.createToken = async function(adminId) {
        var adminSession = await AdminSession.create({
            token : adminId + suid(99),
            admin_id : adminId,
        });
        return adminSession.token;
    };
    
    return AdminSession;
}

