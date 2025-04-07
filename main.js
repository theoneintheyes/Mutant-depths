
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let weapon = null;
let mutationInventory = [];

function preload() {}

function create() {
    this.add.text(100, 100, 'Choose your weapon:', { fontSize: '20px', fill: '#ffffff' });

    let bowText = this.add.text(100, 150, '[ Bow ]', { fill: '#00ff00' }).setInteractive();
    let swordText = this.add.text(100, 200, '[ Sword ]', { fill: '#00ff00' }).setInteractive();

    bowText.on('pointerdown', () => {
        weapon = "bow";
        startGame(this);
    });

    swordText.on('pointerdown', () => {
        weapon = "sword";
        startGame(this);
    });
}

function update() {}

function startGame(scene) {
    scene.add.text(100, 250, `You chose: ${weapon}`, { fill: '#ffff00' });
    showMutationChoices(scene, weapon);
}

// -------------------- Mutation System --------------------

const allMutations = [
    { name: "Leeching Arrow", weapon: "bow", tier: "white" },
    { name: "Split Arrow", weapon: "bow", tier: "white", core: true },
    { name: "Explosive Arrow", weapon: "bow", tier: "white" },
    { name: "Wall Mining", weapon: "sword", tier: "white" },
    { name: "Sword Throw", weapon: "sword", tier: "white" },
    { name: "Grapple Hook", weapon: "both", tier: "white" },
    { name: "Attack Speed", weapon: "both", tier: "white" },
    { name: "Range Up", weapon: "both", tier: "white" },
    { name: "More EXP", weapon: "both", tier: "white" },
    { name: "Crossbow Upgrade", weapon: "bow", tier: "red", rare: true },
    { name: "Dual Sword", weapon: "sword", tier: "red", rare: true },
    { name: "Blood Gathering", weapon: "sword", tier: "white" },
];

function showMutationChoices(scene, weaponType) {
    const options = allMutations.filter(m => 
        (m.weapon === weaponType || m.weapon === "both") && m.tier === "white"
    );

    const choices = Phaser.Utils.Array.Shuffle(options).slice(0, 3);

    let y = 300;
    scene.add.text(10, y - 20, 'Choose a mutation:', { fontSize: '12px', fill: '#ffffff' });

    choices.forEach((mutation, index) => {
        let txt = scene.add.text(10, y + (index * 20), `[ ${mutation.name} ]`, { fill: '#aaffaa' }).setInteractive();
        txt.on('pointerdown', () => {
            addMutation(scene, mutation);
        });
    });
}

function addMutation(scene, mutation) {
    if (mutationInventory.length >= 5) {
        scene.add.text(10, 400, 'Inventory full!', { fill: '#ff4444' });
        return;
    }

    mutationInventory.push(mutation);
    scene.add.text(10, 380, `Added: ${mutation.name}`, { fill: '#ffff88' });

    console.log("Inventory:", mutationInventory.map(m => m.name));
}
