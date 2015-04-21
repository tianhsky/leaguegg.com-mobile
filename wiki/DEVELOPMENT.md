## Package Management

  - bower - manage js packages, if found in bower, add to bower.json, then run "bower install", if not found in bower, add to www/lib


## Compile Runtime

### Prerequisites

  - node.js
  - cordova
  - java
  - android sdk
  - ant
  - scss

### Android

    cordova platform add android

### IOS

    sudo npm install -g ios-sim
    sudo npm install -g ios-deploy
    cordova platform add ios

## Run Application

### Android

    scripts/run_android

### IOS

    scripts/run_ios