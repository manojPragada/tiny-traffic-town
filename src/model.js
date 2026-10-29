export const roadTopology=Object.freeze({
 nodes:Object.freeze([
  Object.freeze({id:'west-entry',x:0,y:250}),Object.freeze({id:'junction',x:400,y:250}),Object.freeze({id:'east-exit',x:800,y:250}),
  Object.freeze({id:'north-entry',x:400,y:0}),Object.freeze({id:'south-exit',x:400,y:500})
 ]),
 edges:Object.freeze([
  Object.freeze({id:'east-approach',from:'west-entry',to:'junction',lane:'east',length:400}),Object.freeze({id:'east-departure',from:'junction',to:'east-exit',lane:'east',length:400}),
  Object.freeze({id:'south-approach',from:'north-entry',to:'junction',lane:'south',length:250}),Object.freeze({id:'south-departure',from:'junction',to:'south-exit',lane:'south',length:250})
 ])
});
export function routeForLane(lane,topology=roadTopology){return topology.edges.filter(edge=>edge.lane===lane);}
export function routeSummary(lane,topology=roadTopology){
 const edges=routeForLane(lane,topology);if(!edges.length)return null;
 return {lane,edgeIds:edges.map(edge=>edge.id),nodeIds:[edges[0].from,...edges.map(edge=>edge.to)],length:edges.reduce((sum,edge)=>sum+edge.length,0)};
}
export function validateRoadTopology(topology=roadTopology){
 const nodeIds=new Set(topology?.nodes?.map(node=>node.id));
 return Boolean(nodeIds?.size&&topology.edges?.length&&topology.edges.every(edge=>nodeIds.has(edge.from)&&nodeIds.has(edge.to)&&edge.from!==edge.to&&Number.isFinite(edge.length)&&edge.length>0));
}
export function withEdgeLength(topology,edgeId,length){
 const value=Number(length);if(!Number.isFinite(value)||value<10||value>2000||!topology?.edges?.some(edge=>edge.id===edgeId))return null;
 const next=Object.freeze({nodes:topology.nodes,edges:Object.freeze(topology.edges.map(edge=>Object.freeze(edge.id===edgeId?{...edge,length:value}:{...edge})))});
 return validateRoadTopology(next)?next:null;
}
export function withNodePosition(topology,nodeId,x,y){
 const nextX=Number(x),nextY=Number(y);if(!Number.isFinite(nextX)||!Number.isFinite(nextY)||nextX<0||nextX>800||nextY<0||nextY>500||!topology?.nodes?.some(node=>node.id===nodeId))return null;
 const next=Object.freeze({nodes:Object.freeze(topology.nodes.map(node=>Object.freeze(node.id===nodeId?{...node,x:nextX,y:nextY}:{...node}))),edges:topology.edges});
 return validateRoadTopology(next)?next:null;
}
export function edgeSegments(topology=roadTopology){const nodes=new Map(topology.nodes.map(node=>[node.id,node]));return topology.edges.map(edge=>({id:edge.id,from:nodes.get(edge.from),to:nodes.get(edge.to)}));}
export function geometrySummary(topology=roadTopology){const segments=edgeSegments(topology);return {total:Math.round(segments.reduce((sum,segment)=>sum+Math.hypot(segment.to.x-segment.from.x,segment.to.y-segment.from.y),0)),segments:segments.map(segment=>({id:segment.id,length:Math.round(Math.hypot(segment.to.x-segment.from.x,segment.to.y-segment.from.y))}))};}
export function geometryScaleSummary(topology=roadTopology){const geometry=geometrySummary(topology),model=topology.edges.reduce((sum,edge)=>sum+edge.length,0);return {model,preview:geometry.total,ratio:model>0?geometry.total/model:0};}
export function geometryAlignment(topology=roadTopology){const {ratio}=geometryScaleSummary(topology);return ratio>=.9&&ratio<=1.1?'ALIGNED':ratio<.9?'MODEL LONGER':'PREVIEW LONGER';}
export function withGeometryLengths(topology=roadTopology){const lengths=new Map(geometrySummary(topology).segments.map(item=>[item.id,item.length]));const next=Object.freeze({nodes:topology.nodes,edges:Object.freeze(topology.edges.map(edge=>Object.freeze({...edge,length:Math.max(10,lengths.get(edge.id)??edge.length)})))});return validateRoadTopology(next)?next:null;}
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
export function congestionLevel(state){
 const active=state.cars.length;
 const waiting=waitingCount(state);
 const ratio=active===0?0:waiting/active;
 const label=ratio>=.6?'HEAVY':ratio>=.25?'BUILDING':active===0?'CLEAR':'FLOWING';
 return {label,ratio,waiting,active};
}


