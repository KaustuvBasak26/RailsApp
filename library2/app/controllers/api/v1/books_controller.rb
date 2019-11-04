require "json"
class Api::V1::BooksController < ApplicationController
    def list
		book = Book.all
		render json: book
	end

	# def show
	# 	#@book = Book.find(params[:id])
	# 	if book
	# 		render json: book
	# 	else
	# 		render json: book.errorsexample
	# end
	
	# def new
	# 	@book = Book.new
	# 	@subjects = Subject.all
	# end

	def book_params
		params.permit(:title, :price, :subject_id, :description)
	end
	
	def create
	 	@book = Book.new(book_params)
	
	 	if @book.save
			 render json: @book
			 message  =  { :book => @book, :action =>  "created" }
			 ActionCable.server.broadcast 'create_notification', message: message.to_json
			 #, head: ok
	# 		redirect_to :action => 'list'
	 	else
	 		render json: @book.errors
	# 	   	#@subjects = Subject.all
	# 	   	#render :action => 'new'
	 	end
	 end

	# def edit
	# 	@book = Book.find(params[:id])
	# 	@subjects = Subject.all
	# end

	# def update
	# 	@book = Book.find(params[:id])

	# 	if @book.update_attributes(book_param)
	# 		redirect_to :action => 'show', :id => @book
	# 	else
	# 		@subjects = Subject.all
	# 		render :action => 'edit'
	# 	end
	# end

	# def delete
	# 	Book.find(params[:id])&.destroy
	# 	render json: { message: 'Recipe deleted!' }
	# 	#redirect_to :action => 'list'
	# end

	# def show_subjects
	# 	@subject = Subject.find(params[:id])
	# end
end
