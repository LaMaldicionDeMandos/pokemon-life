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

describe('Metropolitan Area', function() {
    var service;
    beforeEach(function() {
        service = new Area(p);
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
        var lessThan = [
            {minLat: 0, maxLat: 1, c: 1},
            {minLat: 1, maxLat: 2, c: -1}
        ];
        var greaterThan = [
            {minLat: 0, maxLat: 1, c: 3},
            {minLat: 1, maxLat: 2, c: -3}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan);
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
            {lat: 2, lon: 0},
            {lat: 1, lon: 1}
        ];
        var lessThan = [
            {minLat: 0, maxLat: 1, c: 1},
            {minLat: 1, maxLat: 2, c: -1}
        ];
        var greaterThan = [
            {minLat: 0, maxLat: 1, c: 3},
            {minLat: 1, maxLat: 2, c: -3}
        ];
        beforeEach(function() {
            service = new Area(p, lessThan, greaterThan);
        });
        it('should unmatch under', function() {
            var p = {lat: 1, lon: 0};
            assert(!service.match(p));
        });

        it('should unmatch over', function() {
            var p = {lat: 1, lon: 4};
            assert(!service.match(p));
        });

        it('should unmatch over x', function() {
            var p = {lat: 3, lon: 0};
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
});