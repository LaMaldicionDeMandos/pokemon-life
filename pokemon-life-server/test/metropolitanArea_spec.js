/**
 * Created by boot on 3/27/16.
 */

var assert = require('assert');
var Area = require('../services/Area');

p = [
    {lat: -34.35477416538756, lon: -58.64776611328125},
    {lat: -34.85889049125781, lon: -57.9254150390625},
    {lat: -34.909584037461684,lon: -57.86293029785156},
    {lat: -34.978252010192584, lon: -57.855377197265625},
    {lat: -34.97487624147656, lon: -57.96661376953125},
    {lat: -34.944488062306256, lon: -58.03802490234375},
    {lat: -34.857481890865174, lon: -58.260498046875},
    {lat: -34.85156550582557, lon: -58.49945068359375},
    {lat: -34.70436443445847, lon: -58.80157470703125},
    {lat: -34.504859090252026, lon: -58.82904052734375}
];

firstLon = p[3].lon;
greaterThan = [
    {minLat: p[3].lat, maxLat: p[2].lat, c: Area.slope(p[2], p[3])},
    {minLat: p[2].lat, maxLat: p[1].lat, c: Area.slope(p[1], p[2])},
    {minLat: p[1].lat, maxLat: p[0].lat, c: Area.slope(p[0], p[1])},
];

lessThan = [
    {minLat: p[3].lat, maxLat: p[4].lat, c: Area.slope(p[4], p[3])},
    {minLat: p[4].lat, maxLat: p[5].lat, c: Area.slope(p[5], p[4])},
    {minLat: p[5].lat, maxLat: p[6].lat, c: Area.slope(p[6], p[5])},
    {minLat: p[6].lat, maxLat: p[7].lat, c: Area.slope(p[7], p[6])},
    {minLat: p[7].lat, maxLat: p[8].lat, c: Area.slope(p[8], p[7])},
    {minLat: p[8].lat, maxLat: p[9].lat, c: Area.slope(p[9], p[8])},
    {minLat: p[9].lat, maxLat: p[0].lat, c: Area.slope(p[0], p[9])}

];

describe('Metropolitan Area', function() {
    var service;
    beforeEach(function() {
        service = new Area(p, lessThan, greaterThan, firstLon);
    });

    describe('Slope', function() {
        it('slope((2,5), (4,9)) = (9 - 5)/(4 - 2) = 4/2 = 2', function() {
            var result = service.slope({lat: 2, lon: 5}, {lat: 4, lon: 9});
            assert.equal(result, 2);
        });
    });

    describe('function area {(0,0),(1,3),(2,0),(1,1)', function() {
        var p = [
            {lat: 0, lon: 0},
            {lat: 1, lon: 3},
            {lat: 2, lon: 0},
            {lat: 1, lon: 1}
        ];

        var firstLon = 0;
        var lessThan = [
            {minLat: 0, maxLat: 1, c: 1},
            {minLat: 1, maxLat: 2, c: -1}
        ];
        var greaterThan = [
            {minLat: 0, maxLat: 1, c: 3},
            {minLat: 1, maxLat: 2, c: -3}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan, firstLon);
        });
        it('lessthan function(0) = 0', function() {
            var result = service.lf(0);
            assert.equal(result, 0);
        });
        it('lessthan function(1) = 1', function() {
            var result = service.lf(1);
            assert.equal(result, 1);
        });
        it('lessthan function(2) = 0', function() {
            var result = service.lf(2);
            assert.equal(result, 0);
        });

        it('greaterhan function(0) = 0', function() {
            var result = service.gf(0);
            assert.equal(result, 0);
        });
        it('greaterthan function(1) = 3', function() {
            var result = service.gf(1);
            assert.equal(result, 3);
        });
        it('greaterhan function(2) = 0', function() {
            var result = service.gf(2);
            assert.equal(result, 0);
        });
    });

    describe('Match points', function() {
        var p = [
            {lat: 0, lon: 0},
            {lat: 1, lon: 3},
            {lat: 2, lon: 2},
            {lat: 3, lon: -1},
            {lat: 1, lon: -2},
        ];
        var firstLon = 0;
        var lessThan = [
            {minLat: 0, maxLat: 1, c: -2},
            {minLat: 1, maxLat: 3, c: 0.5}
        ];
        var greaterThan = [
            {minLat: 0, maxLat: 1, c: 3},
            {minLat: 1, maxLat: 2, c: -1},
            {minLat: 2, maxLat: 3, c: -3}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan, firstLon);
        });
        it('should unmatch under', function() {
            var p = {lat: 1, lon: -3};
            assert(!service.match(p));
        });

        it('should unmatch over', function() {
            var p = {lat: 1, lon: 4};
            assert(!service.match(p));
        });

        it('should unmatch over x', function() {
            var p = {lat: 4, lon: 0};
            assert(!service.match(p));
        });

        it('should unmatch under x', function() {
            var p = {lat: -1, lon: 0};
            assert(!service.match(p));
        });

        it('should match into', function() {
            var p = {lat: 1, lon: 2};
            assert(service.match(p));
        });

        it('should match into 2', function() {
            var p = {lat: 1, lon: 0};
            assert(service.match(p));
        });

        it('should match into 3', function() {
            var p = {lat: 2.5, lon:.2};
            assert(service.match(p));
        });

        it('should match in limits', function() {
            var p1 = {lat: 1, lon: 1};
            var p2 = {lat: 0, lon: 0};
            var p3 = {lat: 2, lon: 0};
            var p4 = {lat: 1, lon: 3};
            assert(service.match(p1));
            assert(service.match(p2));
            assert(service.match(p3));
            assert(service.match(p4));
        });

        it('should match in any', function() {
            var p1 = {lat: 1.5, lon: 0.7};
            var p2 = {lat: 0.5, lon: 1};
            assert(service.match(p1));
            assert(service.match(p2));
        });
    });

    describe('Min and Max', function() {
        it('minSquareLat', function() {
            var minLat = service.minSquareLat;
            assert.equal(-34.978252010192584, minLat);
        });

        it('minSquareLon', function() {
            var minLon = service.minSquareLon;
            assert.equal(-58.82904052734375, minLon);
        });

        it('maxSquareLat', function() {
            var maxLat = service.maxSquareLat;
            assert.equal(-34.35477416538756, maxLat);
        });

        it('maxSquareLon', function() {
            var maxLon = service.maxSquareLon;
            assert.equal(-57.855377197265625, maxLon);
        });
    });

    describe('Internal square point', function() {
        it('should be internal the square', function() {
            var point = service.createSquarePoint();
            assert(point.lat >= service.minSquareLat);
            assert(point.lat <= service.maxSquareLat);
            assert(point.lon >= service.minSquareLon);
            assert(point.lon >= service.minSquareLon);
        });
    });

    describe('Internal area point', function() {
        var p = [
            {lat: 0, lon: 0},
            {lat: 1, lon: 3},
            {lat: 2, lon: 0},
            {lat: 1, lon: 1}
        ];

        var firstLon = 0;
        var lessThan = [
            {minLat: 0, maxLat: 1, c: 1},
            {minLat: 1, maxLat: 2, c: -1}
        ];
        var greaterThan = [
            {minLat: 0, maxLat: 1, c: 3},
            {minLat: 1, maxLat: 2, c: -3}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan, firstLon);
        });
        it('should be internal the area', function() {
            var point = service.createPoint();
            assert(service.match(point));
        });
    });

    describe('Complex values', function() {
        var p = [
            {lat: -5, lon: -2},
            {lat: -4, lon: 0},
            {lat: -3, lon: -3},
            {lat: -2, lon: -4},
            {lat: -4, lon: -8},
        ];
        var firstLon = -2;
        var lessThan = [
            {minLat: -5, maxLat: -4, c: -6},
            {minLat: -4, maxLat: -2, c: 2}
        ];
        var greaterThan = [
            {minLat: -5, maxLat: -4, c: 2},
            {minLat: -4, maxLat: -3, c: -3},
            {minLat: -3, maxLat: -2, c: -1}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan, firstLon);
        });
        it('-2.5 should match in -4.5', function() {
            assert(service.match({lat: -2.5, lon: -4.5}));
        });
        it('-4.5 should match in -3', function() {
            assert(service.match({lat: -4.5, lon: -3}));
        });
    });

    describe('Real values', function() {
        var point = {lat:-34.52278882128688, lon:-58.51549427423343};
        it('should match', function() {
            assert(service.match(point));
        });
    });
});