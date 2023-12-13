import Item from "./Item";

export default function List({ tasks }) {

    return (
        <ul>
            {tasks.map(obj => {
                return <Item key={obj.id} {...obj} />
            })}
        </ul>
    )
}