# Boilerplate-Module-SmartJS-Angular

## Overview

- Structure : 
    - /controller
        - Contain api route endpoint with their model and specific middleware
    - /model
        - list of function, class, method needed for this module (Injected in back)
    - view
        - dist (App compiled folder)
        - source (Source file of front application - Angular, React etc...)

## QuickStart

Start your development into `source/src/app`

Each module is like a new application. 
Your application will be available at http://localhost/<module_name>

**<module_name> correspond to your module folder**

Test your app with basic angular testing and development tools :
`npm start` and go to: http://localhost:4200

When its done just build your app with this following command to
 create `/dist` folder and build file :
`node --max_old_space_size=6144 ./node_modules/@angular/cli/bin/ng build --prod --base-href
 /<module_name>/ --rebase-root-relative-css-urls=true`


## Installing Module into SmartJS

Just put your package in root module path `/module` in root of SmartJS application;
