#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Esegue gli script di estrazione in sequenza per un dato nome
 * @param {string} nome - Il nome del processo di estrazione (es: 'cra', 'nis2')
 */
async function runExtraction(nome) {
  try {
    // Leggi il package.json dalla cartella parent
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Trova tutti gli script che iniziano con "extract-{nome}-"
    const extractScripts = Object.keys(packageJson.scripts)
      .filter(scriptName => scriptName.startsWith(`extract-${nome}-`))
      .sort((a, b) => {
        // Estrai il numero di step per ordinare correttamente
        const stepA = parseInt(a.match(/step(\d+)$/)?.[1] || '0');
        const stepB = parseInt(b.match(/step(\d+)$/)?.[1] || '0');
        return stepA - stepB;
      });

    if (extractScripts.length === 0) {
      console.error(`❌ Nessuno script trovato per il nome: ${nome}`);
      process.exit(1);
    }

    console.log(`🚀 Avvio estrazione per: ${nome}`);
    console.log(`📋 Script da eseguire: ${extractScripts.join(', ')}`);
    console.log('');

    // Esegui ogni script in sequenza
    for (let i = 0; i < extractScripts.length; i++) {
      const scriptName = extractScripts[i];
      const scriptCommand = packageJson.scripts[scriptName];
      
      console.log(`⏳ [${i + 1}/${extractScripts.length}] Eseguendo: ${scriptName}`);
      console.log(`   Comando: ${scriptCommand}`);
      
      await runNodeCommand(scriptCommand);
      
      console.log(`✅ [${i + 1}/${extractScripts.length}] Completato: ${scriptName}`);
      console.log('');
    }

    console.log(`🎉 Estrazione completata con successo per: ${nome}`);
    
  } catch (error) {
    console.error(`❌ Errore durante l'estrazione:`, error.message);
    process.exit(1);
  }
}

/**
 * Esegue un comando node direttamente
 * @param {string} command - Il comando completo da eseguire
 */
function runNodeCommand(command) {
  return new Promise((resolve, reject) => {
    const options = {
      cwd: path.join(__dirname, '..'),
      maxBuffer: 1024 * 1024 * 10, // 10MB buffer per output lunghi
      shell: true // Usa la shell per gestire i comandi complessi
    };

    const childProcess = exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Comando fallito: ${error.message}`));
      } else {
        resolve();
      }
    });

    // Inoltra l'output in tempo reale
    childProcess.stdout?.on('data', (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr?.on('data', (data) => {
      process.stderr.write(data);
    });
  });
}

// Gestione degli argomenti da riga di comando
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Errore: specificare il nome del processo di estrazione');
    console.log('');
    console.log('Utilizzo: node run-extraction.js <nome>');
    console.log('');
    console.log('Esempi:');
    console.log('  node run-extraction.js cra     # Esegue extract-cra-step-0, extract-cra-step-1, etc.');
    console.log('  node run-extraction.js nis2    # Esegue extract-nis2-step-0, extract-nis2-step-1, etc.');
    process.exit(1);
  }

  const nome = args[0];
  runExtraction(nome);
}

// Esegui solo se chiamato direttamente
if (require.main === module) {
  main();
}

module.exports = { runExtraction };