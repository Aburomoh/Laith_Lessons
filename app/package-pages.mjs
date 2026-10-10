import { mkdirSync, copyFileSync, writeFileSync, existsSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
// A fresh, explicit runtime-only package. Never copy the repository wholesale.
const root=new URL('../',import.meta.url);
const output=new URL('../pages-dist/',import.meta.url);
if(existsSync(output))throw new Error('pages-dist already exists. Use a fresh output folder for packaging.');
const copy=(path)=>{const destination=new URL(path,output);mkdirSync(new URL('./',destination),{recursive:true});copyFileSync(new URL(path,root),destination)};
for(const file of ['index.html','app.js','styles.css'])copy('app/'+file);
const app=stripTypeScriptTypes(readFileSync(new URL('app.ts',import.meta.url),'utf8'));
const poses=runInNewContext(app.match(/const poses[^=]*=([^;]+);/s)[0]+'\nposes');
for(const [name] of poses)copy(`app/assets/tutor/${name}.webp`);
for(const photo of new Set(runInNewContext(stripTypeScriptTypes(readFileSync(new URL('questions.ts',import.meta.url),'utf8'))+'\nquestions').map(q=>q.photo)))copy('app/'+photo);
for(const name of ['family','giraffes','arrival'])copy(`app/assets/illustrations/${name}.webp`);
writeFileSync(new URL('index.html',output),'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=./app/index.html"><title>Laith’s English Studio</title><a href="./app/index.html">Open English Studio</a></html>');
writeFileSync(new URL('.nojekyll',output),'');
console.log('Packaged runtime files in pages-dist, including web-sized page photos; development files excluded.');
