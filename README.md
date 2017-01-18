<!--
@Author: mars
@Date:   2016-12-28T03:12:38-05:00
@Last modified by:   mars
@Last modified time: 2016-12-29T19:25:39-05:00
-->

# countdown
angular-cli, angular-material, angular-moment

# Goal
Count down till end of year

# Step by step

* install angula cli
```sh
npm install -g angular-cli
```
* create new project/app
```sh
ng new angular-countdown
```
* install required dependancies
```sh
npm install --save @angular/material
npm install --save angular2-moment
```
* import external modules
```javascript
// src/app/app.module.ts
@NgModule({
  ...
  imports: [
    ...
    MomentModule,
    MaterialModule.forRoot(),
    ...
  ],
  ...
})
```
* create a countdown component
```sh
ng generate component countdown-component
```
* add logic to the component
```

```
* register the component
* display the component





## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Deploying to Github Pages

Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
