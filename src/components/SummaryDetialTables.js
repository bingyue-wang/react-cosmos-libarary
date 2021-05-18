import React from 'react'

function SummaryDetailTables(props) {
    const {greeting, name} = props
    return (
        <div>{greeting}, {name}</div>
    )
}

export default SummaryDetailTables
