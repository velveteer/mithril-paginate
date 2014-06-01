## Mithril-Paginate

A Mithril component that takes a list of objects in JSON and paginates it.

Example usage:

```
var mpaginate = require('./mpaginate.js');

// Mock some data
var list1 = [];
for (var i = 0; i<50; i++) {
    list1.push({'Name':'John #'+i, 'Clone': i, 'Born': new Date(2014, 2, i)})
}

// Get list async -- m.request can also be used here
var getList = function(list) {
    m.startComputation();
    var deferred = m.deferred();
    setTimeout(function() {
        deferred.resolve(list);
        m.endComputation();
    }, 2000);
    return deferred.promise;
};

// Module namespace
var grid = {};

// Model
grid.list = m.prop([]);

// Custom cell functions
var nameLink = function() { return [ m('a', {href: 'profile/' + this.Name}, this.Name) ]};
var isEven = function() { return this.Clone % 2 ? 'no' : 'yes'};

// Set mpaginate options
grid.options = {
    headers: ['Name', 'Clone', 'Born', 'Even'],
    cells: [nameLink, 'Clone', 'Born', isEven]
}

// Inject mpaginate controller into parent controller
grid.controller = function() {
    this.mpaginate = new mpaginate.controller(grid.list, grid.options);
}

// Hook mpaginate view into parent view
grid.view = function(ctrl) {
    return mpaginate.view(ctrl.mpaginate);
}

// Get list async then populate model
getList(list1).then(grid.list)

// Instantiate Mithril model
m.module(document.body, grid);

```

The controller takes a list to be paginated and an optional options object. Options include:

####rowsPerPage
+ Default: 5

####headers
+ Default: JSON keys. Accepts a list of strings or functions. Populates table headers.

####cells
+ Default: JSON values. Accepts a list of strings or functions. Populates table cells.

####rowAttr
+ Default: {}. Accepts an object for setting attributes on table rows.


### Example
[http://jsfiddle.net/Pu6r5/7/](http://jsfiddle.net/Pu6r5/7/)

### Notes
This is a work in progress and there are bugs. Contributions and criticisms are welcome.
