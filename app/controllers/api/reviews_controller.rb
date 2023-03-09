class Api::ReviewsController < ApplicationController
    def index
        @reviews = Review.where(trail_id: params[:trail_id])
        puts @reviews
        render :index
    end

    def create
        @review = Review.new(review_params)
        if @review.save
            # redirect_to api_trail_reviews_url(@review.trail)
            render :new
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        @review = Review.find(params[:id])
        if @review.update(review_params)
            # redirect_to api_review_url(@review.trail)
            render :edit
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @review = Review.find(params[:id])
        @review.destroy
        # redirect_to api_review_url(@review.id)
    end

    private
    def review_params
        params.require(:review).permit(:rating, :body, :type, :trail_id, :author_id, :id, :created_at, :updated_at)
    end
end