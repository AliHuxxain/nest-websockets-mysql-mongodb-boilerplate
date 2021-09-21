import localAws from './Aws/local';
import devAws from './Aws/dev';
import prodAws from './Aws/prod';

import localDatabase from './Database/local';
import devDatabase from './Database/dev';
import prodDatabase from './Database/prod';

import localSecurity from './Security/local';
import devSecurity from './Security/dev';
import prodSecurity from './Security/prod';

import localTwilio from './Twilio/local';
import devTwilio from './Twilio/dev';
import prodTwilio from './Twilio/prod';



export default {
    
    httpServerPort: 4000,
    socketServerPort: 5000,

    aws: localAws,

    database: localDatabase,

    security: localSecurity,

    twilio: localTwilio,

    customerSupport: {

        contact: 'you-can-add-more-constant-here',
        email: 'you-can-add-more-constant-here'
        
    }

}