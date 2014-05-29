paginate = new Mpaginate();
paginate2 = new Mpaginate();

// Mock some data
var list1 = [];
for (var i = 0; i<50; i++) {
    list1.push({'Random': i*Math.random(), 'Name':'John #'+i, 'Clone': i, 'Born': new Date(2014, 2, i)})
}

var randomJSON = [
    {
        "id": 0,
        "guid": "94d891a2-5bc5-448c-8ece-63a1c9744231",
        "isActive": true,
        "balance": "$3,897.86",
        "picture": "http://placehold.it/32x32",
        "age": 24,
        "eyeColor": "brown",
        "name": "Lola Blevins",
        "gender": "female",
        "company": "MOREGANIC",
        "email": "lolablevins@moreganic.com",
        "phone": "+1 (815) 462-2910",
        "registered": "2014-01-25T10:34:20 +06:00",
        "latitude": -36.185287,
        "longitude": 179.57708,
        "tags": [
            "fugiat",
            "laborum",
            "elit",
            "deserunt",
            "excepteur",
            "est",
            "consequat"
        ]
    },
    {
        "id": 1,
        "guid": "7af5a0b6-dbac-4a8a-ac6a-a328560ff69e",
        "isActive": false,
        "balance": "$1,608.81",
        "picture": "http://placehold.it/32x32",
        "age": 20,
        "eyeColor": "blue",
        "name": "West Dunn",
        "gender": "male",
        "company": "XEREX",
        "email": "westdunn@xerex.com",
        "phone": "+1 (911) 535-2791",
        "registered": "2014-02-16T17:15:55 +06:00",
        "latitude": -1.72706,
        "longitude": 155.638468,
        "tags": [
            "reprehenderit",
            "dolore",
            "nulla",
            "eiusmod",
            "laboris",
            "cupidatat",
            "aliquip"
        ]
    },
    {
        "id": 2,
        "guid": "67cb9ece-518c-4c5c-9312-945a5c1ca93c",
        "isActive": false,
        "balance": "$3,936.09",
        "picture": "http://placehold.it/32x32",
        "age": 27,
        "eyeColor": "brown",
        "name": "Edna Hoover",
        "gender": "female",
        "company": "EXTRAGENE",
        "email": "ednahoover@extragene.com",
        "phone": "+1 (811) 567-3514",
        "registered": "2014-05-02T22:44:48 +05:00",
        "latitude": -30.638981,
        "longitude": 145.236228,
        "tags": [
            "fugiat",
            "irure",
            "excepteur",
            "veniam",
            "aliqua",
            "cupidatat",
            "tempor"
        ]
    },
    {
        "id": 3,
        "guid": "d471cf6b-cd13-415c-a6eb-fea957611c7f",
        "isActive": true,
        "balance": "$3,719.32",
        "picture": "http://placehold.it/32x32",
        "age": 34,
        "eyeColor": "green",
        "name": "Brenda Hickman",
        "gender": "female",
        "company": "GOLISTIC",
        "email": "brendahickman@golistic.com",
        "phone": "+1 (940) 509-2302",
        "registered": "2014-04-30T04:51:24 +05:00",
        "latitude": -44.32226,
        "longitude": -158.394294,
        "tags": [
            "exercitation",
            "sint",
            "et",
            "nisi",
            "deserunt",
            "minim",
            "nostrud"
        ]
    },
    {
        "id": 4,
        "guid": "586d509a-1664-4cf3-a848-8a5cc9e5e5d2",
        "isActive": false,
        "balance": "$3,131.31",
        "picture": "http://placehold.it/32x32",
        "age": 21,
        "eyeColor": "blue",
        "name": "Alison Sutton",
        "gender": "female",
        "company": "INTRADISK",
        "email": "alisonsutton@intradisk.com",
        "phone": "+1 (827) 530-3665",
        "registered": "2014-02-17T12:50:08 +06:00",
        "latitude": -14.750654,
        "longitude": -59.497017,
        "tags": [
            "quis",
            "sit",
            "deserunt",
            "ut",
            "ipsum",
            "voluptate",
            "dolor"
        ]
    }
]

// Get list async
var getList = function(list) {
    m.startComputation();
    var deferred = m.deferred();
    setTimeout(function() {
        deferred.resolve(list);
        m.endComputation();
    }, 2000);
    return deferred.promise;
};

// Set custom headers
paginate.headers(['Name', 'Clone', 'Born', 'Even', 'Random']);

// Set values to display
var nameLink = function() { return [ m('a', {href: 'profile/' + this.Name}, this.Name) ]};
var isEven = function() { return this.Clone % 2 ? 'no' : 'yes'};
paginate.cells([nameLink, 'Clone', 'Born', isEven, 'Random']);

// Set rows per page
paginate.rowsPerPage(5);
paginate2.rowsPerPage(1);

// Get list async then paginate the list
getList(list1).then(paginate.list);
getList(randomJSON).then(paginate2.list);

m.module(document.getElementById('table'), paginate);
m.module(document.getElementById('table2'), paginate2);
