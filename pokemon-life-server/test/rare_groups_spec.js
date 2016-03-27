/**
 * Created by boot on 3/27/16.
 */
var assert = require('assert');
var service = require('../model/rare_groups');
describe('Group size', function() {
    it('should are 16034', function() {
        var size = service.groupSize();
        assert.equal(size, 16034);
    })
})