function Row(props) {
  let user = props.user;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-blue-400">{user.fullname}</td>
      <td className="px-6 py-4 whitespace-nowrap">{user.age}</td>
      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{props.getRoleName}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {
          user.status === 1
            ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              Active
            </span>
            : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
              Disabled
            </span>
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <button className="px-2 py-1 rounded border text-xs mr-2 font-semibold"
          onClick={props.onOpenUserModal.bind(this, user)}
        >Edit</button>
        <button className="px-2 py-1 rounded border text-xs font-semibold bg-red-100 text-red-800"
          onClick={props.onOpenDeleteUserModal.bind(this, user.id)}
        >Remove</button>
      </td>
    </tr>
  );
}

export default Row;