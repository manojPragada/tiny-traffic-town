export type RoadGrid=ReadonlySet<string>
export type GridEdit={roads:Set<string>;changed:boolean;message:string}
export const cellKey=(x:number,y:number)=>`${x},${y}`
export const starterRoads=()=>new Set([cellKey(2,2),cellKey(2,1),cellKey(2,3),cellKey(1,2),cellKey(3,2)])
const neighbors=(key:string)=>{const[x,y]=key.split(',').map(Number);return[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].filter(([a,b])=>a>=0&&a<5&&b>=0&&b<5).map(([a,b])=>cellKey(a,b))}
export function isConnected(roads:RoadGrid){if(!roads.size)return true;const[first]=roads,seen=new Set([first]),queue=[first];while(queue.length){for(const next of neighbors(queue.shift()!))if(roads.has(next)&&!seen.has(next)){seen.add(next);queue.push(next)}}return seen.size===roads.size}
export function toggleRoad(roads:RoadGrid,key:string):GridEdit{const next=new Set(roads);if(key===cellKey(2,2))return{roads:next,changed:false,message:'The junction center stays connected.'};if(next.has(key)){next.delete(key);if(!isConnected(next))return{roads:new Set(roads),changed:false,message:'That removal would disconnect the road network.'};return{roads:next,changed:true,message:'Road segment removed.'}}if(!neighbors(key).some(neighbor=>next.has(neighbor)))return{roads:next,changed:false,message:'New roads must touch the existing network.'};next.add(key);return{roads:next,changed:true,message:'Road segment added.'}}
