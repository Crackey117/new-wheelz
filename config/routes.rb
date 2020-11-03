Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  
  get "/locations", to: "homes#index"
  get "/locations/:id", to: "homes#index"
  get "/locations/new", to: "homes#index"
  namespace :api do
    namespace :v1 do
      resources :locations, only: [:index, :show, :create]
    end 
  end
end 
