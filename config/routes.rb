Rails.application.routes.draw do
  # action cable_server
  mount Action.server => "/cable"
  resources :messages
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
