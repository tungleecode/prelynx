const fs = require('fs');
const modules = {};

global.__d = function(factory, moduleId, dependencyMap) {
  modules[moduleId] = { factory };
};
global.__r = function() {};

try { require('./__common-df50d9de47226b33588ae525c346fa51.js'); } catch(e){}
try { require('./entry.js'); } catch(e){}

let allData = {};

function processExport(exp, id) {
  if (!exp) return;
  if (typeof exp === 'object' && !Array.isArray(exp)) {
      const keys = Object.keys(exp);
      if (keys.length > 20) {
          const sampleVal = exp[keys[0]];
          if (typeof sampleVal === 'object' && sampleVal !== null) {
              const size = JSON.stringify(exp).length;
              if (size > 50000) {
                  console.log(`Module ${id} is a data dictionary! Keys: ${keys.length}, Size: ${Math.round(size/1024)}KB`);
                  Object.assign(allData, exp);
              }
          }
      }
      
      // Check for nested default exports or ES modules
      if (exp.default) {
         processExport(exp.default, id + "-default");
      }
      for (const k of Object.keys(exp)) {
         if (k !== 'default' && typeof exp[k] === 'object' && !Array.isArray(exp[k])) {
             const size = JSON.stringify(exp[k]).length;
             if (size > 50000) {
                 processExport(exp[k], id + "-" + k);
             }
         }
      }
  }
}

for (const id in modules) {
  const mod = { exports: {} };
  try {
      modules[id].factory({}, () => {}, {}, {}, mod, mod.exports, []);
      processExport(mod.exports, id);
  } catch(e) {}
}

const finalJson = JSON.stringify(allData, null, 2);
fs.writeFileSync("full_contents.json", finalJson);
console.log(`Saved full_contents.json! Total items: ${Object.keys(allData).length}, Total size: ${Math.round(finalJson.length/1024/1024)}MB`);

