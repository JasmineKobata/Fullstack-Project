json.array! @parks do |park|
    json.extract! park, :id, :name, :description, :long, :lat, :trails, :created_at, :updated_at
end