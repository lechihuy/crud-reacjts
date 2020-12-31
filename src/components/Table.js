import Thead from './Thead';
import Row from './Row';

function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

function Table(props) {
  const COLS = ['#', 'Fullname', 'Age', 'Role', 'Status', ''];
  let users = props.users;

  const filter = props.filter;
  if (filter.descId) {
    users = users.sort((a, b) => {
      return b.id - a.id;
    });
  }
  if (filter.keyword) {
    users = users.filter(user => {
      filter.keyword = filter.keyword.toLowerCase();
      
      return string_to_slug(user.fullname).includes(filter.keyword) 
        || user.fullname.toLowerCase().includes(filter.keyword);
    });
  }

  let rows = users.map(user => {
    return <Row user={user} key={user.id} getRoleName={getRoleName(user.roleId)}
             onOpenUserModal={props.onOpenUserModal}
             onOpenDeleteUserModal={props.onOpenDeleteUserModal}
           />
  });
  
  function getRoleName(roleId) {
    return props.roles.find(role => role.id === roleId).name;
  }

  return (
    <div className="shadow overflow-x-auto border-b border-gray-200 rounded-lg">
      <table className="divide-y divide-gray-200 shadow w-full">
        <Thead cols={COLS}/>
        <tbody className="bg-white divide-y divide-gray-200">{rows}</tbody>
      </table>
    </div>
  );
}

export default Table;