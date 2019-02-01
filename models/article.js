const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String, 
        min: 5, 
        max: 400, 
        required: true
    }, 
    subtitle: {
        type: String,
        min: 5,
        required: false
    },
    description: {
        type: String,
        min: 5, 
        max: 5000, 
        required: true
    },
    owner: {
        user: 
            { 
                type: Schema.Types.ObjectId,
                ref: 'User' ,
                required: true
            },
       
    },
    category: {
        //required: true, //to fix
        enum: ['sport', 'games', 'history']
        
    },
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    updatedAt: {
        type: Date, 
        required: true,
        default: Date.now()
    }
});

const index = { title: 'text' };
ProductSchema.index(index);

module.exports = mongoose.model('Article', ProductSchema);
