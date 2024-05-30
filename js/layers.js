addLayer("p", {
    symbol: "p̴̻̃", // This appears on the layer's node. Default is the id with the first letter capitalized
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
        if(hasUpgrade('p', 14)) mult = mult.times(-2)
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
                if (!hasUpgrade('n', 16)) {
                    player.points = new Decimal(0)
                    player.p.points = new Decimal(0)
                }
            }
        },
        12: {
            title: 'logman',
            description: 'Multiply p/s and pp requirement by log(|p/s| + 2)',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 11) },
            effect() {
                let base = getPointGen().abs().max(0).add(2).log(10)
                if(base.lt(1) && hasMilestone('s', 2)) base = new Decimal(1)
                return base
            },
            effectDisplay() {
                return '×' + format(tmp[this.layer].upgrades[this.id].effect, 8)
            },
            onPurchase() {
                if (!hasUpgrade('n', 16)) {
                    player.points = new Decimal(0)
                    player.p.points = new Decimal(0)
                }
            }
        },
        13: {
            title: 'rootman',
            description: 'Multiply p/s and pp requirement by (|p/s|)^0.5',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 12) },
            effect() {
                let base = getPointGen().abs().max('1eeeeeeeeeeeeeeeeeeee-308').pow(0.5)
                if(base.lt(1) && hasMilestone('s', 2)) base = new Decimal(1)
                return base
            },
            effectDisplay() {
                return '×' + format(tmp[this.layer].upgrades[this.id].effect, 8, true)
            },
            onPurchase() {
                if (!hasUpgrade('n', 16)) {
                    player.points = new Decimal(0)
                    player.p.points = new Decimal(0)
                }
            }
        },
        14: {
            title: 'antiman',
            description: 'Multiply p/s and pp requirement by -2',
            cost: new Decimal(1),
            unlocked() { return hasUpgrade('p', 13) },
            onPurchase() {
                if (!hasUpgrade('n', 16)) {
                    player.points = new Decimal(0)
                    player.p.points = new Decimal(0)
                }
            }
        },
        15: {
            title: 'ok now what the fuck is this',
            description: 'unlock ክልክጎክልፕዐዪነ',
            cost: new Decimal(420),
            unlocked() { return hasUpgrade('p', 14) },
            onPurchase() {
                if (!hasUpgrade('n', 16)) {
                    player.points = new Decimal(0)
                    player.p.points = new Decimal(0)
                }
                options.naninators = true
            }
        },
    },
    hotkeys: [
        {
            key: "this needs to be impossible for obvious reasons", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "CTRL+R: get 1 free p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { player.points = player.points.add(1) },
        },
    ],
    effectDescription: 'every bought upgrade reduces their cost by 10×',
    prestigeButtonText() {
        return '+1 pp at ' + format(tmp.p.nextAtDisp, 3, true) + '<br>you have ' + format(player.points, 3, true)
    },
    doReset(layer) {
        if(layer != 'p') {
            if(layer == 'n') {
                layerDataReset('p')
                if(hasUpgrade('n', 11)) player.p.points = tmp.n.upgrades[11].effect
            } else {
                layerDataReset('p')
                player.p.upgrades = []
            }
        }
    },
    update(diff) {
        if(hasUpgrade('n', 14)) player.p.points = player.p.points.add(diff * 0.05)
    }
})

addLayer('n', {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#5af",
    resource: "ክልክጎክልፕዐዪነ",
    row: 1,
    baseResource: "p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́s̴̪̾",
    baseAmount() { return player.points },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    layerShown() { return options.naninators },
    branches: ['p'],
    symbol: 'ክ',
    effect() {
        let base
        if(player.n.points.lt(1)) return new Decimal(1)
        else base = player.n.points.sub(1).pow(0.42069).add(1)
        if(hasUpgrade('n', 15)) base = base.times(Decimal.log(player.n.points.sub(5), 10))
        if(!hasMilestone('s', 3)) base = base.min(9.5)
        else if(base.gte(9.5)) base = base.div(9.5).pow(0.15).times(9.5)
        return base
    },
    effectDescription() {
        return 'increasing base p/s by ×' + format(tmp.n.effect)
    },
    buyables: {
        11: {
            cost(x) { return x.pow_base(3).add(0.00000000000001) },
            display() { return "Super Ultra Omega Booster<br>Increases exponent of p/s by log(pp)<br>Cost: " + format(this.cost(), 14, true) + "<br>Currently: " + format(player.p.points.log(10)) + " each, " + format(this.effect()) + ' total' },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                return x.gte(1) ? player.p.points.log(10).times(x) : new Decimal(0)
            }
        }
    },
    upgrades: {
        11: {
            title: 'Retainers',
            description: 'Keep log(upgrades) pp on ክልክጎክልፕዐዪ reset',
            cost: new Decimal(3),
            effect() {
                return Decimal.log(player.n.upgrades.length, 10)
            },
            effectDisplay() { return format(tmp.n.upgrades[11].effect) }
        },
        12: {
            title: 'IHateNaNs',
            description: 'Does Nothing?',
            cost: new Decimal(9),
            unlocked() { return hasUpgrade('n', 11) }
        },
        13: {
            title: 'oh hey, an upgrade',
            description: 'Line (^1) p/s',
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('n', 12) }
        },
        14: {
            title: 'What does this even mean?',
            description() { return hasUpgrade('n', 14) ? 'Pp pp<br>Passively Produce p̴̻̃ṟ̸͗é̶͖s̷̘̊t̸̜̋i̴̩̿g̸̠̃e̴̩̐ ̶̕ͅp̵̝̽o̶̡̅i̵̝͝ṋ̷̇ẗ̷̯s̵̪͌' : 'Pp pp' },
            cost: new Decimal(21),
            unlocked() { return hasUpgrade('n', 13) }
        },
        15: {
            title: 'Definitely a buff',
            description: "Improve ክልክጎክልፕዐዪነ effect",
            cost: new Decimal(21),
            unlocked() { return hasUpgrade('n', 14) }
        },
        16: {
            title: 'Sample upgrade',
            description: "Upgrades bought with p̴̻̃ṟ̸͗é̶͖s̷̘̊t̸̜̋i̴̩̿g̸̠̃e̴̩̐ ̶̕ͅp̵̝̽o̶̡̅i̵̝͝ṋ̷̇ẗ̷̯s̵̪͌ no longer cause NaNs all the time",
            cost: new Decimal(33),
            unlocked() { return hasUpgrade('n', 15) }
        },
        17: {
            title: 'Limiter',
            description: "Unlock 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔",
            cost: new Decimal(50),
            unlocked() { return hasUpgrade('n', 16) },
            onPurchase() {
                options.softcappers = true
            }
        },
    }
})

addLayer('a', {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#DCDC13",
    resource: "Achievements",
    row: 'side',
    type: "none",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    layerShown() { return options.naninators },
    achievements: {
        11: {
            name: "And so it begins",
            tooltip: "Unlock ክልክጎክልፕዐዪነ",
            done() { return options.naninators || options.a11 },
            onComplete() { options.a11 = true }
        },
        12: {
            name: "This one is really <i>hard</i>, you might need to <i>reset</i>",
            tooltip: "Gain a ክልክጎክልፕዐዪ",
            done() { return player.n.points.gte(1) || options.a12 },
            onComplete() { options.a12 = true }
        },
        13: {
            name: "pp time",
            tooltip: "Start Pp pp",
            done() { return hasUpgrade('n', 14) || options.a13 },
            onComplete() { options.a13 = true }
        },
        21: {
            name: "0/10; game sucks",
            tooltip: "Unlock 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔",
            done() { return options.softcappers || options.a21 },
            onComplete() { options.a21 = true },
            unlocked() { return options.softcappers }
        },
        22: {
            name: "This one might be faster with a hard reset (not required though)",
            tooltip: "Gain a 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐",
            done() { return player.s.points.gte(1) || options.a22 },
            onComplete() { options.a22 = true },
            unlocked() { return options.softcappers }
        },
    },
    tabFormat: [
        "achievements"
    ],
    tooltip: 'According to all known laws of aviation, there is no way a bee should be able to fly.',
    branches: ['n', 'p']
})

addLayer('s', {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#aaaaaa",
    resource: "𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔",
    row: 2,
    type: "normal",
    exponent: 0.5,
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },
    layerShown() { return options.softcappers },
    symbol: '𐌔',
    baseResource() { return !hasMilestone('s', 4) ? "p̴̻̃ṟ̸͗é̶͖s̷̘̊t̸̜̋i̴̩̿g̸̠̃e̴̩̐ p̵̝̅ò̴̡i̴͎̓n̸̪͑ẗ̴̨́s̴̪̾" : "ክልክጎክልፕዐዪነ" },
    baseAmount() { return !hasMilestone('s', 4) ? player.p.points : player.n.points },
    requires() {
        let base = new Decimal(100)
        if(hasMilestone('s', 4)) base = base.times(Decimal.pow(2, player.s.points)).div(100)
        return base
    },
    branches: ['p', 'n', 'a'],
    effect() {
        let base = player.s.points.add(1).pow(0.01).sub(1)
        return base
    },
    effectDescription() {
        return 'increasing p/s after all other boosts by +' + format(this.effect(), 4)
    },
    milestones: {
        0: {
            requirementDescription: '1 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Softcap p/s below 0.0001',
            done() { return player.s.points.gte(1) }
        },
        1: {
            requirementDescription: '2 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Change the p/s exponent to always be a benefit',
            done() { return player.s.points.gte(2) }
        },
        2: {
            requirementDescription: '3 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Softcap all multipliers below 1',
            done() { return player.s.points.gte(3) }
        },
        3: {
            requirementDescription: '4 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Turn the ክልክጎክልፕዐዪነ effect hardcap into a softcap',
            done() { return player.s.points.gte(4) }
        },
        4: {
            requirementDescription: '5 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Softcap 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔 (increases cost), and also change the base resource to be ክልክጎክልፕዐዪነ',
            done() { return player.s.points.gte(5) }
        },
        5: {
            requirementDescription: '6 𐌔Ꝋ𐌅𐌕𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            effectDescription: 'Unlock 𐋅𐌀𐌐𐌃𐌂𐌀𐌓𐌓𐌄𐌐𐌔',
            done() { return player.s.points.gte('6') }
        },
    },
    nodeStyle: {
        "margin-right": '200px',
        'height': '110px'
    }
})
