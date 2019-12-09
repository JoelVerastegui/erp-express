import React, { Fragment } from 'react';

function editableTable(props) {
    let fit = props.fit !== undefined ? props.fit : '';

    return (
        <table className="table table-bordered" style={fit !== '' ? { width: "1px", whiteSpace: "nowrap" } : {}}>
            <thead className="thead-light">
                <tr>
                    {
                        props.headers.map((e) => {
                            return (<th>{e}</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((e, i) => {
                        return (
                            <tr key={i}>
                                {
                                    Object.keys(e).map((f) => {
                                        if (f.startsWith('GECL')) return (<td className="p-0"><input className="form-control" value={e[f]} /></td>)
                                    })
                                }
                            </tr>
                        )
                    })
                }
                <tr key="0">
                    <td className="p-0"><input className="form-control" value="A001" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo 1" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo de prueba" /></td>
                    <td className="p-0"><input className="form-control" value="Perú" /></td>
                </tr>
                <tr key="1">
                    <td className="p-0"><input className="form-control" value="A002" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo 2" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo de prueba 2" /></td>
                    <td className="p-0"><input className="form-control" value="Perú" /></td>
                </tr>
                <tr key="2">
                    <td className="p-0"><input className="form-control" value="A003" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo 3" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo de prueba 3" /></td>
                    <td className="p-0"><input className="form-control" value="Perú" /></td>
                </tr>
                <tr key="3">
                    <td className="p-0"><input className="form-control" value="A004" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo 4" /></td>
                    <td className="p-0"><input className="form-control" value="Articulo de prueba 4" /></td>
                    <td className="p-0"><input className="form-control" value="Perú" /></td>
                </tr>
            </tbody>
        </table>
    )
}
function readonlyTable(props) {
    let fit = props.fit !== undefined ? props.fit : '';

    return (
        <table className="table table-bordered table-hover" style={fit !== '' ? { width: "1px", whiteSpace: "nowrap" } : {}}>
            <thead className="thead-light">
                <tr>
                    {
                        props.headers.map((e) => {
                            return (<th>{e}</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((e, i) => {
                        return (
                            <tr key={i}>
                                {
                                    Object.keys(e).map((f) => {
                                        if (f.startsWith('GECL')) return (<td>{e[f]}</td>)
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

function Table(props) {
    let readonly = props.readonly !== undefined ? props.readonly : '';

    return (
        <Fragment>
            {
                readonly !== '' ? readonlyTable(props) : editableTable(props)
            }
        </Fragment>
    )
}

export default Table;