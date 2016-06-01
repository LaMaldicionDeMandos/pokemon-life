/**
 * Created by boot on 5/7/16.
 */
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

var firstLon = p[3].lon;

var greaterThan = [
    {minLat: p[3].lat, maxLat: p[2].lat, c: Area.slope(p[2], p[3])},
    {minLat: p[2].lat, maxLat: p[1].lat, c: Area.slope(p[1], p[2])},
    {minLat: p[1].lat, maxLat: p[0].lat, c: Area.slope(p[0], p[1])},
];

var lessThan = [
    {minLat: p[3].lat, maxLat: p[4].lat, c: Area.slope(p[4], p[3])},
    {minLat: p[4].lat, maxLat: p[5].lat, c: Area.slope(p[5], p[4])},
    {minLat: p[5].lat, maxLat: p[6].lat, c: Area.slope(p[6], p[5])},
    {minLat: p[6].lat, maxLat: p[7].lat, c: Area.slope(p[7], p[6])},
    {minLat: p[7].lat, maxLat: p[8].lat, c: Area.slope(p[8], p[7])},
    {minLat: p[8].lat, maxLat: p[9].lat, c: Area.slope(p[9], p[8])},
    {minLat: p[9].lat, maxLat: p[0].lat, c: Area.slope(p[0], p[9])}

];

var area = new Area(p, lessThan, greaterThan, firstLon);

module.exports = area;