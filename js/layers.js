addLayer("p", {
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff00ff",
    requires() {
        mult = new Decimal(10)
        if(hasUpgrade('p', 12)) mult = mult.times(tmp.p.upgrades[12].effect)
        if(hasUpgrade('p', 13)) mult = mult.times(tmp.p.upgrades[13].effect)
        mult = mult.div(Decimal.pow(10, player.p.upgrades.length))
        return mult
    }, // Can be a function that takes requirement increases into account
    resource: "p̴̻̃ṟ̸͗é̶͖s̷̘̊t̸̜̋i̴̩̿g̸̠̃e̴̩̐ ̶̕ͅp̵̝̽o̶̡̅i̵̝͝ṋ̷̇ẗ̷̯s̵̪͌", // Name of prestige currency
    baseResource: "p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́s̴̪̾", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if(hasUpgrade('p', 12)) mult = mult.times(tmp.p.upgrades[12].effect)
        return mult
    },
    base: new Decimal('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee9312500'),
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    upgrades: {
        11: {
            title: 'cube',
            description: 'Cube p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́ gain (p/s)',
            cost: new Decimal(1),
            onPurchase() {
                player.points = new Decimal(0)
                player.p.points = new Decimal(0)
            }
        },
        12: {
            title: 'logman',
            description: 'Multiply p/s and pp requirement by log(p/s + 2)',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 11) },
            effect() {
                return getPointGen().max(0).add(2).log(10)
            },
            effectDisplay() {
                return '×' + format(tmp[this.layer].upgrades[this.id].effect, 8)
            },
            onPurchase() {
                player.points = new Decimal(0)
                player.p.points = new Decimal(0)
            }
        },
        13: {
            title: 'rootman',
            description: 'Multiply p/s and pp requirement by (p/s)^0.5',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 12) },
            effect() {
                return getPointGen().max('1eeeeeeeeeeeeeeeeeeee-308').pow(0.5)
            },
            effectDisplay() {
                return '×' + format(tmp[this.layer].upgrades[this.id].effect, 8, true)
            },
            onPurchase() {
                player.points = new Decimal(0)
                player.p.points = new Decimal(0)
            }
        },
        14: {
            title: 'antiman',
            description: 'Multiply p/s and pp requirement by -2',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 13) },
            onPurchase() {
                player.points = new Decimal(0)
                player.p.points = new Decimal(0)
            }
        },
    },
    hotkeys: [
        {
            key: "ctrl+w", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "CTRL + W: get 1 free p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { player.points = player.points.add(1) },
        },
    ],
    effectDescription: 'every bought upgrade reduces their cost by 10×'
})
