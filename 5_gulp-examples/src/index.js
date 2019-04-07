(() => {
    const $usersList = $('#users-list');
    let users = [
      { id: 1, username: 'Jan' },
      { id: 2, username: 'Piotr' },
      { id: 3, username: 'Adam' },
      { id: 4, username: 'Maria' },
      { id: 5, username: 'Kasia'}
    ];
  
    const getUsers = () => {
      $usersList.empty();
      users.map(u => UsersBuilder.$buildUser(u).appendTo($usersList));
    }
  
    const addUser = (event) => {
      event.preventDefault();
  
      let $newItem = $('#username');
      let username = $newItem.val();
  
      if (!username) {
        return;
      }
  
      $newItem.val('');
  
      users.push({
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: username
      });
  
      toastr.success('Item created', 'Success!');
      getUsers();
    }
  
    const deleteUser = (event) => {
      event.preventDefault();
  
      const id = $(event.target.parentElement).data('id');
  
      users = users.filter(u => u.id != id);
  
      toastr.success('Item deleted', 'Success!');
      getUsers();
    }
  
    const updateUser = (event) => {
      event.preventDefault();
      const $userRow = $(event.target.parentElement);
  
      const useItOnSuccess = () => $userRow.find('.edit-user-button, .delete-user-button').show();
  
      const id = $userRow.data('id');
      const username = $userRow.find('.username').val();
  
      users.find(u => u.id == id).username = username;
  
      toastr.success('Item updated', 'Success!');
      getUsers();
    }
  
    const editUser = (event) => {
      event.preventDefault()
  
      const $userRow = $(event.target.parentElement);
      const $userName = $userRow.find('.username');
  
      $userRow.find('.username').prop('disabled', false);
      $userRow.find('.edit-user-button, .delete-user-button').hide();
      $userRow.find('.edit-cancel-user-button, .update-user-button').show();
  
      $userRow.data('edited-value', $userName.val());
    }
  
    const cancelUserEdit = (event) => {
      event.preventDefault()
  
      const $userRow = $(event.target.parentElement);
      const $userName = $userRow.find('.username');
  
      $userRow.find('.username').prop('disabled', true);
      $userRow.find('.edit-user-button, .delete-user-button').show();
      $userRow.find('.edit-cancel-user-button, .update-user-button').hide();
  
      $userName.val($userRow.data('edited-value'));
    }
  
    $(() => {
      getUsers();
  
      $('#add-user-button').click((event) => addUser(event));
      $('body').on('click', '.delete-user-button', (event) => deleteUser(event));
      $('body').on('click', '.edit-user-button', (event) => editUser(event));
      $('body').on('click', '.edit-cancel-user-button', (event) => cancelUserEdit(event));
      $('body').on('click', '.update-user-button', (event) => updateUser(event));
    })
  })();