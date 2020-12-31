function DeleteUserModal(props) {
  let modalClass, overlayClass;

  if (props.isShow) {
    modalClass = 'opacity-100 translate-y-0 sm:scale-100';
    overlayClass = 'opacity-100';
  } else {
    modalClass = 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95';
    overlayClass = 'opacity-0';
  }

  const onSubmit = () => {
    props.deleteUser(props.userId);
    props.onHideDeleteUserModal();
  }

  return (
    <div className={"fixed inset-0 overflow-y-auto " + (!props.isShow && "pointer-events-none")}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className={"fixed inset-0 transition-opacity " + overlayClass} aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​&#8203;</span>
        <div className={"inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " + modalClass} role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <svg className="w-20 h-20 mx-auto text-red-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-center">Do you want to remove it?</p>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-end">
            <button type="button" className="w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 bg-white text-gray-700 font-medium sm:ml-3 sm:w-auto sm:text-sm"
              onClick={props.onHideDeleteUserModal}
            >
              Cancel
          </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onSubmit}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteUserModal;