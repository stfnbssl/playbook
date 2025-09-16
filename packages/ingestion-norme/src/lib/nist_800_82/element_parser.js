function parseElement(levelData) {
    let lowIndent = -1;
    let modIndent = -1;
    let highIndent = -1;
    let curEnhancementDef = null;
    const control_RE = /^([A-Z]+-\d+)\s+([A-Za-z\s]+)$/;
    const enhancementDef_RE = /^([A-Z]+-\d+)\s*\((\d+)\)\s*$/;    
    const controlEnhancement_RE = /^Control Enhancement:\s*\((\d+)\)\s*(.*)$/;
    const rationale_RE = /^Rationale for adding\s+([A-Z]+-\d+)\s+\((\d+)\)\s*(.*)$/;
    let current_text_type = null;
    let current_enhancement = null;
    let current_enhancementArray = null;
    let seenControlEnhanchementDiscussion = false;
    const unparsed = [];
    for (let i = 0; i < levelData.lines.length; i++) {
        const line = levelData.lines[i];
        const prevLine1 = levelData.lines[i-1] ? levelData.lines[i-1] : levelData.lines[i-1];  
        const nextLine1 = levelData.lines[i+1] ? levelData.lines[i+1] : levelData.lines[i+1];  
        console.log("levelData.l2_number", levelData.l2_number, line.text.trim());
        let control_RE_Match = line.text.trim().match(control_RE);
        if (control_RE_Match) {
            levelData.l2_number = control_RE_Match[1];
            levelData.l2_title = control_RE_Match[2];
        } else {
            if (nextLine1) {
                control_RE_Match = (line.text.trim() + ' ' + nextLine1.text.trim()).match(control_RE);
                if (control_RE_Match) {
                    levelData.l2_number = control_RE_Match[1];
                    levelData.l2_title = control_RE_Match[2];
                    current_text_type = null;
                    i++;
                }                
            }
        }
        console.log("control_RE_Match", control_RE_Match);
        let enhancementDef_RE_Match = line.text.trim().match(enhancementDef_RE);
        if (!enhancementDef_RE_Match && nextLine1) {
            enhancementDef_RE_Match = (line.text.trim() + ' ' + nextLine1.text.trim()).match(enhancementDef_RE);
            if (enhancementDef_RE_Match) {
                i++;
            }                
        }
        console.log("enhancementDef_RE_Match", enhancementDef_RE_Match);
        const controlEnhancement_RE_Match = line.text.trim().match(controlEnhancement_RE);        
        const rationale_RE_Match = line.text.trim().match(rationale_RE);
        if (control_RE_Match) {
        } else if (enhancementDef_RE_Match) {      
            if (curEnhancementDef) {
                levelData.enhancements.push(curEnhancementDef);
            }
            curEnhancementDef = {
                id: enhancementDef_RE_Match[2]
            }
            current_text_type = null;
            console.log("curEnhancementDef", curEnhancementDef)
        } else if (controlEnhancement_RE_Match) { 
            if (curEnhancementDef) {
                levelData.enhancements.push(curEnhancementDef);
                curEnhancementDef = null;
            }
            console.log("controlEnhancement_RE_Match", controlEnhancement_RE_Match);
            let enhancement = levelData.enhancements.find(item => item.id === controlEnhancement_RE_Match[1]);
            if (!enhancement) {
                console.log(levelData.l2_number, levelData.l2_title); 
                console.log(line.text); 
                console.log(controlEnhancement_RE_Match[1], levelData.enhancements); 
                throw new Error();
            } else {
                current_enhancementArray = [enhancement];
                const regex = /^((?:\(\d+\)\s*)+)(.*)$/;
                const match = controlEnhancement_RE_Match[2].match(regex);
                if (match) {
                    // console.log(match[1]); // "(1) (3) (4) "
                    // console.log(match[2]); // "No OT discussion for this control"
                    // Per i singoli numeri:
                    const numbers = match[1].match(/\d+/g); // ["1", "3", "4"]
                    // current_enhancementArray[0].numbers = [controlEnhancement_RE_Match[1], ...numbers];
                    current_enhancementArray[0].discussion = match[2];
                    for (let jj = 0; jj<numbers.length; jj++) {
                        enhancement = levelData.enhancements.find(item => item.id === numbers[jj]);
                        if (!enhancement) {
                            console.log(levelData.l2_number, levelData.l2_title); 
                            console.log(line.text); 
                            console.log(numbers[jj], levelData.enhancements); 
                            throw new Error();
                        } else {
                            enhancement.discussion = match[2];
                            current_enhancementArray.push(enhancement);
                        }
                    }
                } else {
                    current_enhancementArray[0].discussion = controlEnhancement_RE_Match[2];
                }
                current_text_type = "enh-discussion";
            }
        } else if (rationale_RE_Match) { 
            if (curEnhancementDef) {
                levelData.enhancements.push(curEnhancementDef);
                curEnhancementDef = null;
            }
            console.log("rationale_RE_Match", rationale_RE_Match);
            current_enhancement = levelData.enhancements.find(item => item.id === rationale_RE_Match[2]);
            if (!current_enhancement) {
                console.log(rationale_RE_Match[2], levelData.enhancements); 
            } else {
                const ss = rationale_RE_Match[3].split(':');
                current_enhancement.rationale = ss.length == 1 ? rationale_RE_Match[3].trim() : ss[1].trim();
                current_text_type = "enh-rationale";
            }
        } else if (line.text.trim() == 'NO.') {}
        else if (line.text.trim() == 'CONTROL NAME') {}
        else if (line.text.trim() == 'Control Enhancement Name') {}
        else if (line.text.trim() == 'SUPPLEMENTED') {}
        else if (line.text.trim() == 'CONTROL BASELINES') {}
        else if (line.text.trim() == 'LOW') { lowIndent = line.indent; }
        else if (line.text.trim() == 'MOD') { modIndent = line.indent; }
        else if (line.text.trim() == 'HIGH') { highIndent = line.indent; }
        else if (line.indent >= lowIndent - 2 && line.indent <= lowIndent + 2) { 
            if (curEnhancementDef) {
                curEnhancementDef.low = line.text.trim();
            } else {
                levelData.low = line.text.trim();
            }
        } else if (line.indent >= modIndent - 2 && line.indent <= modIndent + 2) { 
            console.log(modIndent, curEnhancementDef)
            if (curEnhancementDef) {
                curEnhancementDef.mod = line.text.trim();
            } else {
                levelData.mod = line.text.trim();
            }
        } else if (line.indent >= highIndent - 2 && line.indent <= highIndent + 2) { 
            if (curEnhancementDef) {
                curEnhancementDef.high = line.text.trim();
            } else {
                levelData.high = line.text.trim();
            }
        } else if (line.text.trim().startsWith('OT Discussion:')) { 
            if (seenControlEnhanchementDiscussion) {
                throw new Error("Unexpected OT Discussion: inside curEnhancementDef");
            }
            levelData.discussion = line.text.trim().substring('OT Discussion: '.length);
            current_text_type = "discussion";
        } else if (current_text_type == 'discussion') { 
            levelData.discussion = levelData.discussion ? levelData.discussion + ' ' + line.text.trim() : line.text.trim();
        } else if (current_text_type == 'enh-discussion') { 
            if (current_enhancementArray.length > 0) {
                current_enhancementArray.forEach( ce => {
                    ce.discussion = ce.discussion ? ce.discussion + ' ' + line.text.trim() : line.text.trim()
                })
            } else {
                throw new Error("current_text_type has no object set");
            }
        } else if (current_text_type == 'enh-rationale') { 
            if (current_enhancement) {
                current_enhancement.rationale = current_enhancement.rationale ? current_enhancement.rationale + ' ' + line.text.trim() : line.text.trim()
            } else {
                throw new Error("current_text_type has no object set");
            }
        } else if (line.indent < 10) {
            if (curEnhancementDef) {
                curEnhancementDef.title = curEnhancementDef.title ? curEnhancementDef.title + ' ' + line.text.trim() : line.text.trim();
            } 
        } else {
            unparsed.push(line);
        }
    }
    if (curEnhancementDef) {
        levelData.enhancements.push(curEnhancementDef);
        curEnhancementDef = null;
    }
    levelData.lines = unparsed;
    // parseElement2(levelData);
}

module.exports = {
    parseElement
}
