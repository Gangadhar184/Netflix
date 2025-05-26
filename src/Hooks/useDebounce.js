
import {useRef, useMemo, useEffect} from 'react'

const useDebounce = (callback, delay) => {

    const timer = useRef(null);
    const callbackRef = useRef(callback);

    //update callback ref when callback changes
    useEffect(()=>{
        callbackRef.current = callback;
    }, [callback]);

    //memoize the debounce function to prevent recreating on every render
    const debouncedCallback = useMemo(()=>{
        return(...args)=>{
            if(timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(()=>{
                callbackRef.current(...args);
            }, delay)
        }
    }, [delay]);

    //memoize clear function 
    const clearDebounce = useMemo(()=>{
        return ()=>{
            if(timer.current){
                clearTimeout(timer.current);
            }
        }
    }, []);

    //clean on unmount
     useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return [debouncedCallback, clearDebounce]
}
export default useDebounce;
