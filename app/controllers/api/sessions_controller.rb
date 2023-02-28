class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    p User.first
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )
    p params
    if @user
        login!(@user)
        render 'api/users/show'
    else
      #status :unauthorized
      render json: { errors: ['The provided credentials were invalid.'] }
    end
  end

  def destroy
    logout!
    render json: { message: 'success' }
  end
end
