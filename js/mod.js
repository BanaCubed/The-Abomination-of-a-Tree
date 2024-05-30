let modInfo = {
	name: "The Abomination of a Tree",
	id: "omagawditsarussianspy",
	author: "BanaCubed with help from Satan",
	pointsName: "p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́s̴̪̾",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "sauce, michael here",
	name: "your home security is great, or is it?",
}

let changelog = `<button>Warning! This button does absolultely nothing!</button>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0.1)
	gain = gain.times(tmp.n.effect)
	let power = tmp.n.buyables[11].effect
	if(hasUpgrade('p', 11)) power = power.add(2)
	if(hasMilestone('s', 1)) {
		power = power.abs()
		if(gain.lte(1)) power = Decimal.sub(0, power)
		else power = power
	}
	power = power.add(1)
	gain = gain.pow(power)
	if(hasUpgrade('p', 12)) gain = gain.times(tmp.p.upgrades[12].effect)
	if(hasUpgrade('p', 13)) gain = gain.times(tmp.p.upgrades[13].effect)
	if(hasUpgrade('p', 14)) gain = gain.times(-2)
	if(gain.lte(0.0001) && hasMilestone('s', 0)) gain = new Decimal(0.0001)
	gain = gain.add(tmp.s.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return getPointGen().eq(0)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}