json.user do
    json.extract! @user, :id, :email, :firstname, :lastname, :reviews, :created_at, :updated_at
end