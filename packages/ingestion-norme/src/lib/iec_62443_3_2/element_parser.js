function parseElement(levelData) {
    if (levelData.level != 3) throw new Error("Invalid level");
    levelData.items.forEach( item => {
        let requirementsOn = false;
        let reccomandationOn = false;
        let rationaleOn = false;
        console.log("parseElement", item.level, item.l4_title);
        if (item.l4_title.startsWith('Recommendation')) { reccomandationOn = true; }
        else if (item.l4_title.startsWith('Rationale')) { rationaleOn = true;  }
        else if (item.l4_title.startsWith('Requirement')) { requirementsOn = true }
        const text = [];
        item.lines.forEach( line => {
            text.push(line.text);
        });
        if (reccomandationOn) levelData.reccomandation = text.join(' ');
        else if (requirementsOn) levelData.requirement = text.join(' ');
        else if (rationaleOn) levelData.rationale = text.join(' ');
    });
}

module.exports = {
    parseElement,
}