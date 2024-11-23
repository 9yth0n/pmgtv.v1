Initialize
Initialize your SDK
Initialize your SDK by pointing the client to your Appwrite project using your 
Project ID


import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setProject('674132c50010c45784f3')
    .setPlatform('com.pmg.toolkit');


Before sending any API calls to your new Appwrite project, make sure your device or emulator has network access to your Appwrite project's hostname or IP address.

import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setProject('674132c50010c45784f3')
    .setPlatform('com.pmg.toolkit');
