class AddTitleToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :title, :string, {:null=>false}
  end
end
