export function initialState(){return {green:'east',targetGreen:'east',clearanceLeft:0,cars:[{id:1,lane:'east',position:120},{id:2,lane:'south',position:70}],completed:0,nextId:3};}
export function spawn(state){if(state.cars.length>=20)return state;const lane=state.nextId%2?'east':'south';if(state.cars.some(c=>c.lane===lane&&c.position<35))return state;return {...state,nextId:state.nextId+1,cars:[...state.cars,{id:state.nextId,lane,position:0}]};}
export function step(state,seconds){const dt=Number.isFinite(seconds)?Math.max(0,Math.min(seconds,.1)):0;const cars=[];let completed=state.completed;for(const lane of ['east','south']){let leader=Infinity;for(const car of state.cars.filter(c=>c.lane===lane).sort((a,b)=>b.position-a.position)){const stop=lane==='east'?330:180;let next=car.position+60*dt;if(state.green!==lane&&car.position<=stop)next=Math.min(next,stop);next=Math.min(next,leader-32);next=Math.max(car.position,next);leader=next;const end=lane==='east'?830:530;if(next>end)completed++;else cars.push({...car,position:next});}}let green=state.green,clearanceLeft=state.clearanceLeft??0;
 if(green===null){
   clearanceLeft=Math.max(0,clearanceLeft-dt);
   if(clearanceLeft===0&&!cars.some(committedToJunction))green=state.targetGreen;
 }
 return {...state,cars,completed,green,clearanceLeft};}
export function committedToJunction(car){
 const stop=car.lane==='east'?330:180,exit=car.lane==='east'?456:304;
 return car.position>stop&&car.position<exit;
}
export function requestSignal(state,lane){
 if(!['east','south'].includes(lane))return state;
 if(state.green===lane||(state.green===null&&state.targetGreen===lane))return state;
 return {...state,green:null,targetGreen:lane,clearanceLeft:2};
}
export function waitingCount(state){
 let count=0;
 for(const lane of ['east','south']){
  if(state.green===lane)continue;
  const stop=lane==='east'?330:180;
  let blockedPosition=null;
  for(const car of state.cars.filter(car=>car.lane===lane&&car.position<=stop).sort((a,b)=>b.position-a.position)){
   if(stop-car.position<=2||(blockedPosition!==null&&blockedPosition-car.position<=34)){
    count++;blockedPosition=car.position;
   }else blockedPosition=null;
  }
 }
 return count;
}
