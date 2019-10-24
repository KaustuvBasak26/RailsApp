Rails.application.routes.draw do
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  namespace :api do
	namespace :v1 do
		get 'books/list'
	end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	
	#get 'book_controller/book/new'
	#post 'book_controller/book/create'
	#patch 'book_controller/book/update'
	#get 'book_controller/book/list'
	#get 'book_controller/book/list'
	#get 'book_controller/book/show/:id'
	#get 'book_controller/book/edit'
	#get 'book_controller/book/delete'
	#get 'book_controller/book/update'
	#get 'book_controller/book/show_subjects'

	#get 'book_controller#list'
	#get 'book_controller#new'
	#post 'book_controller#create/book/list
	#patch 'book_controller#updat/book/list
	#get 'book_controller#list'
	#get 'book_controller#list'
	#get 'book_controller#show/:i/book/list
	#get 'book_controller#edit'
	#get 'book_controller#delete'/book/list
	#get 'book_controller#update'
	#get 'book_controller#show_subjects'
end
