import { Robin } from "@/assets/algorithms/robin";
import { ReactElement, useRef, useState } from "react";


export const Home = ():ReactElement=>{

  const text = useRef<HTMLTextAreaElement>(null)
  const quan = useRef<HTMLInputElement>(null)

  function extractNumbersFromString(inputString: string): number[] {
    // Regular expression to match numbers separated by whitespace
    const numberRegex = /\b\d+\b/g;

    // Extract numbers from the input string
    const numbers: number[] = [];
    let match;
    while ((match = numberRegex.exec(inputString)) !== null) {
        numbers.push(parseInt(match[0], 10)); // Convert matched string to integer and push to array
    }

    return numbers;
}

  const [matrix, setMatrix] = useState<Array<Array<string>>|undefined>(undefined)



  const handle = ()=>{
    if(quan===null && text===null) return

    let numbers = extractNumbersFromString(text.current!.value)
    console.log(numbers)
    let arr :Array<Array<number >>  = []
    for(let i=0; i+i+1<numbers.length; i++){
      arr.push([numbers[i+i] , numbers[i+i+1]])
    }
    let q = Number(quan.current!.value)

    setMatrix(Robin(arr, q))

  }

  const generateMatrix = ()=>{
    if(matrix==undefined) return []
    console.log(matrix)
    let elements = []

    for(let i=0;i<matrix[0].length; i++){
      for(let j=0;j<matrix.length; j++){
        if (matrix[j][i]=="") elements.push(<div key={`${i}-${j}`} className="   "></div>)
        else if(matrix[j][i]=="F") elements.push(<div key={`${i}-${j}`} className="  bg-red-400 ">F</div>)
        else if(matrix[j][i]=="0")elements.push(<div  key={`${i}-${j}`} className=" bg-green-400 ">0</div>) 
        else elements.push(<div  key={`${i}-${j}`}  className="  bg-yellow-300 ">{matrix[j][i]}</div>) 
      }
    }
    return elements
  }



    

  return(


    <div className="grid grid-rows-[auto_1fr_auto] h-[100vh]">
      <div className="bg-primary h-[100px]">

      </div>
      <div className="h-full w-full  py-10 text-primary">
        <span className="text-3xl font-bold">Calculadora Robin</span>
        <form onSubmit={e=>{e.preventDefault(); handle();}} className="flex flex-col w-1/2 space-y-4 text-2xl font-semibold text-primary" >
          <span>Ingrese quart</span>
          <input ref={quan} type="number"  className="border border-secondary text-lg font-normal"/>
          <span>Ingrese procesos (arrive, time)</span>
          <textarea ref={text} name="" id="" className="h-[100px] border border-secondary text-lg font-normal"></textarea>
          <button type="submit" className="p-4 bg-secondary rounded-xl text-primary font-bold text-3xl uppercase">Calcular</button>
        </form>


            <div className="grid text-2xl gap-1 text-center p-4 text-black" style={{ gridTemplateColumns: `repeat(${matrix?.length}, minmax(0, 1fr))` }}>
              {
                generateMatrix()
              }
            </div>
        <div className="grid">
          <div className="overflow-x-auto">
          </div>
        </div>
        

      </div>

      <div className="bg-secondary h-[100px]">

      </div>



    </div>

  )
}