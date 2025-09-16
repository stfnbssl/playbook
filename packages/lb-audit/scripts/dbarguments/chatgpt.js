// structured-output.cjs
// Node 18+ (ha fetch globale). Se usi Node 16: `npm i node-fetch` e decommenta la riga sotto.
// const fetch = require('node-fetch');

require('dotenv').config(); // opzionale, se usi .env
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const DB_ARGOMENTI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["meta", "ambito"],
  properties: {
    meta: {
      type: "object",
      additionalProperties: false,
      required: ["db_name", "version", "last_updated", "language", "notes"],
      properties: {
        db_name: { type: "string" },
        version: { type: "string" },
        last_updated: { type: "string" }, // ISO date
        language: { type: "string" },
        notes: { type: "string" }
      }
    },
    ambito: {
      type: "object",
      additionalProperties: false,
      required: ["id", "nome", "ruolo", "descrizione", "sezioni"],
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        ruolo: { type: "string" },
        norme_riferimento: { type: "array", items: { type: "string" } },
        descrizione: { type: "string" },
        sezioni: {
          type: "array",
          minItems: 1,
          items: { $ref: "#/$defs/sezione" }
        }
      }
    }
  },
  $defs: {
    sezione: {
      type: "object",
      additionalProperties: false,
      required: [
        "id","nome","obiettivo","output_attesi","prompt_base",
        "aspetti_di_sicurezza","policy_template","sop_template",
        "repo_branching_model","raci","parametri_generazione",
        "prompting","checklist",
        "campi_contesto_richiesti_per_la_contestualizzazione",
        "avvertenze"
      ],
      properties: {
        id: { type: "string" },
        nome: { type: "string" },
        obiettivo: {
          type: "object",
          additionalProperties: false,
          required: ["codice", "descrizione"],
          properties: {
            codice: { type: "string" },
            descrizione: { type: "string" }
          }
        },
        output_attesi: { type: "array", items: { type: "string" } },
        prompt_base: { type: "string" },
        aspetti_di_sicurezza: {
          type: "array",
          minItems: 1,
          items: { $ref: "#/$defs/aspetto" }
        },
        policy_template: { $ref: "#/$defs/policy_template" },
        sop_template: { $ref: "#/$defs/sop_template" },
        repo_branching_model: {
          type: "object",
          additionalProperties: false,
          required: ["modello","regole"],
          properties: {
            modello: { type: "string" },
            regole: { type: "array", items: { type: "string" } }
          }
        },
        raci: {
          type: "object",
          additionalProperties: false,
          required: ["roles","matrix"],
          properties: {
            roles: { type: "array", minItems: 1, items: { type: "string" } },
            matrix: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                required: ["attivita"],
                properties: {
                  attivita: { type: "string" },
                  SP: { type: "string" },
                  AO: { type: "string" },
                  SI: { type: "string" },
                  OTSec: { type: "string" }
                }
              }
            }
          }
        },
        parametri_generazione: {
          type: "object",
          additionalProperties: false,
          required: ["tipi_documento_supportati","audience_possibili","stili","livello_tecnico","vincoli"],
          properties: {
            tipi_documento_supportati: { type: "array", items: { type: "string" } },
            audience_possibili: { type: "array", items: { type: "string" } },
            stili: { type: "array", items: { type: "string" } },
            livello_tecnico: { type: "array", items: { type: "string" } },
            vincoli: { type: "array", items: { type: "string" } }
          }
        },
        prompting: {
          type: "object",
          additionalProperties: false,
          required: ["prompt_template_generico","prompt_esempio_articolo","prompt_esempio_slide","prompt_esempio_sop"],
          properties: {
            prompt_template_generico: { type: "string" },
            prompt_esempio_articolo: { type: "string" },
            prompt_esempio_slide: { type: "string" },
            prompt_esempio_sop: { type: "string" }
          }
        },
        checklist: { type: "array", items: { type: "string" } },
        campi_contesto_richiesti_per_la_contestualizzazione: { type: "array", items: { type: "string" } },
        avvertenze: { type: "array", items: { type: "string" } }
      }
    },
    aspetto: {
      type: "object",
      additionalProperties: false,
      required: ["id","titolo","descrizione_astratta","rischi_mitigati","pratiche_raccomandate","metriche_kpi","artefatti","placeholders_contesto"],
      properties: {
        id: { type: "string" },
        titolo: { type: "string" },
        descrizione_astratta: { type: "string" },
        rischi_mitigati: { type: "array", items: { type: "string" } },
        pratiche_raccomandate: { type: "array", items: { type: "string" } },
        metriche_kpi: { type: "array", items: { type: "string" } },
        artefatti: {
          type: "object",
          additionalProperties: false,
          required: ["procedure","registri","evidenze"],
          properties: {
            procedure: { type: "array", items: { type: "string" } },
            registri: { type: "array", items: { type: "string" } },
            evidenze: { type: "array", items: { type: "string" } }
          }
        },
        placeholders_contesto: { type: "array", items: { type: "string" } }
      }
    },
    policy_template: {
      type: "object",
      additionalProperties: false,
      required: ["titolo","sezioni","placeholders_contesto"],
      properties: {
        titolo: { type: "string" },
        sezioni: { type: "array", items: { type: "string" } },
        placeholders_contesto: { type: "array", items: { type: "string" } }
      }
    },
    sop_template: {
      type: "object",
      additionalProperties: false,
      required: ["titolo","step","registrazioni"],
      properties: {
        titolo: { type: "string" },
        step: { type: "array", items: { type: "string" } },
        registrazioni: { type: "array", items: { type: "string" } }
      }
    }
  }
};

function buildUserMessage(params) {
  // Ricicla il template "utente" che ti ho dato in precedenza
  return `
Genera il “DB Argomenti” seguendo lo schema richiesto. Parametri:

meta:
  db_name: "DB Argomenti OT/ICS Cybersecurity Controls"
  version: "0.1"
  last_updated: "${params.last_updated}"
  language: "it-IT"
  notes: "Database orientato a oggetti su tre livelli. Contenuti ad alto livello con placeholders di contesto."

ambito:
  id: "${params.ambito_id}"
  nome: "${params.ambito_nome}"
  ruolo: "${params.ruolo}"
  norme_riferimento:
    - "IEC 62443-2-1 (Program management)"
    - "IEC 62443-2-4 (Service providers)"
    - "IEC 62443-3-3 (System security requirements)"
  descrizione: "${params.descrizione}"

sezione:
  id: "change_config_mgmt"
  nome: "Change & Configuration Management (staging, versioning, golden image)"
  obiettivo:
    codice: "15.8"
    descrizione: "Processi di change con staging e rollback; repository di configurazione con versioning; golden image per reinstalli rapidi; controllo del configuration drift."
  output_attesi:
    - "SOP change"
    - "Repository/branching model"
    - "Check drift mensile"
  prompt_base: "Definisci change mgmt con staging/rollback, repo config, golden image e controllo drift."

aspetti_di_sicurezza:
  - id: "staging_rollback"
    titolo: "Staging e rollback dei change"
  - id: "repo_versioning"
    titolo: "Repository configurazioni e versioning"
  - id: "golden_image"
    titolo: "Golden image e reinstalli rapidi"
  - id: "config_drift"
    titolo: "Controllo del configuration drift"

richiedi_compilazione_automatica:
  valore: true

vincoli_stilistici:
  - "Vendor-neutral"
  - "Non citare clausole specifiche se non fornite"
  - "Evitare indicazioni che violino safety"

Output:
- SOLO JSON conforme allo schema definito nel system message.
`;
}

async function generateDbWithStructuredOutputs(params) {
  const systemMessage = `Sei un assistente che genera SOLO JSON UTF-8 valido, senza testo fuori dal JSON.`;
  const userMessage = buildUserMessage(params);

  const body = {
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage }
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "db_argomenti",
        schema: DB_ARGOMENTI_JSON_SCHEMA,
        strict: true
      }
    },
    temperature: 0.2
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${err}`);
    }
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content;
  return JSON.parse(content); // è già JSON valido che rispetta lo schema
}

// Esempio d'uso
(async () => {
  const params = {
    last_updated: "2025-09-05",
    ambito_id: "service_provider_iec62443",
    ambito_nome: "Attività del Service Provider (ruolo IEC 62443)",
    ruolo: "Service Provider",
    descrizione: "Responsabilità del Service Provider OT/ICS nella gestione del ciclo di vita con focus su change & configuration management."
  };

  const db = await generateDbWithStructuredOutputs(params);
  console.log("OK, generato:", Object.keys(db));
})();
