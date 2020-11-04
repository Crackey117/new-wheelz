class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.belongs_to :location, null: false 
      t.text :body 
      t.timestamps 
    end
  end
end
