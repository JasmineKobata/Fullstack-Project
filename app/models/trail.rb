class Trail < ApplicationRecord
    validates :park_id, :name, :description, :length, :elevation, :long, :lat, presence: true
    belongs_to :park
end
