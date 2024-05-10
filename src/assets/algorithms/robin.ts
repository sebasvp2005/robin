
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

    let temp :Array<Array<number>> = []
    if(m.has(i)){
      for(const e of m.get(i)){
        temp.push([arr[e][1], e])
      }
    }
    for(let j=0; j<temp.length; j++){
      q.push_back(temp[j][1])
    }
    
    matrix.push(Array<string>(n).fill(""))
    if(q.size()){
      let cur = q.front();
      if(arr[cur][1]==0){
        cnt=0;
        matrix[matrix.length -1][cur] = "F";
        q.pop_front();
        count++;
      }

      if(q.size()){  
  
        cur = q.front();
        if(cnt==quan){
          q.pop_front();
          console.log(i, cur)
          q.push_back(cur)
          cnt=0;
        }

      }

    }
  
    

    for(let t=0;t<q.size(); t++){
      matrix[matrix.length -1][q.at(t)] = t.toString();
    }

    if(q.size()){
      arr[q.front()][1]--;
      cnt++;
    }
    i++
  }
  
  

  return matrix


}