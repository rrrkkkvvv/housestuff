interface useDebounceProps{
    fn:(...args:any)=>any;
    waitTime:number;
}

const debounce = ({fn, waitTime}:useDebounceProps)=>{
    let timeout :ReturnType<typeof setTimeout>;
    return(...args:any)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>fn(...args), waitTime);
    }
}

export default debounce;

 