import {useState, useMemo, useEffect} from 'react'
import {interpret} from 'xstate'

export const useMachine = (machine) => {
    // keep track of current machine state
    const [current, setCurrent] = useState(machine.initialState)
    
    // start the service (ONLY ONCE)
    const service = useMemo(() => {
        interpret(machine)
            .onTransition(state => {
                // update the current state when transition occurs
                if (state.changed) setCurrent(state)
            })
            .start()
    }, [])
    
    // stop the service when component unmount
    useEffect(() => {
        return () => service.stop()
    })
    
    return [current, service.send]
}
