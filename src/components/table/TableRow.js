export default function TableRow(props) {
    let values = [];
    for (let key in props.value) {
        values.push(props.value[key])
    }
    return (
        <tr>
            {values.map((value, i) => <td key={i}>{value}</td>)}
        </tr>
    )
}