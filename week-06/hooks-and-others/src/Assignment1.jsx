import React, { useEffect, useMemo, useState } from 'react'

const Assignment1 = () => {
    let [num, setNum] = useState();
    let [count, setCount] = useState(0);

    const clickBtn = (e) => {
        console.log('rendering btn');        
        e.preventDefault();
        setCount(count = count + 1);
    }

    const changeNum = (e) => {
        console.log('changing values');
        setNum(e.target.value);
    }

    const factorial = useMemo(() => {
        console.log('rendering factorial');
        
        let f = 1;
        for (let i=1;i<=num;i++) {
            f *= i;
        }
        return f;
    }, [num]);

  return (
    <div>
      <form>
        <input type="number" name="num" id="num" placeholder='Number' onChange={changeNum} required />
        <p>Factorial of {num} is {factorial}</p>
        <button onClick={clickBtn}>Count is {count}</button>
      </form>
    </div>
  )
}

export default Assignment1
