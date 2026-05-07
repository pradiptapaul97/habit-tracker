import { Button } from "./Button";
import { useHabits } from "../context/useHabits";
import { format, isToday } from "date-fns";

type HeaderProps = {
    visibleDates: Date[];
    onPrevWeek: () => void;
    onNextWeek: () => void;
}

export function Header({ visibleDates, onPrevWeek, onNextWeek }: HeaderProps) {
    const { habits } = useHabits();
    const doneToday = habits.filter(h => h.completions.some(c => isToday(c))).length;
    const daterange = `${format(visibleDates[0], "MMM d")
        } - ${format(visibleDates[6], "MMM d")
        }`

    return (
        <header className='flex items-center justify-between'>
            <div className='flex flex-col gap-1'>
                <h1 className='text-3xl font-bold'>Habit Tracker</h1>
                <span className='text-zinc-400 text-sm'>{doneToday} / {habits.length} done today</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='text-zinc-400 text-sm'>{daterange}</span>
                <div className="flex items-center gap-3">
                    <Button onClick={onPrevWeek}>Prev</Button>
                    <Button onClick={onNextWeek} disabled={visibleDates.some(d => isToday(d))}>Next</Button>
                </div>
            </div>
        </header>
    )
}