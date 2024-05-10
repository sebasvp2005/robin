
import { Deque, TreeMap} from "tstl"
export const Robin = (arr : Array<Array<number>>, quan : number ) :Array<Array<string>> =>{

  let m = new  TreeMap<number, Array<number>>()
  let n = arr.length

  for(let i =0; i<n; i++){
    let cur = new Array<number>()
    if (m.has(arr[i][0])) cur = m.get(arr[i][0])
    cur.push(i)
    m.set(arr[i][0], cur)
  }

  

  let matrix :Array<Array<string>> = []
  let q = new Deque<number>()
  let count=0;
  let i =0;
  let cnt = 0;

  while(count!=n) {
    if(m.has(i)){
      for(const e of m.get(i)){
        q.push(e)
      }
    }
    matrix.push(Array<string>(n).fill(""))
    if(!q.size()){i++;continue}
    let cur = q.front();
    if(arr[cur][1]==0){
      cnt=0;
      matrix[matrix.length -1][cur] = "F";
      q.pop_front();
      count++;
    }
    if(!q.size()) {i++;continue;}
    cur = q.front();
    if(cnt==quan){
      q.pop_front();
      q.push_back(cur);
      cnt=0;
    }
    for(let t=0;t<q.size(); t++){
      matrix[matrix.length -1][q.at(t)] = t.toString();
    }

    arr[q.front()][1]--;
    cnt++;


    i++
  }
  
  

  return matrix


}