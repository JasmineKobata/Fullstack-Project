class RenameTrailtype < ActiveRecord::Migration[7.0]
  def change
    remove_column :trails, :trail_type
  end
end
