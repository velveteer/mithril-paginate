var m = require('mithril');

var mpaginate = {};

function range(start, stop) {
    var length = Math.max(Math.ceil((stop - start)), 0);
    var idx = 0;
    var range = new Array(length);
    while(idx < length) { range[idx++] = start; ++start; }
    return range;
}

function keys(list) {
    return function() {
        return typeof list()[0] === 'object' ? Object.keys(list()[0]) : []
    }
}

// Controller
mpaginate.controller = function(list, options) {
    var options = options || {};

    this.rowsPerPage = options.rowsPerPage && options.rowsPerPage.length > 0 ? m.prop(options.rowsPerPage) : m.prop(5); // Number of rows per page
    this.headers = options.headers && options.headers.length > 0 ? m.prop(options.headers) : keys(list); // List of headers for <th> elements
    this.cells = options.cells && options.cells.length > 0 ? m.prop(options.cells) : keys(list); // List of values to show for <td> elements
    this.rowAttr = options.rowAttr ? m.prop(options.rowAttr) : m.prop({}); // Object to apply attributes to <tr> elements

    this.currentPage = m.prop(1); // Current page is reset on each load
    this.startPage = m.prop(0); // The first page the controls start on
    this.endPage = m.prop(5); // The last page to show in the controls

    // Slice list into pages
    this.paginated = function() {
        return list().slice((this.currentPage()-1) * this.rowsPerPage(),
            ((this.currentPage()-1)*this.rowsPerPage()) + this.rowsPerPage());
    }.bind(this);

    // Calculate how many pages to generate
    this.numPages = function() {
        var numPages = 0;
        if (list() !== null && this.rowsPerPage() !== null) {
            numPages = Math.ceil(list().length / this.rowsPerPage());
        }
        return range(1, numPages+1);
    }.bind(this);

    // Show next pages in controls
    this.nextPage = function() {
        var start = this.startPage();
        var end = this.endPage();
        if (this.endPage() !== this.numPages()) {
            this.startPage(start + 1);
            this.endPage(end + 1);
        }
    }.bind(this);

    // Show previous pages in controls
    this.prevPage = function() {
        var start = this.startPage();
        var end = this.endPage();
        if (this.startPage() > 0) {
            this.startPage(start - 1);
            this.endPage(end - 1);
        }
    }.bind(this);
}

// View
mpaginate.view = function(ctrl) {
    return [
        m('table.table', [
            m('thead', [
                m('tr', [
                    ctrl.headers().map(function(header) {
                        return m('th', header)
                    })
                ])
            ]),
            m('tbody', [
                ctrl.paginated().map(function(item) {
                    return m('tr', typeof ctrl.rowAttr() === 'function' ? ctrl.rowAttr().call(item) : ctrl.rowAttr(),
                        [ ctrl.cells().map(function(cell) {
                            return typeof cell === 'function' ?  m('td', cell.call(item)) : m('td', item[cell]) })
                    ])
                })
            ]),
        ]),
        m('ul.list-inline.text-center', [
            ctrl.startPage() > 0 ? m('li', [ m('a.btn.btn-default.btn-sm', {onclick: ctrl.prevPage}, '<<' )]) : null,
            ctrl.numPages().length < 2 ? null : ctrl.numPages().slice(ctrl.startPage(), ctrl.endPage()).map(function(page, index) {
                return m('li', [
                    m('a', {
                        onclick: m.withAttr('innerHTML', ctrl.currentPage),
                        class: ctrl.currentPage() == page ? 'btn btn-default btn-sm active' : 'btn btn-default btn-sm'}, page)
                    ])
                }),
            ctrl.numPages().length > ctrl.endPage() ? m('li', [ m('a.btn.btn-default.btn-sm', {onclick: ctrl.nextPage}, '>>')]) : null
        ])
    ]
}

module.exports = mpaginate;
