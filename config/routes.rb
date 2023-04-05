Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create] do
      resources :reviews, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :trails, only: [:index, :show] do
      resources :reviews, only: [:index]
    end
    resources :parks, only: [:index, :show]
    resources :reviews, only: [:create, :update, :destroy]
    # resources :reviews, only: [:new, :edit]
  end

  get '*path', to: "static_pages#frontend_index"
end
