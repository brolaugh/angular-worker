# AngularWorker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run the following commands in parallel

 * `ng build --watch`
 * `npx http-server -p 4200 dist/angular-worker`
 * `ts-node backend/backend.ts` 
 
 Navigate to `http://localhost:4200/`. The app will NOT reload automatically on file changes. If you're planning on making changes, always check them out in incognito because otherwise your browser will cache the living shit out of your shared worker... also when you do make changes close all incognito tabs before checking out the changes.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
