import React from "react";
import TableRow from "../table/TableRow";
const STYLE_FOCUSED_HEADER_DOWN = "focused_header_down";
const STYLE_FOCUSED_HEADER_UP = "focused_header_up";

export default function Table(props) {
    return (
        <table className="table">
            <thead onClick={props.sortByClick} className="thead-dark">
                <tr>
                    {props.headers.map((header, i) => {
                        let styleOfSort;
                        if (header.isSortedFromAToB) { styleOfSort = STYLE_FOCUSED_HEADER_DOWN }
                        else if (header.isSortedFromBToA) { styleOfSort = STYLE_FOCUSED_HEADER_UP }
                        return (
                            <th
                                className="header_item"
                                id={styleOfSort}
                                key={i} scope="col">
                                {header.value}
                            </th>
                        )
                    })
                    }
                </tr>
            </thead>
            <tbody>
                {props.locationsOrEpisodes.map(value => <TableRow key={value.id} value={value} />)}
            </tbody>
        </table>
    )
}