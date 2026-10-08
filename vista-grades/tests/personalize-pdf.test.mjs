import test from 'node:test';
import assert from 'node:assert/strict';
import {PDFDocument,StandardFonts,decodePDFRawStream} from 'pdf-lib';
import {personalizePdf} from '../server/personalize-pdf.mjs';

test('a maximum-length signup email wraps completely within the footer',async()=>{
 const master=await PDFDocument.create();master.addPage([612,792]);
 const email='w'.repeat(64)+'@'+'w'.repeat(63)+'.'+'w'.repeat(63)+'.'+'w'.repeat(57)+'.com';
 assert.equal(email.length,254);
 const bytes=await master.save();const doc=await PDFDocument.load(await personalizePdf(bytes,email));
 const font=await doc.embedFont(StandardFonts.Helvetica);
 const streams=doc.getPage(0).node.Contents().asArray().map(ref=>Buffer.from(decodePDFRawStream(doc.context.lookup(ref)).decode()).toString('latin1')).join('\n');
 const drawn=[...streams.matchAll(/<([A-Fa-f0-9]+)>\s*Tj/g)].map(m=>m[1]).join('');
 assert.ok(drawn.includes(font.encodeText(email).toString().slice(1,-1)));
 assert.ok((streams.match(/Tj/g)||[]).length<=5);
});

test('missing and multiline emails cannot produce an unpersonalized download',async()=>{
 const master=await PDFDocument.create();master.addPage([612,792]);const bytes=await master.save();
 for(const email of [undefined,'','student@example.com\nspoof@example.com'])await assert.rejects(personalizePdf(bytes,email));
});

test('copyright and licence lines are centered independently of the right-aligned page number',async()=>{
 const master=await PDFDocument.create();master.addPage([612,792]);
 const doc=await PDFDocument.load(await personalizePdf(await master.save(),'student@example.com'));
 const font=await doc.embedFont(StandardFonts.Helvetica);
 const streams=doc.getPage(0).node.Contents().asArray().map(ref=>Buffer.from(decodePDFRawStream(doc.context.lookup(ref)).decode()).toString('latin1')).join('\n');
 const positions=[...streams.matchAll(/1 0 0 1 ([\d.]+) ([\d.]+) Tm/g)].map(m=>[Number(m[1]),Number(m[2])]);
 const copyright='© 2026 VistaGrades. | Licensed to: student@example.com';
 const notice='For personal study use only. Redistribution, resale, or sharing is not permitted.';
 assert.equal(positions.length,3);
 for(const [i,text] of [copyright,notice].entries())assert.ok(Math.abs(positions[i][0]+font.widthOfTextAtSize(text,7)/2-306)<0.01);
 assert.equal(positions[0][1],24);assert.equal(positions[1][1],12);
 assert.ok(Math.abs(positions[2][0]+font.widthOfTextAtSize('1',7)-556)<0.01);
});
