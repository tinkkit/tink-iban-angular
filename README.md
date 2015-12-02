# Tink IBAN Angular directive

v1.0.1

## What is this repository for?

The Tink Angular IBAN directive provides you with an input field preformatted for international bank account numbers.

Tink is an in-house developed easy-to-use front end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:
   `bower install tink-iban-angular --save`

2. Add the following files to your project:

    `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

    `<script src="bower_components/tink-iban-angular/dist/tink-iban-angular.js"></script>`

    `<script src="bower_components/tink-helper-format-angular/dist/tink-helper-format-angular.js"></script>`

    `<script src="bower_components/tink-helper-safe-apply-angular/dist/tink-helper-safe-apply-angular.js"></script>`

    `<script src="bower_components/iban/iban.js"></script>`

3. Add `tink.iban` to your app module's dependency.

    `angular.module('myApp', ['tink.iban']);`

4. On http://tink.digipolis.be you will find all necessary documentation.


----------


## How to use

### Component

```html
<tink-iban required="required" name="ibanField" data-ng-model="ibanModel"></tink-iban>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-ng-model (required) | `[object]` | `[]` | This variable holds the preformatted text.

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)
