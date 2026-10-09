import { mkdirSync, copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
// A fresh, explicit runtime-only package. Never copy the repository wholesale.
const root=new URL('../',import.meta.url);
const output=new URL('../pages-dist/',import.meta.url);
if(existsSync(output))throw new Error('pages-dist already exists. Use a fresh output folder for packaging.');
const copy=(path)=>{const destination=new URL(path,output);mkdirSync(new URL('./',destination),{recursive:true});copyFileSync(new URL(path,root),destination)};
for(const file of ['index.html','app.js','styles.css'])copy('learning-tool/'+file);
const app=stripTypeScriptTypes(readFileSync(new URL('app.ts',import.meta.url),'utf8'));
const poses=runInNewContext(app.match(/const poses[^=]*=([^;]+);/s)[0]+'\nposes');
for(const [name] of poses)copy(`tutor poses/tutor_${name}.png`);
for(const name of ['family','giraffes','arrival'])copy(`learning-tool/assets/${name}.png`);
writeFileSync(new URL('index.html',output),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=./learning-tool/index.html"><title>Laith’s English Studio</title><a href="./learning-tool/index.html">Open English Studio</a></html>');
writeFileSync(new URL('.nojekyll',output),'');
console.log('Packaged runtime files in pages-dist; worksheet photographs and development files excluded.');
