class UsersBuilder {
    static $buildUser(user) {
        return $('<div />', {
                class: 'list-group-item',
                'data-id': user.id
            })
            .append($('<input/>', {
                    class: 'username input-lg',
                    disabled: ''
                })
                .val(user.username)
                .add($('<button/>', {
                        class: 'btn btn-success btn-lg update-user-button'
                    }).text('save').hide()
                    .add($('<button/>', {
                        class: 'btn btn-primary btn-lg edit-cancel-user-button'
                    }).text('cancel').hide())
                    .add($('<button/>', {
                        class: 'btn btn-primary btn-lg edit-user-button'
                    }).text('edit'))
                    .add($('<button/>', {
                        class: 'btn btn-danger btn-lg delete-user-button'
                    }).text('delete'))
                ));
    }
}