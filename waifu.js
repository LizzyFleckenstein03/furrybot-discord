const common = require("./common.js")
const pseudoRandom = require("pseudo-random")
const hiragana = require("./hiragana.json")
let hiraganaList = []

for (let k of Object.keys(hiragana))
	if (k.length == 1)
		hiraganaList.push(k)


const waifuName = rng => {
	let r = Math.floor(1
		+ rng.random()
		+ rng.random()
		+ rng.random()
		+ rng.random()
		+ rng.random()
	)

	let jp = ""

	for (let i = 0; i < r; i++)
		jp += common.choose(hiraganaList, rng)

	let en = ""

	for (let i = 0; i < r; i++) {
		const combo = hiragana[jp.slice(i, i + 2)]

		if (combo) {
			en += combo
			i++
		} else {
			en += hiragana[jp.slice(i, i + 1)]
		}
	}

	return `${jp} (${common.uppercase(en)})`
}

const waifuSpecies = rng => common.chooseWeighted([
	[               null, 100], // Human
	[          "Catgirl",  15],
	[          "Foxgirl",  15],
	[         "Wolfgirl",  15],
	[              "Orc",   5],
	[              "Elb",   5],
	[            "Dwarf",   5],
	[           "Femboy",   3],
	["Apache Helicopter",   1],
	[   "C++ Programmer",   1],
], rng)

const waifuGender = rng => common.chooseWeighted([
	[     "Male", 50],
	[   "Female", 50],
	[     "null",  1],
	["undefined",  1],
	[ "Infinity",  1],
	["-Infinity",  1],
	[      "NaN",  1],
	[     "-NaN",  1],
], rng)

const waifuHair = rng => common.chooseWeighted([
	[[ "Brown", "#DDAE92"], 25],
	[[ "Black", "#433F3A"], 25],
	[["Blonde", "#ECC87E"], 20],
	[[   "Red", "#E2887F"], 10],
], rng)

const waifuEyes = rng => common.chooseWeighted([
	[["Brown", "#463230"], 15],
	[[ "Blue", "#97C6FE"], 10],
	[["Green", "#36CC4E"],  5],
], rng)

const waifuAge = rng => {
	const tab = common.chooseWeighted([
		[[ 200,  600], 25], // deamon
		[[1000, 2000],  5], // next level deamon
		[[  12,   16], 50], // teen loli
		[[  18,   19],  5], // legal loli
		[[   5,    9],  5], // true loli
		[        null,  1], // unknown
	], rng)

	return tab ? tab[0] + Math.floor(rng.random() * (tab[1] - tab[0] + 1)) : null;
}

const waifu = id => {
	const rng = pseudoRandom(id = id || Math.floor(Math.random() * 32767))

	return {
		id,
		name: waifuName(rng),
		species: waifuSpecies(rng),
		gender: waifuGender(rng),
		hair: waifuHair(rng),
		eyes: waifuEyes(rng),
		age: waifuAge(rng),
	}
}

const formatWaifu = waifu =>
`__**${waifu.name}**__
	**Age:** ${waifu.age || "Unknown"}
	**Gender:** ${waifu.gender}
	${waifu.hair[0]} Hair
	${waifu.eyes[0]} Eyes

	#${waifu.id}
`

module.exports = {
	waifu: {
		func: (msg, [id]) =>
			msg.reply(formatWaifu(waifu(parseInt(id))))
	}
}
