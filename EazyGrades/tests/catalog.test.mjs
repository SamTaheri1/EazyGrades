import test from 'node:test';
import assert from 'node:assert/strict';
import courses from '../data/courses.js';
import {tracks,courseInTrack,courseGroups,isCommonCourse} from '../config/tracks.js';
import {engineeringFields} from '../config/engineering-fields.js';
import {matchesCourse} from '../lib/catalog.js';
// Independent transcription of the supplied eng_list.md and requested additions.
const expected={
 'Software Engineering':'comp232 comp352 comp346 elec275 soen331 comp249',
 'Computer Engineering':'coen352 coen346 elec273 elec342 coen311',
 'Electrical Engineering':'elec342 elec372 elec331 elec311 elec251 coen352',
 'Mechanical Engineering':'engr244 engr361 mech352 mech371 mech343 mech351',
 'Civil & Building Engineering':'engr244 bcee342 bcee344 bcee345 civi381 bcee432',
 'Aerospace Engineering':'aero371 engr361 mech352 mech361 aero464 aero455',
 'Industrial Engineering':'indu323 indu324 indu311 indu371 indu372 indu423',
};
const common=['engr213','engr233','engr371'];
const compact=c=>c.id.replace('-','');
test('catalog and field memberships match the supplied list exactly, without duplicates',()=>{
 assert.deepEqual(engineeringFields,Object.keys(expected));assert.equal(courses.length,39);assert.equal(new Set(courses.map(c=>c.id)).size,39);
 assert.deepEqual(courses.map(compact).sort(),[...new Set(Object.values(expected).flatMap(v=>v.split(' ')).concat(common))].sort());
 for(const track of tracks)assert.deepEqual(courses.filter(c=>courseInTrack(c,track.id)).map(compact).sort(),[...new Set(expected[track.name].split(' '))].sort());
});
test('every course is searchable by compact, spaced, uppercase, hyphenated codes and title',()=>{
 for(const c of courses)for(const query of [compact(c),c.code,c.id.toUpperCase(),c.title])assert.ok(matchesCourse(c,query),`${c.id}: ${query}`);
 assert.equal(courses.some(c=>matchesCourse(c,'comp232')),true);
});

test('Engineering Core is a separate first group, never a Premium track',()=>{
 assert.equal(courseGroups[0].id,'engineering-core');
 assert.deepEqual(courses.filter(isCommonCourse).map(compact).sort(),common);
 assert.ok(courses.filter(isCommonCourse).every(c=>c.category==='Engineering Core'));
 assert.ok(tracks.every(t=>!t.courseIds.some(id=>isCommonCourse({id}))));
 assert.equal(courseGroups.reduce((n,g)=>n+g.courseIds.length,0),44);
});

test('partial codes find every matching course, while invalid queries do not match everything',()=>{
 assert.deepEqual(courses.filter(c=>matchesCourse(c,'311')).map(c=>c.code).sort(),['COEN 311','ELEC 311','INDU 311']);
 for(const query of ['---','???','no such course'])assert.equal(courses.filter(c=>matchesCourse(c,query)).length,0);
 for(const query of ['','   '])assert.equal(courses.filter(c=>matchesCourse(c,query)).length,39);
});
