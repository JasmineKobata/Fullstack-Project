class Trail < ApplicationRecord
    validates :park_id, :name, :description, :length, :elevation, :long, :lat, presence: true
    belongs_to :park
    has_one_attached :image
    has_many_attached :images
    has_many :reviews
end
