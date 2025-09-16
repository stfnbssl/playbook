function parseElement(levelData) {
    if (levelData.kind != "Element") return;
    let descriptionOn = false;
    let objectiveOn = false;
    let rationaleOn = false;
    let requirementsOn = false;
    levelData.lines.forEach( line => {
      console.log("parseElement", line.level, line.kind, line.title, line.text);
      if (line.level) {
        if (line.kind == 'Element') {
          parseElement(line);
        }
      } else {
        if (line.text == 'Description:') { descriptionOn = true; objectiveOn = false; rationaleOn = false; requirementsOn = false }
        else if (line.text == 'Objective:') { descriptionOn = false; objectiveOn = true; rationaleOn = false; requirementsOn = false  }
        else if (line.text == 'Rationale:') { descriptionOn = false; objectiveOn = false; rationaleOn = true; requirementsOn = false  }
        else if (line.text == 'Requirements:') { descriptionOn = false; objectiveOn = false; rationaleOn = false; requirementsOn = false }
        else if (descriptionOn) levelData.description = !levelData.description ? line.text : levelData.description + ' ' + line.text;
        else if (objectiveOn) levelData.objective = !levelData.objective ? line.text : levelData.objective + ' ' +  line.text;
        else if (rationaleOn) levelData.rationale = !levelData.rationale ? line.text : levelData.rationale + ' ' + line.text;
      }
    });
}
function parseElementRequirement(lines, linePos, acc) {
    const line = lines[linePos];
    const lineIndent = line.length - line.trimStart().length;
    let nextLine = lines[linePos+1];
    let nextLineIndent = nextLine.length - nextLine.trimStart().length;
    console.log("line", linePos, line, lineIndent, nextLineIndent);
    if (nextLineIndent > lineIndent) {
        const title = [];
        let j = linePos+1;
        let testIndent = nextLineIndent;
        console.log(testIndent);
        while(lines[j] && testIndent == nextLineIndent) {
            title.push(lines[j].trim()); 
            j++;
            const next = lines[j];
            testIndent = next ? next.length - next.trimStart().length : 0;
            console.log(testIndent);
        }
        if (acc.level == 4) {
            acc.l4_title = title.join(' ');
        } else {
            acc.l5_title = title.join(' ');
        }
        console.log("title", title.join(' '));
        if (testIndent > nextLineIndent) {
            // is requirement
            const req = [];
            let reqTestIndent = lines[j].length - lines[j].trimStart().length;
            let testReqTestIndent = reqTestIndent;
            while(lines[j] && testReqTestIndent == reqTestIndent) {
                req.push(lines[j].trim()); 
                j++;
                const next = lines[j];
                testReqTestIndent = next ? next.length - next.trimStart().length : 0;
                console.log(testReqTestIndent);
            }
            if (acc.level == 4) {
                acc.requirement = req.join(' ');
            } else {
                acc.requirement = req.join(' ');
            }
        }
    }
}

module.exports = {
    parseElement,
    parseElementRequirement
}