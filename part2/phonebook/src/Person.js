const Person = ({person, delQuery}) => {
return (
  <li key={person.id}>
    {person.name} {person.number} <button onClick={delQuery}>delete</button>
  </li>
)}

export default Person