SERVER ENV:
NODE_ENV= //development | production
PORT= //port number
MONGODB_URL= //url
JWT_SECRET= //secret value string
JWT_EXPIRES_IN= //how long
https://console.cloudinary.com/app/c-811b308a63885367b489dbb5498d86/settings/api-keys
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=

#### HTTP Only Cookie

An HTTP-only cookie is a cookie that can't be accessed by JavaScript running in the browser. It is designed to help prevent cross-site scripting (XSS) attacks, which can be used to steal cookies and other sensitive information.

##### HTTP Only Cookie VS Local Storage

An HTTP-only cookie is a type of cookie that is designed to be inaccessible to JavaScript running in the browser. It is primarily used for authentication purposes and is a more secure way of storing sensitive information like user tokens. Local storage, on the other hand, is a browser-based storage mechanism that is accessible to JavaScript, and is used to store application data like preferences or user-generated content. While local storage is convenient, it is not a secure way of storing sensitive information as it can be accessed and modified by JavaScript running in the browser.

#### useNavigation() hook

Navigation State

idle - There is no navigation pending.
submitting - A route action is being called due to a form submission using POST, PUT, PATCH, or DELETE
loading - The loaders for the next routes are being called to render the next page

#### Cloudinary without multer is possible

In production systems, many teams skip disk storage completely and
upload directly to Cloudinary using streams.
That way you don't need multer.diskStorage or fs.unlink at all.

#### Run populate script in typescript:

npx tsx src/populate.ts
