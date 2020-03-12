const config = require('config');
const { customLogger } = require('../../common/logger');
const { hasTypeLand, markEtb, canPlaySpellOnCurve } = require('../cards/utils');
const { getAllCombinations } = require("../../common/tools/utils");

const { createClient } = require('../../common/api-client/scryfall/factory');
const scryfallApiClient = createClient(config.apiClients.scryfall);

const logger = customLogger('index');

async function createDeck(decklist) {
    const cards = [];
    const deck = [];
    const cardData = {};

    (await Promise.all(decklist.map(cardCountAndName => {
        const [count, name] = cardCountAndName.split(/ (.+)/);
        cards.push({ name, count: parseInt(count) });
        return scryfallApiClient.getCardByName(name);
    })))
        .forEach((card, i) => cardData[cards[i].name] = card);

    cards.forEach(({ name, count }) => {
        deck.push(...Array(count).fill(cardData[name]));
    });
    return deck
}

async function analyzeDecklist(decklist) {
    const deck = await createDeck(decklist);


    const lands = deck
        .filter(card => hasTypeLand(card))
        .map(land => markEtb(land));
    logger.info(lands);

    const spells = deck.filter(card => !hasTypeLand(card));
    logger.info(spells);

    const data = {};

    spells.forEach(spell => {
        const NManaLandCombinations = getAllCombinations(lands).filter(c => c.length >= spell.cmc && c.length <= spell.cmc + 2);
        const playableHands = NManaLandCombinations.filter(hand => canPlaySpellOnCurve(hand, spell));
        const stats = (playableHands.length / NManaLandCombinations.length * 100).toFixed(2);
        data[spell.name] = `${stats}%`;
    });


    logger.info(data);
    return data;
}

module.exports = {
    analyzeDecklist,
};