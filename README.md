## Mithril-Paginate

An example Mithril module that takes a list of objects in JSON and paginates it.

The module is wrapped in a constructor so that multiple instances can be used within a single app.

Example usage:

```

// Instantiate new paginate module
paginate = new Mpaginate();

// Example list data
var list = [];
for (var i = 0; i<50; i++) {
    list.push({'Random': i*Math.random(), 'Name':'John #'+i, 'Clone': i, 'Born': new Date(2014, 2, i)})
}

// Get JSON async (can be replaced with m.request)
var getList = function() {
    m.startComputation();
    var deferred = m.deferred();
    setTimeout(function() {
        deferred.resolve(list);
        m.endComputation();
    }, 2000);
    return deferred.promise;
};

getList().then(paginate.list);
m.module(document.body, paginate);

```

A table will be rendered using the default properties of the module. Properties that can be set include:

####paginate.list()
+ Default: []. Accepts JSON.

####paginate.rowsPerPage()
+ Default: 5

####paginate.headers()
+ Default: JSON keys. Accepts a list of strings or functions. Populates table headers.

####paginate.cells()
+ Default: JSON values. Accepts a list of strings or functions. Populates table cells.

####paginate.rowAttr()
+ Default: {}. Accepts an object for setting attributes on table rows.

This is a work in progress and there are bugs. Contributions and criticisms are welcome.

### Example
[http://jsfiddle.net/Pu6r5/5/](http://jsfiddle.net/Pu6r5/5/)


