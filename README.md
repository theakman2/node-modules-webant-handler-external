# node-modules-webant-handler-external

_Require externally hosted javascript and CSS files with [webant](https://github.com/theakman2/node-modules-webant)_

## Installation

There should be no need to install this module since it\'s required by the [webant](https://github.com/theakman2/node-modules-webant) module by default.

If for some reason you\'d like to use the module outside of webant, install as follows:

    $ npm install webant-handler-external

## Usage

Ensure the `external` handler is present in your webant configuration file.

An example configuration file which uses this handler may look like this:

````json
{
    "jsEntryPath":"%%base%%/src/js/main.js",
    "jsDestPath":"%%base%%/build/main.js",
    "htmlEntryPath":"%%base%%/src/index.hbs",
    "htmlDestPath":"%%base%%/build/index.html",
    "handlers":{
        "external":{}
    }
}
````

Note that both `htmlEntryPath` and `htmlDestPath` must be defined to make full use of this handler.

You may now `require` CSS files via the comment style:

````javascript
//=>require https://awebsite.com/path/to/styles.css
//=>require http://another.website.net/assets/popularlibrary.js
````

All external files `require`d this way can be accessed in the handlebars file at `htmlEntryPath` as follows:

```html
<!DOCTYPE html>
    <head>
        {{#each externalCss}}<link rel="stylesheet" type="text/css" href="{{{this}}}" />{{/each}}
        {{#each externalJs}}<script type="text/javascript" src="{{{this}}}"></script>{{/each}}
    </head>

    <body>
    
    </body>
</html>
```

See the [webant](https://github.com/theakman2/node-modules-webant) module for more information.

## Tests

    $ npm test