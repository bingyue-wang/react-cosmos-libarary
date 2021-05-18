import React, {memo, useEffect, useRef, useState} from 'react'
import {Table} from 'antd'
import {DndProvider, useDrag, useDrop} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const type = 'DraggableBodyRow'

function DraggableBodyRow({
                              index,
                              moveRow = () => {},
                              className,
                              style,
                              ...restProps
                          }) {
    const ref = useRef()
    const [{isOver, dropClassName}, drop] = useDrop(
        () => ({
            accept: type,
            collect: (monitor) => {
                const {index: dragIndex} = monitor.getItem() || {}
                if (dragIndex === index) {
                    return {}
                }
                return {
                    isOver: monitor.isOver(),
                    dropClassName:
                        dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
                }
            },
            drop: (item) => {
                moveRow(item.index, index)
            },
        }),
        [index],
    )
    const [, drag] = useDrag(
        () => ({
            type,
            item: {index},
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [index],
    )
    drop(drag(ref))
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{cursor: 'move', ...style}}
            {...restProps}
        />
    )
}

function SummaryDetailTables(props) {
    const {data, category} = props
    return (
        <div>{data}--{category}</div>
    )
}

export default SummaryDetailTables
