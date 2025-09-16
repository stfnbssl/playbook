const ControlTypes = ["Preventive" , "Detective", "Corrective"];
const InformationSecurityProperties = ["Confidentiality", "Integrity", "Availability"];
const CybersecurityConcepts = ["Identify", "Protect", "Detect", "Respond", "Recover"];
const OperationalCapabilities = [
  "Governance", 
  "Asset_management",
  "Information_protection", 
  "Human_resource_security", 
  "Physical_security", 
  "System_and_network_security", 
  "Application_security", 
  "Secure_configuration", 
  "Identity_and_access_management",
  "Threat_and_vulnerability_management", 
  "Continuity", 
  "Supplier_relationships_security", 
  "Legal_and_compliance", 
  "Information_security_event_management", 
  "Information_security_assurance"
];
const SecurityDomains = ["Governance_and_Ecosystem", "Protection",  "Defence",  "Resilience"];
const SecurityDomainsFull = [
  { 
    name: "Governance and Ecosystem", 
    includes: [
      "Information System Security Governance",
      "Risk Management", 
      "Ecosystem cybersecurity management"
    ]
  },{
    name: "Protection", 
    includes:[
      "IT Security Architecture", 
      "IT Security Administration",
      "Identity and access management", 
      "IT Security Maintenance",
      "Physical and environmental security"
    ]
  }, {
    name: "Defence", 
    includes:[
      "Detection",
      "Computer Security Incident Management" 
    ]
  }, {
    name: "Resilience",
    includes:[
      "Continuity of operations",
      "Crisis management"
    ] 
  } 
];

function setControlAttributes(obj) {
    if (!obj.attributes) {
        obj.attributes = {
          ControlType: null,
          InformationSecurityProperties: [],
          CybersecurityConcepts: [],
          OperationalCapabilities: [],
          SecurityDomains: [],    
        }
    }
}

function processAttribute(obj, attributeLines) {
  console.log('attributeLines.join()', attributeLines.join(''));
  const keys = attributeLines.join('').split(['#']);
  keys.forEach(key => {
    const trimmed = key.trim();
    console.log('key', trimmed, [...trimmed].map(c => c.charCodeAt(0)));
    // console.log("Char codes:", [...normLine].map(c => c.charCodeAt(0)));    
    if (ControlTypes.indexOf(trimmed) > -1) {
        setControlAttributes(obj);
        obj.attributes.ControlType = trimmed;
    } else if (InformationSecurityProperties.indexOf(trimmed) > -1) {
        setControlAttributes(obj);
        obj.attributes.InformationSecurityProperties.push(trimmed);
    } else if (CybersecurityConcepts.indexOf(trimmed) > -1) {
        setControlAttributes(obj);
        obj.attributes.CybersecurityConcepts.push(trimmed);
    } else if (OperationalCapabilities.indexOf(trimmed) > -1) {
        setControlAttributes(obj);
        obj.attributes.OperationalCapabilities.push(trimmed);     
    } else if (SecurityDomains.indexOf(trimmed) > -1) {
        setControlAttributes(obj);
        obj.attributes.SecurityDomains.push(trimmed);           
    }    
  });
}

function processChunk(obj) {
  const sectionHeaders = ["Control", "Purpose", "Guidance", "Other information"];
  const lines = obj.lines;
  
  if (!lines || !Array.isArray(lines)) {
    return obj;
  }
  
  let currentSection = null;
  let currentContent = [];
  let attributeLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.text.trim();
    
    // Controlla se la linea corrente è un header di sezione
    if (sectionHeaders.includes(trimmedLine)) {
      // Se stavamo già processando una sezione, salva il contenuto
      if (currentSection && currentContent.length > 0) {
        obj[currentSection] = currentContent.join('\n');
      }
      
      // Inizia una nuova sezione
      currentSection = trimmedLine;
      currentContent = [];
    } else if (currentSection) {
      // Se siamo in una sezione, aggiungi la linea al contenuto
      currentContent.push(line.text);
    } else {
        attributeLines.push(trimmedLine);
    }
  }
  
  // Salva l'ultima sezione se presente
  if (currentSection && currentContent.length > 0) {
    obj[currentSection] = currentContent.join('\n');
  }

  processAttribute(obj, attributeLines);
  
  return obj;
}

module.exports = {
  processChunk,
};

