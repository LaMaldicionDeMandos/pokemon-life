var groups = [
{
	weight: 12,
	pokemons: [144, 145, 146, 150]
},
{
	weight: 30,
	pokemons: [113]
},
{
	weight: 35,
	pokemons: [132]
},
{
	weight: 50,
	pokemons: [36, 143]
},
{
	weight: 100,
	pokemons: [64]
},
{
	weight: 127,
	pokemons: [20]
},
{
	weight: 150,
	pokemons: [35]
},
{
	weight: 150,
	pokemons: [40, 51, 65]
},
{
	weight: 170,
	pokemons: [39]
},
{
	weight: 180,
	pokemons: [66]
},
{
	weight: 200,
	pokemons: [63]
},
{
	weight: 470,
	pokemons: [29, 32]
},
{
	weight: 600,
	pokemons: [73, 78, 82, 91, 99, 101, 110, 112, 119, 121]
},
{
	weight: 720,
	pokemons: [22, 24, 28, 42, 53, 67, 93, 102]
},
{
	weight: 900,
	pokemons: [98, 116, 118, 120]
},
{
	weight: 975,
	pokemons: [26, 38, 47, 49, 55, 57, 59, 80, 87, 89, 97, 105, 117]
},
{
	weight: 1200,
	pokemons: [11, 14, 17, 30, 33, 44, 61, 70, 75, 111]
},
{
	weight: 2340,
	pokemons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 18, 31, 34, 45, 62, 68, 71, 76, 83, 85, 94, 95, 103, 106, 107, 108, 
	114, 115, 122, 123, 124, 125, 126, 127, 128, 130, 131, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 147, 148,
	149, 151]
},
{
	weight: 3800,
	pokemons: [25, 37, 46, 48, 54, 56, 58, 72, 77, 79, 81, 84, 86, 88, 90, 92, 96, 100, 104, 109]
},
{
	weight: 3825,
	pokemons: [10, 13, 16, 19, 21, 23, 27, 41, 43, 50, 52, 60, 69, 74, 129]
}
];

function RareGroupResolver() {
	this.groups = groups;
	this.groupSize = function() {
		return this.groups.reduce(function (value, item) {
			return value + item.weight;
		}, 0);
	};
	this.getRandom = function() {

	};
};

var rareGroupResolver = new RareGroupResolver();

module.exports = rareGroupResolver;