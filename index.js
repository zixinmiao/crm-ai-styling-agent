'use strict';

const fs = require('fs');
const path = require('path');
const manifest = require('./openclaw.plugin.json');

function readTextIfExists(fileName) {
  try { return fs.readFileSync(path.join(__dirname, fileName), 'utf8'); } catch (_) { return null; }
}

function listSkillDirectories() {
  const dirPath = path.join(__dirname, 'skills');
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter((fileName) => fs.statSync(path.join(dirPath, fileName)).isDirectory())
    .map((fileName) => path.join(dirPath, fileName));
}

function activate(api) {
  if (api?.logger?.info) api.logger.info('[Capability Plugin] loaded ' + manifest.id);
  return {
    id: manifest.id,
    name: manifest.name,
    manifest,
    workflow: require('./workflow.json'),
    skillDirectories: listSkillDirectories(),
    docs: {
      agent: readTextIfExists('AGENT.md'),
      soul: readTextIfExists('SOUL.md'),
      rules: readTextIfExists('rules.md'),
      memory: readTextIfExists('memory.md')
    }
  };
}

module.exports = { activate, register: activate, default: { activate } };
