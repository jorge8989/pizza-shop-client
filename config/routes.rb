Rails.application.routes.draw do

  root 'orders#index'

  resources :flavors, only: :index
  resources :toppings, only: :index
end
