# Aurelia-OpenIddict
## Integration of Aurelia with OpenIddict



## Overview

This repository demonstrates how authentication can be added simply to the **[aurelia/skeleton-typescript-aspnetcore](https://github.com/aurelia/skeleton-navigation)** starter kit
by integrating with **[OpenIddict](https://github.com/openiddict/openiddict-core)**, the powerful turnkey implementation of the 
[OpenId Connect specifications](http://openid.net/specs/openid-connect-core-1_0.html) actively maintained and supported by
**[Kévin Chalet](https://github.com/PinpointTownes)**. In addition to the libraries already referenced by the Aurelia starter kit, two additional
Aurelia libraries supported by the SpoonX development group, [aurelia-api](https://github.com/SpoonX/aurelia-api) and [aurelia-authentication](https://github.com/SpoonX/aurelia-api), are used to 
facilitate client integration with both the authorization and resource servers. Unlike the approach used by the popular **[Angular-based 
Satellizer](https://github.com/sahat/satellizer)** library on which the aurelia-authentication library is based, this solution retrieves an access token to unlock protected 
resources in only one way. The way that access token is obtained is through a call to the OpenIddict Authorization endpoint with a 
response type of ```'token id_token'```. In the OpenId Connect specifications, this approach is referred to as the Implicit Flow. Currently, the
solution is configured to use JSON Web Tokens and uses the Microsoft.AspNetCore.Authentication.JwtBearer library in both the 
resource and server projects to validate and authenticate the access token. Rather than configuring the javascript client, integration 
with external social authentication providers such as Google and Twitter is accomplished by modifying the server project following 
steps detailed in the [ASP.NET Core Identity documentation](https://docs.asp.net/en/latest/security/authentication/sociallogins.html).


## Preparing to run

### Overview

This sample was developed in Visual Studio 2015 and thus far as only been tested while running in that IDE. While each of the projects 
could be run from the command line, the redirectUris and postLogoutRedirectUris referenced by both server and client projects would
need to be altered. 

The solution is divided into three separate projects to simulate an environment where client, authorization, and resource servers
are physically separated.  
   - client project: modified version of the [aurelia skeleton-typescript-aspnetcore](https://github.com/aurelia/skeleton-navigation) to include OpenIddict integration.
   - server project: modified version of the standard ASP.NET Core Web Application project template with Individual User Accounts Authentication to include integration with **[OpenIddict](https://github.com/openiddict/openiddict-core)** with very little deviation from the steps documented in that repo, and
   - resources project: ASP.NET Core Web Api project that retrieves ToDo items for the currently authenticated user.

### Client Project

The **client** project has the same dependencies as the aurelia / skeleton-typescript-aspnetcore project. To run the application, you'll need to have both
**[node.js](https://chocolatey.org/packages/nodejs)** and **[git](https://chocolatey.org/packages/git.install)** installed. You can use 
[chocolatey](https://chocolatey.org/) to install both. Once node.js is installed, if not already installed globally, execute the following 
commands to install gulp, jspm, and typings packages globally. 
  1. gulp: npm install -g gulp
  2. jspm: npm install -g jspm
  3. typings: npm install -g typings

Once node.js and the packages above have been installed, open a command window and navigate to the root of the client project 
(i.e. c:\github\aurelia-openiddict\client). At the client project root, execute ```npm install```. The process could take some time depending on the
speed of your internet connection as all the npm, jspm, and typings dependencies are downloaded.

### Resources and Server Projects

Presently, the connection strings for both the **resources** and the **server** project point to a localdb instance of SQL Server. Before
running the samples, execute ```dotnet ef database update``` at a command prompt at the root of both of these projects to create
the necessary database objects for the solution to execute.  

### Application Flow

The solution is currently a work in-progress. Therefore, there is no registration link nor are there any links currently in the client
project that allow for user account maintenance. Though you can create an account by clicking on the Login link, and then selecting the 
'Register as a new user' option on the login form when presented, depending on how you register the new account, through local email
address and password, Google, or Twitter, you'll always have to use that method to login from the client.  Presently, the best approach for
account maintainence would be to navigate to the server, http://localhost:54540, and create and maintain a user account from that site.
The server site uses the out-of-the-box functionality present in the ASP.NET Core Web Application tempate with Individual User Accounts 
authentication so that you can create a single user account through local email account and password that is linked to both Google and 
Twitter social authentication providers.

When you login from the client and successfully authenticate, the server will return several pieces of information back. 

- **access_token**: saved in local storage with the default key value of aurelia-authentication and needed to access the protected web api resources. The name of the local storage key is configurable in the authConfig.ts file.
- **id_token**: also saved in local storage with the default key value of aurelia-authentication. The id_token is needed for successful calls to the Logout endpoint, and
- **authentication cookie**: ASP.NET Identity saves an authentication cookie that is also needed for successful calls to the Logout endpoint.

## How the solution was created

### Server Project

The following steps were followed in the creation of the **server project**.

1. Create a new ASP.Net Core Web Application leveraging individual user account authentication.
      1. Click on File - New Project.
      2. Under Visual C# – .NET Core, pick the ASP.NET Core Web Application (.NET Core) template.
      3. On the New ASP.NET Core Project dialog, pick the Web Application template.
      4. Click Change Authentication and pick Individual User Account authentication.
2. Integrate OpenIddict into the request pipeline
     1. Following all steps outlined in the Readme.


