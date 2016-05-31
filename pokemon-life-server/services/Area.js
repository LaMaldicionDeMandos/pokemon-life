/**
 * Created by boot on 5/7/16.
 */
function minSquareLat(points) {
    return points.sort(function(a, b) {
        return a.lat - b.lat;
    })[0].lat;
}

function minSquareLon(points) {
    return points.sort(function(a, b) {
        return a.lon - b.lon;
    })[0].lon;
}

function maxSquareLat(points) {
    return points.sort(function(a, b) {
        return b.lat - a.lat;
    })[0].lat;
}

function maxSquareLon(points) {
    return points.sort(function(a, b) {
        return b.lon - a.lon;
    })[0].lon;
}

function findTramaIndex(x, funcs) {
    for(var i = 0;i < funcs.length; i++) {
        if(funcs[i].maxLat >= x) {
            return i;
        }
    }
    return null;
};

var Area = function(points, lt, gt) {
    var points = points;
    this.minSquareLat = minSquareLat(points);
    this.minSquareLon = minSquareLon(points);
    this.maxSquareLat = maxSquareLat(points);
    this.maxSquareLon = maxSquareLon(points);
    this.slope = function(p1, p2) {
        return (p2.lon - p1.lon)/(p2.lat - p1.lat);
    };
    this.lt = lt;
    this.gt = gt;
    this.f = function(x, t) {
        if (x < t[0].minLat || x > t[t.length-1].maxLat) {
            throw new Error('Illegal arguments x must be [' + t[0].minLat + ', ' + t[t.length-1].maxLat +
                '] and was ' + x);
        }
        var index = findTramaIndex(x, t);
        if (index == 0) {
            return t[index].c*x + this.minSquareLat;
        } else {
            return t[index].c*(x - t[index].minLat) + this.f(t[index-1].maxLat, t);
        }
    };
    this.lf = function(x) {
        var v = this.f(x, this.lt);
        return v;
    };
    this.gf = function(x) {
        return this.f(x, this.gt);
    };

    this.match = function(p) {
        try {
            var less = this.lf(p.lat);
            var greater = this.gf(p.lat);
            return p.lon >= less && p.lon <= greater;
        } catch(e) {
            return false;
        }

    };

    this.createSquarePoint = function() {
        var lat = Math.random()*(this.maxSquareLat - this.minSquareLat) + this.minSquareLat;
        var lon = Math.random()*(this.maxSquareLon - this.minSquareLon) + this.minSquareLon;
        return {lat: lat, lon: lon};
    };

    this.createPoint = function() {
        var found = false;
        var iterations = 0;
        while(!found) {
            iterations++;
            var point = this.createSquarePoint();
            found = this.match(point);
        }
        console.log('Iteraciones: ' + iterations);
        return point;
    };
};

module.exports = Area;