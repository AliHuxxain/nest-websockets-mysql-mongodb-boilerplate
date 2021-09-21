


export default {

    authentication: {

        apiCredentials: {

            username: 'basic-auth-username',
            password: 'basic-auth-password'

        },

        jwt: {

            secret: 'add-your-jwt-secret-here',
            expiresIn: '10 days'
            
        },

        refreshToken: {

            expiresIn: 30 // days

        }

    },

    rateLimiting: {

        ttl: 60, //seconds
        limit: 10

    }

}