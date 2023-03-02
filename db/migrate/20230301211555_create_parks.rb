class CreateParks < ActiveRecord::Migration[7.0]
  def change
    create_table :parks do |t|
      t.string :name, null: false
      t.string :description, null: false
      t.string :long, null: false
      t.string :lat, null: false

      t.timestamps
    end
    add_index :parks, :name, unique: true
  end
end
