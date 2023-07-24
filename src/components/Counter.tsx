import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    decrement,
    increment,
    incrementByAmount,
} from "../features/counter/counterSlice";

function Counter() {
    // This gets the initial state
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    function handleIncrement() {
        dispatch(increment());
    }

    function handleDecrement() {
        dispatch(decrement());
    }

    function handleIncrementBy() {
        dispatch(incrementByAmount(5));
    }

    return (
        <div className="flex max-w-[300px] flex-col bg-slate-900 px-8 py-4 text-center text-slate-200">
            <button
                className="rounded-2xl bg-amber-500 py-2"
                onClick={handleIncrement}
                type="button"
            >
                Increment
            </button>
            <p className="my-4 rounded-2xl bg-slate-200 py-2 text-black">
                {count}
            </p>
            <button
                className="rounded-2xl bg-sky-500 py-2"
                onClick={handleDecrement}
                type="button"
            >
                Decrement
            </button>
            <button
                className="mt-4 rounded-2xl bg-sky-500 py-2"
                onClick={handleIncrementBy}
                type="button"
            >
                Increment by 5
            </button>
        </div>
    );
}

export default Counter;
