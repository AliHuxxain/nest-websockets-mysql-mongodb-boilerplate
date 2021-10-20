import { User } from '../../Modules/User/user.entity';
import { RefreshToken } from 'src/Authentication/refreshToken.entity';



export default {

    mysql: {

        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'databaseName',
        entities: [User, RefreshToken]

    },

    mongo: {

        uri: 'mongodb://localhost:27017/databaseName'

    }

}