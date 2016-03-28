/**
 * Created by boot on 3/27/16.
 */
var assert = require('assert');
var service = require('../model/rare_groups');
describe('Group', function() {
    it('size should are 16034', function() {
        var size = service.groupSize();
        assert.equal(size, 16034);
    });

    it('the random number must be between 0 and 16034', function() {
        var num = service.getRandomNumber(16034);
        assert.ok(0 <= num);
        assert.ok(16034 > num);
    });

    it('if group is of 1 pokemon, then, should return always same pokemon', function() {
        var group = service.groups[1];
        var pokemon = service.getRandomPokemonInGroup(group);
        for(var i = 0; i < 100; i++) {
            assert.equal(pokemon, 113);
        }
    });

    it('if group is of 2 pokemon, then, should return always one of two', function() {
        var group = service.groups[3];
        var pokemon = service.getRandomPokemonInGroup(group);
        for(var i = 0; i < 100; i++) {
            assert.ok(36 == pokemon || 143 == pokemon);
        }
    });

    it('if the number is between 0 and 12, then group is the first', function() {
        var group = service.getGroup(0);
        assert.equal(group, service.groups[0]);
        group = service.getGroup(11);
        assert.equal(group, service.groups[0]);
        group = service.getGroup(12);
        assert.equal(group, service.groups[0]);
    });

    it('if the number is between 13 and 42, then group is the second', function() {
        var group = service.getGroup(13);
        assert.equal(group, service.groups[1]);
        group = service.getGroup(41);
        assert.equal(group, service.groups[1]);
        group = service.getGroup(42);
        assert.equal(group, service.groups[1]);
    });

    it('if the number is between 42 and 77, then group is the third', function() {
        var group = service.getGroup(43);
        assert.equal(group, service.groups[2]);
        group = service.getGroup(76);
        assert.equal(group, service.groups[2]);
        group = service.getGroup(77);
        assert.equal(group, service.groups[2]);
    });

    it('if the number is between 77 and 127, then group is the fourth', function() {
        var group = service.getGroup(78);
        assert.equal(group, service.groups[3]);
        group = service.getGroup(126);
        assert.equal(group, service.groups[3]);
        group = service.getGroup(127);
        assert.equal(group, service.groups[3]);
    });

    it('if the number is between 127 and 227, then group is the fifth', function() {
        var group = service.getGroup(128);
        assert.equal(group, service.groups[4]);
        group = service.getGroup(226);
        assert.equal(group, service.groups[4]);
        group = service.getGroup(227);
        assert.equal(group, service.groups[4]);
    });

    it('if the number is between 227 and 354, then group is the sixth', function() {
        var group = service.getGroup(228);
        assert.equal(group, service.groups[5]);
        group = service.getGroup(353);
        assert.equal(group, service.groups[5]);
        group = service.getGroup(354);
        assert.equal(group, service.groups[5]);
    });

    it('if the number is between 354 and 504, then group is the seventh', function() {
        var group = service.getGroup(355);
        assert.equal(group, service.groups[6]);
        group = service.getGroup(503);
        assert.equal(group, service.groups[6]);
        group = service.getGroup(504);
        assert.equal(group, service.groups[6]);
    });

    it('if the number is between 504 and 654, then group is the eighth', function() {
        var group = service.getGroup(505);
        assert.equal(group, service.groups[7]);
        group = service.getGroup(653);
        assert.equal(group, service.groups[7]);
        group = service.getGroup(654);
        assert.equal(group, service.groups[7]);
    });

    it('if the number is between 654 and 824, then group is the ninth', function() {
        var group = service.getGroup(655);
        assert.equal(group, service.groups[8]);
        group = service.getGroup(823);
        assert.equal(group, service.groups[8]);
        group = service.getGroup(824);
        assert.equal(group, service.groups[8]);
    });

    it('if the number is between 824 and 1004, then group is the tenth', function() {
        var group = service.getGroup(825);
        assert.equal(group, service.groups[9]);
        group = service.getGroup(1003);
        assert.equal(group, service.groups[9]);
        group = service.getGroup(1004);
        assert.equal(group, service.groups[9]);
    });

    it('if the number is between 1004 and 1204, then group is the eleventh', function() {
        var group = service.getGroup(1005);
        assert.equal(group, service.groups[10]);
        group = service.getGroup(1203);
        assert.equal(group, service.groups[10]);
        group = service.getGroup(1204);
        assert.equal(group, service.groups[10]);
    });

    it('if the number is between 1204 and 1674, then group is the tuelvth', function() {
        var group = service.getGroup(1205);
        assert.equal(group, service.groups[11]);
        group = service.getGroup(1673);
        assert.equal(group, service.groups[11]);
        group = service.getGroup(1674);
        assert.equal(group, service.groups[11]);
    });

    it('if the number is between 1674 and 2274, then group is the thirteenth', function() {
        var group = service.getGroup(1675);
        assert.equal(group, service.groups[12]);
        group = service.getGroup(2273);
        assert.equal(group, service.groups[12]);
        group = service.getGroup(2274);
        assert.equal(group, service.groups[12]);
    });

    it('if the number is between 2274 and 2994, then group is the fourteenth', function() {
        var group = service.getGroup(2275);
        assert.equal(group, service.groups[13]);
        group = service.getGroup(2993);
        assert.equal(group, service.groups[13]);
        group = service.getGroup(2994);
        assert.equal(group, service.groups[13]);
    });

    it('if the number is between 2994 and 3894, then group is the fifteenth', function() {
        var group = service.getGroup(2995);
        assert.equal(group, service.groups[14]);
        group = service.getGroup(3893);
        assert.equal(group, service.groups[14]);
        group = service.getGroup(3894);
        assert.equal(group, service.groups[14]);
    });

    it('if the number is between 3894 and 4869, then group is the sixteenth', function() {
        var group = service.getGroup(3895);
        assert.equal(group, service.groups[15]);
        group = service.getGroup(4868);
        assert.equal(group, service.groups[15]);
        group = service.getGroup(4869);
        assert.equal(group, service.groups[15]);
    });

    it('if the number is between 4869 and 6069, then group is the seventeenth', function() {
        var group = service.getGroup(4870);
        assert.equal(group, service.groups[16]);
        group = service.getGroup(6068);
        assert.equal(group, service.groups[16]);
        group = service.getGroup(6069);
        assert.equal(group, service.groups[16]);
    });

    it('if the number is between 6069 and 8409, then group is the eighteenth', function() {
        var group = service.getGroup(6070);
        assert.equal(group, service.groups[17]);
        group = service.getGroup(8408);
        assert.equal(group, service.groups[17]);
        group = service.getGroup(8409);
        assert.equal(group, service.groups[17]);
    });

    it('if the number is between 8409 and 12209, then group is the nineteenth', function() {
        var group = service.getGroup(8410);
        assert.equal(group, service.groups[18]);
        group = service.getGroup(12208);
        assert.equal(group, service.groups[18]);
        group = service.getGroup(12209);
        assert.equal(group, service.groups[18]);
    });

    it('if the number is between 12209 and 16034, then group is the twentieth', function() {
        var group = service.getGroup(12210);
        assert.equal(group, service.groups[19]);
        group = service.getGroup(16033);
        assert.equal(group, service.groups[19]);
        group = service.getGroup(16034);
        assert.equal(group, service.groups[19]);
    });
})