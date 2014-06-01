var mpaginate = require('./mpaginate.js');

// Mock some data
var list1 = [];
for (var i = 0; i<50; i++) {
    list1.push({'Random': i*Math.random(), 'Name':'John #'+i, 'Clone': i, 'Born': new Date(2014, 2, i)})
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

// Cell functions
var nameLink = function() { return [ m('a', {href: 'profile/' + this.Name}, this.Name) ]};
var isEven = function() { return this.Clone % 2 ? 'no' : 'yes'};

// Set mpaginate options
grid.options = {
    headers: ['Name', 'Clone', 'Born', 'Even', 'Random'],
    cells: [nameLink, 'Clone', 'Born', isEven, 'Random']
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
m.module(document.getElementById('table'), grid);

