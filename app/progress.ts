// A one-day gap is a practical review schedule, not a claim of mastery.
const reviewDelay = 24 * 60 * 60 * 1000;
type PracticeEvent = 'correct' | 'retry' | 'hint' | 'concept' | 'revealed';
type RecallRecord = {pending:boolean; last:number; supported:boolean; outcome:'supported'|'unaided'|'remembered'|'practice'; remembered:number};
type LessonRecord = {correct:boolean; supported:boolean; missed:boolean; revealed:boolean; remembered:boolean};
function recordPractice(previous:RecallRecord|undefined,event:PracticeEvent,now:number):RecallRecord {
  const delayed=!!previous && now-previous.last>=reviewDelay;
  const supported=event!=='correct'||!!previous?.supported&&!delayed;
  const remembered=event==='correct'&&!!previous?.pending&&delayed&&!supported;
  return {pending:remembered?false:(previous?.pending||event!=='correct'),last:now,supported,
    outcome:event!=='correct'?'practice':remembered?'remembered':supported?'supported':'unaided',
    remembered:remembered?now:previous?.remembered||0};
}
function recordLesson(previous:LessonRecord|undefined,event:PracticeEvent,recall:RecallRecord):LessonRecord {
  return {correct:!!previous?.correct||event==='correct',supported:!!previous?.supported||recall.supported,
    missed:!!previous?.missed||event==='retry',revealed:!!previous?.revealed||event==='revealed',
    remembered:!!previous?.remembered||recall.outcome==='remembered'};
}
