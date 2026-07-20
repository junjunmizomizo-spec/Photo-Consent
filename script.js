(()=>{"use strict";/* Harmony: creators-only project name; not shown in the public UI. */const K="photoConsentAppV1",P="1234",O=[{level:1,title:"① 撮影OK",description:"撮影しても大丈夫です。"},{level:2,title:"② 集合写真ならOK",description:"集合写真であれば大丈夫です。"},{level:3,title:"③ 顔が写らなければOK",description:"後ろ姿や手元など、顔が写らない写真であれば大丈夫です。"},{level:4,title:"④ ボケている写真・身体の一部ならOK",description:"人物が特定されにくい写真であれば大丈夫です。"},{level:5,title:"⑤ 今回は撮影を見送ります",description:"今回は写らないように配慮をお願いします。"}],S={name:"",level:null,taps:0,timer:null,edit:null},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];function D(){let id=crypto.randomUUID();return{activeEventId:id,events:[{id,name:"現在のイベント",createdAt:new Date().toISOString(),responses:[]}]}}function L(){try{let r=localStorage.getItem(K);if(!r){let d=D();W(d);return d}let d=JSON.parse(r);if(!d.events?.length){d=D();W(d)}return d}catch{let d=D();W(d);return d}}function W(d){localStorage.setItem(K,JSON.stringify(d))}function A(d){return d.events.find(e=>e.id===d.activeEventId)||d.events[0]}function screen(id){$$('.screen').forEach(x=>x.classList.remove('is-active'));$(id).classList.add('is-active')}function step(id){$$('.step').forEach(x=>x.classList.remove('is-active'));$(id).classList.add('is-active');scrollTo({top:0,behavior:'smooth'})}function reset(){S.name='';S.level=null;$('#participant-name').value='';$$('.option-card').forEach(c=>c.setAttribute('aria-pressed','false'));screen('#participant-view');step('#intro-step')}function esc(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}function renderOptions(){let l=$('#option-list');l.innerHTML='';O.forEach(o=>{let b=document.createElement('button');b.type='button';b.className='option-card';b.dataset.level=o.level;b.setAttribute('aria-pressed','false');b.innerHTML=`<strong>${esc(o.title)}</strong><span>${esc(o.description)}</span>`;b.onclick=()=>{S.level=o.level;$$('.option-card').forEach(c=>c.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true')};l.appendChild(b)});$('#edit-option').innerHTML=O.map(o=>`<option value="${o.level}">${esc(o.title)}</option>`).join('')}function toOptions(){let n=$('#participant-name').value.trim();if(!n){alert('お名前を入力してください。');return}S.name=n;step('#option-step')}function toConfirm(){if(!S.level){alert('撮影についてのご希望を選んでください。');return}let o=O.find(x=>x.level===S.level);$('#confirm-name').textContent=S.name;let b=$('#confirm-option');b.textContent=o.title;b.className=`status-badge level-${o.level}`;step('#confirm-step')}function submit(){let d=L(),e=A(d),dup=e.responses.find(x=>x.name.trim().toLowerCase()===S.name.trim().toLowerCase()),r={id:dup?.id||crypto.randomUUID(),name:S.name,level:S.level,option:O.find(x=>x.level===S.level).title,createdAt:dup?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()};if(dup){if(!confirm('同じお名前の回答があります。以前の回答を更新しますか？'))return;e.responses=e.responses.map(x=>x.id===dup.id?r:x)}else e.responses.push(r);W(d);step('#complete-step');setTimeout(reset,3000)}function login(){if($('#admin-passcode').value!==P){$('#login-error').textContent='パスコードが違います。';return}screen('#admin-view');renderAdmin()}function renderAdmin(){let d=L(),e=A(d);$('#current-event-title').textContent=e.name;$('#event-response-count').textContent=e.responses.length;$('#event-select').innerHTML=d.events.map(x=>`<option value="${x.id}" ${x.id===d.activeEventId?'selected':''}>${esc(x.name)}（${x.responses.length}件）</option>`).join('');renderResponses()}function renderResponses(){let d=L(),e=A(d),q=$('#search-input').value.trim().toLowerCase(),f=$('#filter-select').value,r=[...e.responses].sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));$('#current-event-title').textContent=e.name;$('#event-response-count').textContent=e.responses.length;if(q)r=r.filter(x=>x.name.toLowerCase().includes(q));if(f!=='all')r=r.filter(x=>String(x.level)===f);$('#response-count').textContent=`${r.length}件`;let l=$('#response-list');if(!r.length){l.innerHTML='<p class="helper">該当する回答はありません。</p>';return}l.innerHTML='';r.forEach(x=>{let c=document.createElement('article');c.className=`response-card level-${x.level}`;c.innerHTML=`<h3>${esc(x.name)}</h3><p>${esc(x.option)}</p><p class="helper">更新：${new Date(x.updatedAt).toLocaleString('ja-JP')}</p><div class="response-actions"><button class="edit-button">編集</button><button class="delete-button">削除</button></div>`;c.querySelector('.edit-button').onclick=()=>edit(x.id);c.querySelector('.delete-button').onclick=()=>del(x.id);l.appendChild(c)})}function newEvent(){let n=$('#new-event-name').value.trim();if(!n){alert('イベント名を入力してください。');$('#new-event-name').focus();return}let d=L();if(d.events.some(e=>e.name.trim().toLowerCase()===n.toLowerCase())){alert('同じ名前のイベントがあります。別の名前を入力してください。');$('#new-event-name').focus();return}let id=crypto.randomUUID();d.events.push({id,name:n,createdAt:new Date().toISOString(),responses:[]});d.activeEventId=id;W(d);$('#new-event-name').value='';$('#event-form').classList.add('is-hidden');renderAdmin()}function edit(id){let d=L(),r=A(d).responses.find(x=>x.id===id);if(!r)return;S.edit=id;$('#edit-name').value=r.name;$('#edit-option').value=r.level;$('#edit-dialog').showModal()}function saveEdit(){let n=$('#edit-name').value.trim(),lv=Number($('#edit-option').value);if(!n){alert('お名前を入力してください。');return}let d=L(),e=A(d);e.responses=e.responses.map(x=>x.id===S.edit?{...x,name:n,level:lv,option:O.find(o=>o.level===lv).title,updatedAt:new Date().toISOString()}:x);W(d);renderResponses()}function del(id){if(!confirm('この回答を削除しますか？'))return;let d=L(),e=A(d);e.responses=e.responses.filter(x=>x.id!==id);W(d);renderResponses()}function csv(returnSuccess=false){
let d=L(),e=A(d);
if(!e.responses.length){
  if(!returnSuccess)alert('書き出す回答がありません。');
  return false
}
let created=new Date(e.createdAt),today=new Date(),date=`${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
let rows=[
  ['イベント名',e.name],
  ['作成日',created.toLocaleString('ja-JP')],
  ['回答数',`${e.responses.length}件`],
  [],
  ['名前','回答','登録日時','更新日時'],
  ...e.responses.map(x=>[x.name,x.option,new Date(x.createdAt).toLocaleString('ja-JP'),new Date(x.updatedAt).toLocaleString('ja-JP')])
];
let c='\uFEFF'+rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n'),
u=URL.createObjectURL(new Blob([c],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
a.href=u;a.download=`${date}_${e.name.replace(/[\\/:*?"<>|]/g,'_')}.csv`;
document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);return true
}
function setFinishDialog(title,message,buttons){
$('#finish-dialog-title').textContent=title;
$('#finish-dialog-message').textContent=message;
let box=$('#finish-dialog-actions');box.innerHTML='';
buttons.forEach(b=>{let el=document.createElement('button');el.type='button';
el.className=b.kind==='danger'?'danger-button':b.kind==='secondary'?'secondary-button':'primary-button';
el.textContent=b.label;el.onclick=b.onClick;box.appendChild(el)});
$('#finish-event-dialog').showModal()
}
function closeFinishDialog(){if($('#finish-event-dialog').open)$('#finish-event-dialog').close()}
function finishEvent(){
let e=A(L());
setFinishDialog('このイベントを終了しますか？',
`「${e.name}」を終了する準備をします。\n回答データは、次の手順でCSV保存や削除を選べます。`,
[{label:'キャンセル',kind:'secondary',onClick:closeFinishDialog},{label:'終了手続きへ',onClick:askExport}])
}
function askExport(){
let e=A(L());
setFinishDialog('CSVを書き出しますか？',
`${e.responses.length}件の回答があります。\n削除を選ぶ可能性がある場合は、先にCSVを保存してください。`,
[{label:'書き出さない',kind:'secondary',onClick:askClearResponses},
{label:'CSVを書き出す',onClick:()=>{csv(true);setTimeout(askClearResponses,250)}}])
}
function askClearResponses(){
let e=A(L());
setFinishDialog('回答を削除しますか？',
`「${e.name}」の回答 ${e.responses.length}件を削除できます。\n削除した回答は元に戻せません。イベント自体は残ります。`,
[{label:'回答を残す',kind:'secondary',onClick:askCreateNextEvent},
{label:'回答を削除',kind:'danger',onClick:()=>{let d=L(),a=A(d);a.responses=[];a.endedAt=new Date().toISOString();W(d);renderAdmin();askCreateNextEvent()}}])
}
function askCreateNextEvent(){
setFinishDialog('イベントを終了しました','続けて新しいイベントを作成できます。',
[{label:'あとで',kind:'secondary',onClick:closeFinishDialog},
{label:'新しいイベントを作成',onClick:()=>{closeFinishDialog();$('#event-form').classList.remove('is-hidden');$('#new-event-name').focus()}}])
}
function deleteEvent(){
let d=L(),e=A(d);
if(d.events.length<=1){alert('イベントは最低1つ必要です。先に新しいイベントを作成してください。');return}
let typed=prompt(`「${e.name}」を削除します。\nこの操作は元に戻せません。\n確認のため、イベント名を入力してください。`);
if(typed===null)return;
if(typed.trim()!==e.name){alert('イベント名が一致しないため、削除しませんでした。');return}
d.events=d.events.filter(x=>x.id!==e.id);d.activeEventId=d.events[0].id;W(d);
$('#search-input').value='';$('#filter-select').value='all';renderAdmin()
}
document.onclick=e=>{let a=e.target.closest('[data-action]')?.dataset.action;if(!a)return;({start:()=>step('#name-step'),'back-intro':()=>step('#intro-step'),'to-options':toOptions,'back-name':()=>step('#name-step'),'to-confirm':toConfirm,edit:()=>step('#name-step'),submit,'admin-cancel':reset,'admin-login':login,'admin-logout':reset,'new-event':()=>$('#event-form').classList.remove('is-hidden'),'cancel-event':()=>$('#event-form').classList.add('is-hidden'),'save-event':newEvent,'finish-event':finishEvent,'delete-event':deleteEvent,'export-csv':csv}[a]||(()=>{}))()};let holdTimer=null;
const adminTrigger=$('#admin-trigger');
const openAdmin=()=>{if(navigator.vibrate)navigator.vibrate(40);$('#admin-passcode').value='';$('#login-error').textContent='';screen('#admin-login-view')};
adminTrigger.onpointerdown=e=>{e.preventDefault();clearTimeout(holdTimer);holdTimer=setTimeout(openAdmin,1800)};
['pointerup','pointercancel','pointerleave'].forEach(n=>adminTrigger.addEventListener(n,()=>clearTimeout(holdTimer)));
adminTrigger.oncontextmenu=e=>e.preventDefault();$('#event-select').onchange=e=>{let d=L();d.activeEventId=e.target.value;W(d);$('#search-input').value='';$('#filter-select').value='all';renderAdmin()};$('#search-input').oninput=renderResponses;$('#filter-select').onchange=renderResponses;$('#save-edit-button').onclick=e=>{e.preventDefault();saveEdit();$('#edit-dialog').close()};if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js'));renderOptions();reset()})();