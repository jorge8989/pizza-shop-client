Rails.application.routes.draw do

  root 'orders#index'

  resources :flavors, only: :index
  resources :toppings, only: :index
  resources :foods, only: :index
end
