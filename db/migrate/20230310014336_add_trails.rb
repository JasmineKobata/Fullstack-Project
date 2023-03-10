class AddTrails < ActiveRecord::Migration[7.0]
  def change
    add_column :trails, :difficulty, :string, null: false
    add_column :trails, :time, :string, null: false
    add_column :trails, :trail_type, :string, null: false
    remove_index :trails, :park_id
  end
end
