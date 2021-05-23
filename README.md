⚠️ In order to run this project you have to disable web security in your navigator. ⚠️

For windows:

```bash
./chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```

For mac:

```bash
open /Applications/Google\ Chrome.app --args --user-data-dir="/var/tmp/Chrome dev session" --disable-web-security
```

For linux:

```bash
chromium-browser --disable-web-security --user-data-dir="/tmp"
```

Once you disabled your navigator web-security you can try a [demo here](https://ouassimbenmosbah.github.io/self-service-bicycles/#/stations)

# SelfServiceBicycles

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
