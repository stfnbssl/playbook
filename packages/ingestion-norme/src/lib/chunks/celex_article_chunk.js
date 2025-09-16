const crypto = require('crypto');
const { extractSemicololnParagraph, analyzeTextForRelevance } = require('./chunk_utils');

function sha256(data) {
    return crypto
        .createHash('sha256')
        .update(data, typeof data === 'string' ? 'utf8' : undefined)
        .digest('hex');
} 

function createChunks(article, metadata) {
    console.log(article);
    const hasChildreanPars = article.children.some(child => child.type === 'par');
    const newChunks = []
    const articleText = article.text;
    let articlePreText = null;
    if (hasChildreanPars && articleText.endsWith(':')) {
        articlePreText = article.text;
    } else {
        const newChunk = Object.assign({}, metadata, {
            chunk_id: metadata.framework_code + "/" + article.id,
            doc_id: metadata.framework_code,
            section_path: article.id,
            parent_id: null,
            group_id: metadata.framework_code + "/" + article.id + "/" + "[pUnknown]",
            seq: 1,
            normative: true,
            informative: false,
            text_normative: articleText,
            text_informative: null,
            context_note: null,
            context: {
                lbLexStdId: metadata.lbId,
                sourceUrl: metadata.sourceUrl,
                sourceType: 'xhtml',
                title: article.title,
                isRelevantVerb: analyzeTextForRelevance(articleText),
                page: "Unknown",
                anchor: article.anchor
            },
            sha256: sha256(articleText)
        });
        newChunks.push(newChunk);
    }
    if (hasChildreanPars) {   
        article.children.forEach( par => {
            const parkey = par.id;
            let parPreText = null;
            if (par.subpars && par.subpars.length > 0) {
                parPreText = articlePreText + ' ' + par.text;
            } else {
                const newChunk = Object.assign({}, metadata, {
                    chunk_id: metadata.framework_code + "/" + article.id + '/' + parkey,
                    doc_id: metadata.framework_code,
                    section_path: article.id + '/' + parkey,
                    parent_id: null,
                    group_id: metadata.framework_code + "/" + article.id + '/' + parkey + "/" + "[pUnknown]",
                    seq: 1,
                    normative: true,
                    informative: false,
                    text_normative: articlePreText + par.text,
                    text_informative: null,
                    context_note: null,
                    context: {
                        lbLexStdId: metadata.lbId,
                        sourceUrl: metadata.sourceUrl,
                        sourceType: 'xhtml',
                        title: article.title,
                        isRelevantVerb: analyzeTextForRelevance(articlePreText + par.text),
                        page: "Unknown",
                        anchor: par.anchor
                    },
                    sha256: sha256(articlePreText  + par.text)
                });
                newChunks.push(newChunk);
            }
            /*
            if (point.subpoints && point.subpoints.length > 0) {
                const subpoint1SemicololnParagraph = extractSemicololnParagraph(point.text);
                const subpoint1PreText = subpoint1SemicololnParagraph ? articlePreText + ' ' + subpoint1SemicololnParagraph : articlePreText;
                point.subpoints.forEach( subpoint1 => {
                    const subpoint1Key = subpoint1.number || subpoint1.letter || subpoint1.roman;
                    const subpoint1Path = article.id + '/' + pointkey + '/' + subpoint1Key;
                    let subpoint1PreText = null;
                    if (subpoint1.subpoints && subpoint1.subpoints.length > 0) {
                        subpoint1PreText = articlePreText + ' ' + pointPreText + ' ' + subpoint1.text;
                    } else {
                        const newChunk = Object.assign({}, metadata, {
                            chunk_id: metadata.framework_code + "/" + subpoint1Path,
                            doc_id: metadata.framework_code,
                            section_path: subpoint1Path,
                            parent_id: null,
                            group_id: metadata.framework_code + "/" + subpoint1Path + '/' + "[pUnknown]",
                            seq: 1,
                            normative: true,
                            informative: false,
                            text_normative: pointPreText + subpoint1.text,
                            text_informative: null,
                            context_note: null,
                            context: {
                                title: article.title,
                                isRelevantVerb: analyzeTextForRelevance(pointPreText + subpoint1.text),
                                page: "Unknown"
                            },
                            sha256: sha256(pointPreText + subpoint1.text)
                        });
                        newChunks.push(newChunk);
                    }
                    if (subpoint1.subpoints && subpoint1.subpoints.length > 0) {
                        console.log("point.subpoints.length", point.subpoints.length)
                        const subpoint2SemicololnParagraph = extractSemicololnParagraph(subpoint1.text);
                        const subpoint2PreText = subpoint2SemicololnParagraph ? subpoint1PreText + ' ' + subpoint2SemicololnParagraph : subpoint1PreText;
                        subpoint1.subpoints.forEach( subpoint2 => {
                            const subpoint2Key = subpoint2.number || subpoint2.letter || subpoint2.roman;
                            const subpoint2Path = article.id + '/' + pointkey + '/' + subpoint1Key + '/' + subpoint2Key;
                            const newChunk = Object.assign({}, metadata, {
                                chunk_id: metadata.framework_code + "/" + subpoint2Path,
                                doc_id: metadata.framework_code,
                                section_path: subpoint2Path,
                                parent_id: null,
                                group_id: metadata.framework_code + "/" + subpoint2Path + '/' + "[pUnknown]",
                                seq: 1,
                                normative: true,
                                informative: false,
                                text_normative: subpoint1PreText + subpoint2.text,
                                text_informative: null,
                                context_note: null,
                                context: {
                                    title: article.title,
                                    isRelevantVerb: analyzeTextForRelevance(subpoint1PreText + subpoint2.text),
                                    page: "Unknown"
                                },
                                sha256: sha256(subpoint1PreText + subpoint2.text)
                            });
                            newChunks.push(newChunk);
                        });
                    }
                });
            }
            */
        });
    }
    return newChunks;
}

module.exports = { createChunks };