## Eventsjoy Frontend
- Eventsjoy helps you get up and running with an event of any kind, manage payments, signups and tickets distribution all in a click
- Most importantly, Eventsjoy is open for you to build your idea from.

## Setup 
1. Cloudinary
2. HERE Location Services (A free google places alternative)

3. Setup a CLOUDINARY upload endpoint in the **/utils/helpers.js** file
4. Setup a HERE secrets setup in the **/utils/inAppSecrets.js** file
5. Setup a HERE api key in the **/utils/api_interactions/location_services.js** file


## Technology
1. Built in **Nextjs**, **Next API && Magiclink Auth**, with **Graphql** for interacting with the **Nest Js** backend.
2. All authentication logic happens via funcitons deployed on the host using Next API, all the extras take place on the backend.
