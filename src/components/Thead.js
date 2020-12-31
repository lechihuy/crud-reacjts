function Thead(props) {
  const cols = props.cols.map((col, key) => {
    return( 
      <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {col}
      </th>
    );
  });

  return (
    <thead className="bg-gray-50">
      <tr>{cols}</tr>
    </thead>
  );
}

export default Thead;