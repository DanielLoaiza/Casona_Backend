import {default as Table} from '../../models/Table'


export function addTable(tableData) {
    let status = tableData.status ? tableData.status : 1;
    return Table.findOneAndUpdate({ number: tableData.number }, {number: tableData.number, status: status},
        { upsert: true, new: true })
        .exec()
        .catch((e) => {
            return Promise.reject(e)
        })
}

export function getTables() {
    return Table.find({}).exec()
        .catch((e) => {
            return Promise.reject(e)
        })
}
