Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  
  get "/locations", to: "homes#index"
  get "/locations/new", to: "homes#authenticated"
  get "/locations/:id", to: "homes#index"
  get "/locations/:id/destroy", to: "homes#authenticated"
  get "/locations/:location_id/comments", to: "homes#authorized"
  get "/locations/:location_id/comments/:id/destroy", to: "homes#authorized"
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show, :create, :destroy] do 
        resources :comments, only: [:show, :create, :destroy]
      end 
    end 
  end
end 
