import React from 'react'
import {Table} from 'antd'
import './style.scss'

function Parent() {
    const columns = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Platform', dataIndex: 'platform'},
        {title: 'Version', dataIndex: 'version'},
        {title: 'Upgraded', dataIndex: 'upgradeNum'},
        {title: 'Creator', dataIndex: 'creator'},
        {title: 'Date', dataIndex: 'createdAt'},
        {title: 'Action', dataIndex: 'operation', render: () => <a>Publish~</a>},
    ]
    const data = []
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i, // for react
            name: 'Screem', // match with dataIndex in the columns
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        })
    }
    
    return (
        <>
            <Table
            className="grandParent-table"
            columns={columns}
            expandable={{
                indentSize: 0,
                defaultExpandAllRows: false,
                expandedRowRender: record => (
                    <Table
                        className="parent-table"
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        showHeader={false}
                        expandable={{
                            indentSize: 0,
                            expandedRowRender: record => (
                                <Table
                                    className="child-table"
                                    columns={columns}
                                    dataSource={data}
                                    pagination={false}
                                    showHeader={false}
                                />
                            ),
                            rowExpandable: record => true,
                        }}
                    />),
                rowExpandable: record => true,
            }}
            dataSource={data}
            pagination={false}
        />
            <button onClick={()=> {
            
            }}>toggle</button>
        </>
    )
}

export default Parent
