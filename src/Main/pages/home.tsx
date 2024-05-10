import { Robin } from "@/assets/algorithms/robin";
import React ,{ ReactElement, useRef, useState } from "react";

interface inf {
  arrival: number,
  burst: number,
  finish: number,
  return: number,
  waiting: number,
  start: number
}


export const Home = ():ReactElement=>{

  const text = useRef<HTMLTextAreaElement>(null)
  const quan = useRef<HTMLInputElement>(null)

  function extractNumbersFromString(inputString: string): number[] {

    const numberRegex = /\b\d+\b/g;

    const numbers: number[] = [];
    let match;
    while ((match = numberRegex.exec(inputString)) !== null) {
        numbers.push(parseInt(match[0], 10)); 
    }

    return numbers;
}

  const [matrix, setMatrix] = useState<Array<Array<string>>|undefined>(undefined)
  const [info, setInfo] = useState<Array<inf> | undefined>(undefined)
  const [retorno, setRetorno] = useState(0)
  const [wait, setWait] = useState(0)



  const handle = ()=>{
    if(quan===null && text===null) return

    let numbers = extractNumbersFromString(text.current!.value)
    console.log(numbers)
    let arr :Array<Array<number >>  = []
    for(let i=0; i+i+1<numbers.length; i++){
      arr.push([numbers[i+i] , numbers[i+i+1]])
    }
    let q = Number(quan.current!.value)

    const temp = Robin(arr, q)

    setMatrix(temp)

    let suma=0;
    let sumb =0;

    let infotemp: Array<inf>= []
    for(let i=0;i<temp[0].length; i++){
      let count = 0;
      let ret = 0
      let fi = -1;
      let start= -1
      let o = -1
      for(let j=0;j<temp.length; j++){
        if (temp[j][i]=="") {}
        else if(temp[j][i]=="F"){ if(fi==-1) fi = j;}
        else if(temp[j][i]=="0"){ ret++; if(o==-1)o=j}
        else { count++; ret++}

        if(temp[j][i]!="" && start==-1) start=j
      }

      suma += ret
      sumb += count

      infotemp.push({
        arrival: start,
        burst: ret- count,
        finish: fi,
        return: ret,
        waiting: count,
        start: o
      })

    }
    setRetorno(suma)
    setWait(sumb)

    setInfo(infotemp)




  }

  const generateMatrix = ()=>{
    if(matrix==undefined) return []
    let elements = []
    let mx=0
    let freq= []
    for(let i=0;i<matrix.length; i++){
      let cur =[]
      for(let j=0;j<matrix[0].length; j++){
        if (matrix[i][j]!="" &&  matrix[i][j]!="0" && matrix[i][j]!="F") {
          cur.push([Number(matrix[i][j]), j])
        }
        
      }
      
      mx = Math.max(mx, cur.length)
      cur.sort((a,b)=>a[0]-b[0])
      freq.push(cur)
    }

    for(let i =0 ; i<mx; i++){
      elements.push(<div key={`${i}-_queue`} className="   "></div>)
      for(let j=0; j<matrix.length; j++){
        let cur = mx-1-i
        elements.push(<div key={`${i}-${j}_queue`} className="   ">{cur<freq[j].length? "P"+(freq[j][cur][1]+1).toString() : ""}</div>)
      }
    }
    console.log(freq)

    for(let i=0;i<matrix[0].length; i++){
      let count = 0;
      let ret = 0
      let fi = -1;
      elements.push(<div key={`${i}-label`} className="   ">P{(i+1)}</div>)
      for(let j=0;j<matrix.length; j++){
        if (matrix[j][i]=="") elements.push(<div key={`${i}-${j}`} className="   "></div>)
        else if(matrix[j][i]=="F"){ elements.push(<div key={`${i}-${j}`} className="  bg-red-400 ">F</div>); if(fi==-1) fi = j;}
        else if(matrix[j][i]=="0"){elements.push(<div  key={`${i}-${j}`} className=" bg-green-400  ">0</div>) ; ret++}
        else {elements.push(<div  key={`${i}-${j}`}  className="  bg-yellow-300  ">{matrix[j][i]}</div>) ; count++; ret++}
      }

    }
    elements.push(<div key={`bfore-label`} className="   "></div>)
    for(let i=0;i<matrix.length; i++){
      elements.push(<div key={`${i}-row`} className="   ">{i}</div>)
    }

    
    return elements
  }



    

  return(


    <div className="grid grid-rows-[auto_1fr_auto] h-[100vh]">
      <div className="bg-primary h-[100px]">

      </div>
      <div className="h-full w-full flex flex-col items-center py-10 text-primary">
        <span className="text-3xl font-bold">Calculadora Robin</span>
        <form onSubmit={e=>{e.preventDefault(); handle();}} className="flex flex-col w-1/2 space-y-4 text-2xl font-semibold text-primary" >
          <span>Ingrese quart</span>
          <input ref={quan} type="number"  className="border border-secondary text-lg font-normal"/>
          <span>Ingrese procesos (arrive, time)</span>
          <textarea ref={text} name="" id="" className="h-[100px] border border-secondary text-lg font-normal"></textarea>
          <button type="submit" className="p-4 bg-secondary rounded-xl text-primary font-bold text-3xl uppercase">Calcular</button>
        </form>



        <div className="grid">
          <div className="overflow-x-auto">
            <div className="grid text-2xl gap-1 text-center p-4 text-black"
                 style={{gridTemplateColumns: `repeat(${(matrix?.length??0) + 1}, 32px)`}}>
              {
                generateMatrix()
              }
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 p-4 w-[60%] min-w-[700px] items-center text-center text-2xl font-bold text-gray-500 ">

          {
            info!==undefined &&
            <>
            <span>Proceso</span>
            <span>T. Llegada</span>
            <span>T. Ejecucion</span>
            <span>T. Comiezo</span>
            <span>T. Finalizacion</span>
            <span>T. Retorno</span>
            <span>T. Espera</span>

            {
              info.map((val, ind)=>{
                return <React.Fragment key={`${ind}-cell`}>
                  <span>P{ind+1}</span>
                  <span>{val.arrival}</span>
                  <span>{val.burst}</span>
                  <span>{val.start}</span>
                  <span>{val.finish}</span>
                  <span>{val.return}</span>
                  <span>{val.waiting}</span>
                </React.Fragment>
              })
            }
            <span> </span>
            <span> </span>
            <span> </span>
            <span> </span>
            <span>Promedio: </span>
            <span>{Math.round(retorno/matrix![0].length * 100)/ 100}</span>
            <span>{Math.round(wait/matrix![0].length * 100)/ 100}</span>

            </>
          }

        </div>


        

      </div>

      <div className="bg-secondary h-[100px]">

      </div>



    </div>

  )
}