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

var area = new Area(p);

area.lessThan = [
    {minLat: p[1], maxLat: p[0], c: area.slope(p[0], p[1])},
    {minLat: p[2], maxLat: p[1], c: area.slope(p[1], p[2])},
    {minLat: p[3], maxLat: p[2], c: area.slope(p[2], p[3])},
];

area.greaterThan = [
    {minLat: p[9], maxLat: p[0], c: area.slope(p[0], p[9])},
    {minLat: p[8], maxLat: p[9], c: area.slope(p[9], p[8])},
    {minLat: p[7], maxLat: p[8], c: area.slope(p[8], p[7])},
    {minLat: p[6], maxLat: p[7], c: area.slope(p[7], p[6])},
    {minLat: p[5], maxLat: p[6], c: area.slope(p[6], p[5])},
    {minLat: p[4], maxLat: p[5], c: area.slope(p[5], p[4])},
    {minLat: p[3], maxLat: p[4], c: area.slope(p[4], p[3])}
];

module.exports = area;