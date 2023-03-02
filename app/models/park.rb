class Park < ApplicationRecord
    validates :name, :description, :long, :lat, presence: true
    validates :name, uniqueness: true
    has_many :trails
end
